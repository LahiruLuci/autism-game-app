import { EmotionQuestion, EmotionId } from "@/types/games/emotion-face-match";

export const EMOTION_FACE_MATCH_QUESTIONS: Record<number, EmotionQuestion[]> = {
  1: [
    {
      id: "lv1-q1",
      emotionId: "happy",
      promptType: "face",
      visual: "😊",
      correctAnswer: "happy",
      options: ["happy", "sad"],
      instruction: "How does this face feel?"
    },
    {
      id: "lv1-q2",
      emotionId: "sad",
      promptType: "face",
      visual: "😢",
      correctAnswer: "sad",
      options: ["happy", "sad"],
      instruction: "How does this face feel?"
    },
    {
      id: "lv1-q3",
      emotionId: "happy",
      promptType: "situation",
      situation: "A child gets a new toy.",
      correctAnswer: "happy",
      options: ["happy", "sad"],
      instruction: "How do they feel?"
    },
    {
      id: "lv1-q4",
      emotionId: "sad",
      promptType: "situation",
      situation: "A child lost their favorite toy.",
      correctAnswer: "sad",
      options: ["happy", "sad"],
      instruction: "How do they feel?"
    },
    {
      id: "lv1-q5",
      emotionId: "happy",
      promptType: "face",
      visual: "🙂",
      correctAnswer: "happy",
      options: ["happy", "sad"],
      instruction: "How does this face feel?"
    }
  ],
  2: [
    {
      id: "lv2-q1",
      emotionId: "happy",
      promptType: "situation",
      situation: "A child is playing with friends.",
      correctAnswer: "happy",
      options: ["happy", "sad", "angry", "surprised"],
      instruction: "How do they feel?"
    },
    {
      id: "lv2-q2",
      emotionId: "sad",
      promptType: "situation",
      situation: "A child cannot find their book.",
      correctAnswer: "sad",
      options: ["happy", "sad", "angry", "surprised"],
      instruction: "How do they feel?"
    },
    {
      id: "lv2-q3",
      emotionId: "angry",
      promptType: "face",
      visual: "😠",
      correctAnswer: "angry",
      options: ["happy", "sad", "angry", "surprised"],
      instruction: "How does this face feel?"
    },
    {
      id: "lv2-q4",
      emotionId: "surprised",
      promptType: "face",
      visual: "😮",
      correctAnswer: "surprised",
      options: ["happy", "sad", "angry", "surprised"],
      instruction: "How does this face feel?"
    },
    {
      id: "lv2-q5",
      emotionId: "angry",
      promptType: "situation",
      situation: "A child's toy was taken by someone else.",
      correctAnswer: "angry",
      options: ["happy", "sad", "angry", "surprised"],
      instruction: "How do they feel?"
    },
    {
      id: "lv2-q6",
      emotionId: "surprised",
      promptType: "situation",
      situation: "A child gets a surprise gift!",
      correctAnswer: "surprised",
      options: ["happy", "sad", "angry", "surprised"],
      instruction: "How do they feel?"
    },
    {
      id: "lv2-q7",
      emotionId: "happy",
      promptType: "face",
      visual: "😄",
      correctAnswer: "happy",
      options: ["happy", "sad", "angry", "surprised"],
      instruction: "How does this face feel?"
    },
    {
      id: "lv2-getQuestionsForEmotionLevel8",
      emotionId: "sad",
      promptType: "face",
      visual: "☹️",
      correctAnswer: "sad",
      options: ["happy", "sad", "angry", "surprised"],
      instruction: "How does this face feel?"
    }
  ],
  3: [
    {
      id: "lv3-q1",
      emotionId: "scared",
      promptType: "face",
      visual: "😨",
      correctAnswer: "scared",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How does this face feel?"
    },
    {
      id: "lv3-q2",
      emotionId: "scared",
      promptType: "situation",
      situation: "A child hears a loud noise in the dark.",
      correctAnswer: "scared",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How do they feel?"
    },
    {
      id: "lv3-q3",
      emotionId: "angry",
      promptType: "situation",
      situation: "A child's drawing was ruined.",
      correctAnswer: "angry",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How do they feel?"
    },
    {
      id: "lv3-q4",
      emotionId: "surprised",
      promptType: "situation",
      situation: "A friend jumps out and says 'Boo!' gently.",
      correctAnswer: "surprised",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How do they feel?"
    },
    {
      id: "lv3-q5",
      emotionId: "sad",
      promptType: "situation",
      situation: "A child's balloon flew away.",
      correctAnswer: "sad",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How do they feel?"
    },
    {
      id: "lv3-q6",
      emotionId: "happy",
      promptType: "situation",
      situation: "A child is eating their favorite ice cream.",
      correctAnswer: "happy",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How do they feel?"
    },
    {
      id: "lv3-q7",
      emotionId: "scared",
      promptType: "face",
      visual: "😰",
      correctAnswer: "scared",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How does this face feel?"
    },
    {
      id: "lv3-q8",
      emotionId: "angry",
      promptType: "face",
      visual: "💢",
      correctAnswer: "angry",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How does this face feel?"
    },
    {
      id: "lv3-q9",
      emotionId: "surprised",
      promptType: "face",
      visual: "😲",
      correctAnswer: "surprised",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How does this face feel?"
    },
    {
      id: "lv3-q10",
      emotionId: "happy",
      promptType: "situation",
      situation: "A child learned how to ride a bike.",
      correctAnswer: "happy",
      options: ["happy", "sad", "angry", "surprised", "scared"],
      instruction: "How do they feel?"
    }
  ]
};

export function getQuestionsForEmotionLevel(level: number): EmotionQuestion[] {
  return EMOTION_FACE_MATCH_QUESTIONS[level] || EMOTION_FACE_MATCH_QUESTIONS[1];
}
