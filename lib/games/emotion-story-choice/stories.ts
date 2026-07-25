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
  {
    id: "s2-6",
    level: 2,
    situation: "A friend shares their favorite game.",
    illustration: "🎮",
    correctEmotion: "happy",
    options: ["happy", "sad", "angry", "surprised"],
    supportiveHint: "Sharing a fun activity can make us feel happy."
  },
  {
    id: "s2-7",
    level: 2,
    situation: "The classroom lights turn off without warning.",
    illustration: "💡",
    correctEmotion: "surprised",
    options: ["happy", "sad", "angry", "surprised"],
    supportiveHint: "A sudden change can feel surprising."
  },
  {
    id: "s2-8",
    level: 2,
    situation: "A child's drawing gets wet in the rain.",
    illustration: "🖼️",
    correctEmotion: "sad",
    options: ["happy", "sad", "angry", "surprised"],
    supportiveHint: "It can feel sad when something we made is damaged."
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
    situation: "A child sees a big dog barking.",
    illustration: "🐕",
    correctEmotion: "scared",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "New animals can sometimes be a bit scary."
  },
  {
    id: "s3-6",
    level: 3,
    situation: "A child hears their name called in a quiet room.",
    illustration: "📣",
    correctEmotion: "surprised",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "An unexpected sound can make us feel surprised."
  },
  {
    id: "s3-7",
    level: 3,
    situation: "A friend says they do not want to play today.",
    illustration: "🧩",
    correctEmotion: "sad",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "Being left out can make us feel sad."
  },
  {
    id: "s3-8",
    level: 3,
    situation: "Someone pushes in front while the child is waiting.",
    illustration: "🧍",
    correctEmotion: "angry",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "When something feels unfair, we may feel angry."
  },
  {
    id: "s3-9",
    level: 3,
    situation: "A child finishes a difficult puzzle by themselves.",
    illustration: "🏆",
    correctEmotion: "happy",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "Finishing something difficult can make us feel happy."
  },
  {
    id: "s3-10",
    level: 3,
    situation: "The fire alarm makes a sudden loud sound at school.",
    illustration: "🚨",
    correctEmotion: "scared",
    options: ["happy", "sad", "angry", "surprised", "scared"],
    supportiveHint: "A sudden loud alarm can make us feel scared."
  }
];

export function getStoriesForLevel(level: number): Story[] {
  const stories = EMOTION_STORIES.filter((story) => story.level === level);
  return stories.length > 0
    ? stories
    : EMOTION_STORIES.filter((story) => story.level === 1);
}
