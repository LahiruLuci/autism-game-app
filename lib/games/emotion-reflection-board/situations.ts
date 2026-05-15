export interface ReflectionSituation {
  id: string;
  emoji: string;
  situation: string;
  expectedEmotion: string; // Used for "Most people feel..." feedback
}

export const SITUATION_BANK: Record<number, ReflectionSituation[]> = {
  1: [
    { id: "1-1", emoji: "🍿", situation: "You get your favorite snack.", expectedEmotion: "happy" },
    { id: "1-2", emoji: "🧩", situation: "Your toy breaks.", expectedEmotion: "sad" },
    { id: "1-3", emoji: "🤝", situation: "You play with a friend.", expectedEmotion: "happy" },
    { id: "1-4", emoji: "🌧️", situation: "It starts raining during play.", expectedEmotion: "sad" },
    { id: "1-5", emoji: "🎈", situation: "Someone gives you a balloon.", expectedEmotion: "happy" },
    { id: "1-6", emoji: "🍦", situation: "You eat a cold ice cream.", expectedEmotion: "happy" },
    { id: "1-7", emoji: "🧸", situation: "You find a lost toy.", expectedEmotion: "happy" },
  ],
  2: [
    { id: "2-1", emoji: "✏️", situation: "A friend takes your pencil.", expectedEmotion: "angry" },
    { id: "2-2", emoji: "🎁", situation: "You get a surprise gift.", expectedEmotion: "surprised" },
    { id: "2-3", emoji: "🖼️", situation: "You lose your drawing.", expectedEmotion: "sad" },
    { id: "2-4", emoji: "🌟", situation: "Your teacher praises your work.", expectedEmotion: "happy" },
    { id: "2-5", emoji: "📣", situation: "Someone suddenly shouts loudly.", expectedEmotion: "surprised" },
    { id: "2-6", emoji: "🎂", situation: "It's your birthday today!", expectedEmotion: "happy" },
    { id: "2-7", emoji: "🚫", situation: "You are told 'no' to something you want.", expectedEmotion: "angry" },
    { id: "2-8", emoji: "🍪", situation: "You share a cookie with a friend.", expectedEmotion: "happy" },
  ],
  3: [
    { id: "3-1", emoji: "⚡", situation: "Loud thunder starts suddenly.", expectedEmotion: "scared" },
    { id: "3-2", emoji: "🏆", situation: "You finish a difficult activity.", expectedEmotion: "happy" },
    { id: "3-3", emoji: "⏳", situation: "You wait for your turn.", expectedEmotion: "calm" },
    { id: "3-4", emoji: "👤", situation: "A stranger talks to you.", expectedEmotion: "scared" },
    { id: "3-5", emoji: "🫂", situation: "Your parent hugs you after crying.", expectedEmotion: "calm" },
    { id: "3-6", emoji: "🕸️", situation: "You see a spider in your room.", expectedEmotion: "scared" },
    { id: "3-7", emoji: "🌙", situation: "It is quiet and peaceful at night.", expectedEmotion: "calm" },
    { id: "3-8", emoji: "🎨", situation: "You are painting a beautiful picture.", expectedEmotion: "calm" },
    { id: "3-9", emoji: "🔥", situation: "You accidentally touch something hot.", expectedEmotion: "surprised" },
    { id: "3-10", emoji: "🐕", situation: "A large dog barks at you.", expectedEmotion: "scared" },
  ],
};

export function getSituationsForLevel(level: number, count: number): ReflectionSituation[] {
  const all = SITUATION_BANK[level] || SITUATION_BANK[1];
  return [...all].sort(() => Math.random() - 0.5).slice(0, count);
}
