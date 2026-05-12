import type { SurveyScores } from "@/types/survey";

type PredictionResponse = {
  predicted_level: number;
  recommendation: string;
};

export async function predictSupportLevel(
  scores: SurveyScores,
): Promise<PredictionResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_ML_API_URL;

  if (!apiUrl) {
    throw new Error("missing_ml_api_url");
  }

  const response = await fetch(`${apiUrl}/predict`, {
    body: JSON.stringify(scores),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("prediction_failed");
  }

  return response.json() as Promise<PredictionResponse>;
}
