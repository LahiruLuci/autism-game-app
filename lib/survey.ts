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

  // Step 1: Call ML API
  let prediction: Awaited<ReturnType<typeof predictSupportLevel>>;
  try {
    prediction = await predictSupportLevel(scores);
  } catch (err) {
    console.error("[BrightPath] ML prediction error:", err);
    throw new SurveyFlowError("prediction_failed");
  }

  const assessmentId = crypto.randomUUID();

  // Step 2: Save assessment — try with confidence, fall back without
  let assessment: AssessmentResult | null = null;

  const baseAssessmentPayload = {
    id: assessmentId,
    child_id: childId,
    emotion_score: scores.emotion_score,
    cognitive_score: scores.cognitive_score,
    self_awareness_score: scores.self_awareness_score,
    math_score: scores.math_score,
    total_score: scores.total_score,
    predicted_level: prediction.predicted_level,
    recommendation: prediction.recommendation,
  };

  // Attempt to include confidence if the column exists
  const withConfidence = {
    ...baseAssessmentPayload,
    confidence: prediction.confidence ?? null,
  };

  const { data: assessmentWithConf, error: errorWithConf } = await supabase
    .from("assessments")
    .insert(withConfidence)
    .select(
      "id, child_id, emotion_score, cognitive_score, self_awareness_score, math_score, total_score, predicted_level, recommendation, created_at",
    )
    .single<AssessmentResult>();

  if (errorWithConf) {
    // Confidence column might not exist — retry without it
    if (
      errorWithConf.code === "PGRST204" ||
      errorWithConf.message?.includes("confidence")
    ) {
      const { data: assessmentNoConf, error: errorNoConf } = await supabase
        .from("assessments")
        .insert(baseAssessmentPayload)
        .select(
          "id, child_id, emotion_score, cognitive_score, self_awareness_score, math_score, total_score, predicted_level, recommendation, created_at",
        )
        .single<AssessmentResult>();

      if (errorNoConf || !assessmentNoConf) {
        console.error("[BrightPath] Assessment save failed:", errorNoConf);
        throw new SurveyFlowError("assessment_save_failed");
      }
      assessment = assessmentNoConf;
    } else {
      console.error("[BrightPath] Assessment save failed:", errorWithConf);
      throw new SurveyFlowError("assessment_save_failed");
    }
  } else {
    assessment = assessmentWithConf;
  }

  if (!assessment) {
    throw new SurveyFlowError("assessment_save_failed");
  }

  // Step 3: Save individual survey responses
  const responseRows = questions.map((question) => ({
    id: crypto.randomUUID(),
    assessment_id: assessment!.id,
    child_id: childId,
    question_id: question.id,
    answer_score: answers[question.id],
  }));

  const { error: responsesError } = await supabase
    .from("survey_responses")
    .insert(responseRows);

  if (responsesError) {
    console.error("[BrightPath] Survey responses save failed:", responsesError);
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
