export type SurveyArea =
  | "emotion"
  | "cognitive"
  | "self_awareness"
  | "mathematical";

export type SurveyQuestion = {
  id: string;
  area: SurveyArea;
  question: string;
  sort_order: number;
  is_active: boolean;
};

export type SurveyAnswerLabel =
  | "Never"
  | "Rarely"
  | "Sometimes"
  | "Often"
  | "Always";

export type SurveyAnswerOption = {
  label: SurveyAnswerLabel;
  score: number;
};

export type SurveyAnswers = Record<string, number>;

export type SurveyScores = {
  emotion_score: number;
  cognitive_score: number;
  self_awareness_score: number;
  math_score: number;
  total_score: number;
};

export type AssessmentResult = SurveyScores & {
  id: string;
  child_id: string;
  predicted_level: number;
  recommendation: string;
  created_at: string;
  confidence?: number | null;
  emotion_level?: number | null;
  cognitive_level?: number | null;
  self_awareness_level?: number | null;
  math_level?: number | null;
  main_support_area?: SurveyArea | null;
  strongest_area?: SurveyArea | null;
};
