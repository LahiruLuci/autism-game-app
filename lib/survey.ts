import { predictSupportLevel } from "./api";
import { getChildForCurrentParent } from "./children";
import { supabase } from "./supabase";
import { calculateSurveyScores } from "./survey-scoring";
import type {
  AssessmentResult,
  SurveyAnswers,
  SurveyQuestion,
} from "@/types/survey";

export class SurveyFlowError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SurveyFlowError";
  }
}

export async function getSurveyQuestions() {
  const { data, error } = await supabase
    .from("survey_questions")
    .select("id, area, question, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .returns<SurveyQuestion[]>();

  if (error || !data) {
    throw new SurveyFlowError("survey_load_failed");
  }

  return data;
}

export async function submitSurvey({
  answers,
  childId,
  questions,
}: {
  answers: SurveyAnswers;
  childId: string;
  questions: SurveyQuestion[];
}) {
  await getChildForCurrentParent(childId);

  const scores = calculateSurveyScores(questions, answers);

  // ── Step 1: Call ML API ──────────────────────────────────────────────────
  let prediction: Awaited<ReturnType<typeof predictSupportLevel>>;
  try {
    prediction = await predictSupportLevel(scores);
  } catch (err) {
    console.error("[BrightPath] ML prediction error:", err);
    throw new SurveyFlowError("prediction_failed");
  }

  // ── Step 2: Save assessment (without confidence — safe for any schema) ───
  const assessmentId = crypto.randomUUID();

  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .insert({
      id: assessmentId,
      child_id: childId,
      emotion_score: scores.emotion_score,
      cognitive_score: scores.cognitive_score,
      self_awareness_score: scores.self_awareness_score,
      math_score: scores.math_score,
      total_score: scores.total_score,
      predicted_level: prediction.predicted_level,
      recommendation: prediction.recommendation,
    })
    .select(
      "id, child_id, emotion_score, cognitive_score, self_awareness_score, math_score, total_score, predicted_level, recommendation, created_at",
    )
    .single<AssessmentResult>();

  if (assessmentError || !assessment) {
    // Supabase PostgrestError properties are non-enumerable — log every way possible
    console.error("[BrightPath] Assessment insert failed.");
    if (assessmentError) {
      console.error("  → raw error obj:", assessmentError);
      console.error("  → JSON:", JSON.stringify(assessmentError));
      console.error("  → message:", assessmentError.message);
      console.error("  → code:", assessmentError.code);
      console.error("  → details:", assessmentError.details);
      console.error("  → hint:", assessmentError.hint);
      try {
        const keys = Object.getOwnPropertyNames(assessmentError);
        console.error("  → own property names:", keys);
        keys.forEach((k) => {
          console.error(`  →  .${k}:`, (assessmentError as unknown as Record<string, unknown>)[k]);
        });
      } catch {
        console.error("  → could not enumerate properties");
      }
    } else {
      console.error("  → assessmentError is null/undefined but data is also null");
    }
    throw new SurveyFlowError("assessment_save_failed");
  }

  // ── Step 3: Silently try to save confidence (column may not exist) ───────
  if (prediction.confidence != null) {
    supabase
      .from("assessments")
      .update({ confidence: prediction.confidence })
      .eq("id", assessment.id)
      .then(({ error }) => {
        if (error) {
          console.warn(
            "[BrightPath] Could not save confidence (column may not exist):",
            error.message,
          );
        }
      });
  }

  // ── Step 4: Save individual survey responses ─────────────────────────────
  const responseRows = questions.map((question) => ({
    id: crypto.randomUUID(),
    assessment_id: assessment.id,
    child_id: childId,
    question_id: question.id,
    answer_score: answers[question.id],
  }));

  const { error: responsesError } = await supabase
    .from("survey_responses")
    .insert(responseRows);

  if (responsesError) {
    console.error("[BrightPath] Survey responses save failed:", {
      code: responsesError.code,
      message: responsesError.message,
    });
    throw new SurveyFlowError("responses_save_failed");
  }

  return assessment;
}

export async function getLatestAssessmentForCurrentParent(childId: string) {
  await getChildForCurrentParent(childId);

  const { data, error } = await supabase
    .from("assessments")
    .select(
      "id, child_id, emotion_score, cognitive_score, self_awareness_score, math_score, total_score, predicted_level, recommendation, created_at",
    )
    .eq("child_id", childId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<AssessmentResult>();

  if (error) {
    throw new SurveyFlowError("assessment_load_failed");
  }

  return data;
}
