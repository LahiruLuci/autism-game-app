import type { SurveyScores } from "@/types/survey";

export type PredictionResponse = {
  screening_prediction: number;
  predicted_level: number;
  confidence: number;
  recommendation: string;
};

export class MLApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MLApiError";
  }
}

export async function predictSupportLevel(
  scores: SurveyScores,
): Promise<PredictionResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_ML_API_URL;

  if (!apiUrl) {
    console.error("[BrightPath] NEXT_PUBLIC_ML_API_URL is not set.");
    throw new MLApiError("missing_ml_api_url");
  }

  let response: Response;

  try {
    response = await fetch(`${apiUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emotion_score: scores.emotion_score,
        cognitive_score: scores.cognitive_score,
        self_awareness_score: scores.self_awareness_score,
        math_score: scores.math_score,
        total_score: scores.total_score,
      }),
    });
  } catch (err) {
    console.error("[BrightPath] ML API fetch failed:", err);
    throw new MLApiError("prediction_network_error");
  }

  if (!response.ok) {
    console.error("[BrightPath] ML API responded with status:", response.status);
    throw new MLApiError("prediction_failed");
  }

  return response.json() as Promise<PredictionResponse>;
}
