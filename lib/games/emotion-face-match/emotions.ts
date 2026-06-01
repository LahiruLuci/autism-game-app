import { Emotion, EmotionId } from "@/types/games/emotion-face-match";

export const EMOTIONS: Record<EmotionId, Emotion> = {
  happy: {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    color: "bg-yellow-50 text-yellow-700 border-yellow-100 hover:bg-yellow-100 hover:border-yellow-200",
    supportiveText: "Great matching! Happy faces bring so much joy. 🌟",
  },
  sad: {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    color: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 hover:border-blue-200",
    supportiveText: "Wonderful effort! It's okay to feel sad sometimes. 💛",
  },
  angry: {
    id: "angry",
    label: "Angry",
    emoji: "😠",
    color: "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100 hover:border-orange-200",
    supportiveText: "Nice work! You are very good at identifying feelings. ✨",
  },
  surprised: {
    id: "surprised",
    label: "Surprised",
    emoji: "😮",
    color: "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100 hover:border-purple-200",
    supportiveText: "Amazing job! That was a big surprise! 🎊",
  },
  scared: {
    id: "scared",
    label: "Scared",
    emoji: "😨",
    color: "bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100 hover:border-slate-200",
    supportiveText: "Great job! You found the right face. You're doing great! 💪",
  },
  calm: {
    id: "calm",
    label: "Calm",
    emoji: "😌",
    color: "bg-green-50 text-green-700 border-green-100 hover:bg-green-100 hover:border-green-200",
    supportiveText: "Excellent! You recognized the calm and peaceful face. 🌿",
  },
};

export function getEmotionsByIds(ids: EmotionId[]): Emotion[] {
  return ids.map(id => EMOTIONS[id]);
}
