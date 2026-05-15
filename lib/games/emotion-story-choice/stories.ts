import { Story } from "@/types/games/emotion-story-choice";

export const EMOTION_STORIES: Story[] = [
  // Level 1
  {
    id: "s1-1",
    level: 1,
    situation: "A child gets a colorful balloon.",
    illustration: "🎈",
    correctEmotion: "happy",
    options: ["happy", "sad"],
    supportiveHint: "Getting something new often makes us feel good."
  },
  {
    id: "s1-2",
    level: 1,
    situation: "A child lost their favorite toy.",
    illustration: "🧸",
    correctEmotion: "sad",
    options: ["happy", "sad"],
    supportiveHint: "It's hard when we can't find things we love."
  },
  {
    id: "s1-3",
    level: 1,
    situation: "A child receives a cold ice cream.",
    illustration: "🍦",
    correctEmotion: "happy",
    options: ["happy", "sad"],
    supportiveHint: "Eating treats is a fun time!"
  },
  {
    id: "s1-4",
    level: 1,
    situation: "A child drops their yummy cookie.",
    illustration: "🍪",
    correctEmotion: "sad",
    options: ["happy", "sad"],
    supportiveHint: "Losing a treat can make us feel a bit down."
  },
  {
    id: "s1-5",
    level: 1,
    situation: "A child is playing at the park.",
    illustration: "🌳",
    correctEmotion: "happy",
    options: ["happy", "sad"],
    supportiveHint: "Playing outside is a happy activity."
  },

  // Level 2
  {
    id: "s2-1",
    level: 2,
    situation: "A friend takes a toy without asking.",
    illustration: "🤖",
    correctEmotion: "angry",
    options: ["happy", "sad", "angry", "surprised"],
    supportiveHint: "When things aren't fair, we might feel cross."
  },
  {
    id: "s2-2",
    level: 2,
    situation: "A surprise gift appears on the table.",
    illustration: "🎁",
    correctEmotion: "surprised",
    options: ["happy", "sad", "angry", "surprised"],
    supportiveHint: "Something unexpected just happened!"
  },
  {
    id: "s2-3",
    level: 2,
    situation: "A child cannot find their shoes for school.",
    illustration: "👟",
    correctEmotion: "sad",
    options: ["happy", "sad", "angry", "surprised"],
    supportiveHint: "Being lost or stuck can be hard."
  },
  {
    id: "s2-4",
    level: 2,
    situation: "The whole family goes to the zoo.",
    illustration: "🦁",
    correctEmotion: "happy",
    options: ["happy", "sad", "angry", "surprised"],
    supportiveHint: "Big family trips are exciting!"
  },
  {
    id: "s2-5",
    level: 2,
    situation: "The tower of blocks falls over suddenly.",
    illustration: "🧱",
    correctEmotion: "angry",
    options: ["happy", "sad", "angry", "surprised"],
    supportiveHint: "It's frustrating when our work breaks."
  },

  // Level 3
  {
    id: "s3-1",
    level: 3,
    situation: "Loud thunder starts suddenly during a storm.",
    illustration: "⚡",
    correctEmotion: "scared",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "Loud noises can sometimes be a bit much."
  },
  {
    id: "s3-2",
    level: 3,
    situation: "A child gets lost briefly in the big store.",
    illustration: "🏬",
    correctEmotion: "scared",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "Not being near a parent can feel worrying."
  },
  {
    id: "s3-3",
    level: 3,
    situation: "A birthday surprise party happens!",
    illustration: "🎂",
    correctEmotion: "surprised",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "A big group and a cake! What an event."
  },
  {
    id: "s3-4",
    level: 3,
    situation: "Another child breaks a favorite drawing.",
    illustration: "🖍️",
    correctEmotion: "angry",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "It's okay to feel upset when things are ruined."
  },
  {
    id: "s3-5",
    level: 3,
    situation: "A child sees a big friendly dog barking.",
    illustration: "🐕",
    correctEmotion: "scared",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "New animals can sometimes be a bit scary."
  }
];

export function getStoriesForLevel(level: number): Story[] {
  return EMOTION_STORIES.filter(s => s.level === level) || EMOTION_STORIES.filter(s => s.level === 1);
}
