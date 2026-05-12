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

  // ── Step 2: Save assessment ───────────────────────────────────────
  // id is GENERATED ALWAYS AS IDENTITY — do NOT provide it
  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .insert({
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
    // Log the error as a single JSON blob so all fields are visible at once
    try {
      const errObj: Record<string, unknown> = {};
      Object.getOwnPropertyNames(assessmentError ?? {}).forEach((k) => {
        errObj[k] = (assessmentError as unknown as Record<string, unknown>)[k];
      });
      console.error("[BrightPath] Assessment insert failed:", JSON.stringify(errObj, null, 2));
    } catch {
      console.error("[BrightPath] Assessment insert failed (could not serialize error)");
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
  // Note: id is int8 serial — do not provide it; assessment_id requires the
  // column to be added via: ALTER TABLE survey_responses ADD COLUMN assessment_id uuid;
  const responseRows = questions.map((question) => ({
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
