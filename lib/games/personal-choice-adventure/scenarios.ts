export interface ChoiceOption {
  id: string;
  emoji: string;
  text: string;
  isCorrect: boolean;
}

export interface ChoiceScenario {
  id: string;
  emoji: string;
  situation: string;
  question: string;
  options: ChoiceOption[];
}

export const SCENARIO_BANK: Record<number, ChoiceScenario[]> = {
  1: [
    {
      id: "1-1",
      emoji: "💧",
      situation: "You feel thirsty.",
      question: "What can help?",
      options: [
        { id: "1-1-c", emoji: "🥛", text: "Drink water", isCorrect: true },
        { id: "1-1-w", emoji: "🧸", text: "Play with toys", isCorrect: false },
      ],
    },
    {
      id: "1-2",
      emoji: "🙌",
      situation: "Your hands are dirty.",
      question: "What should you do?",
      options: [
        { id: "1-2-c", emoji: "🧼", text: "Wash hands", isCorrect: true },
        { id: "1-2-w", emoji: "🍎", text: "Touch food", isCorrect: false },
      ],
    },
    {
      id: "1-3",
      emoji: "🥱",
      situation: "You feel sleepy.",
      question: "What can help?",
      options: [
        { id: "1-3-c", emoji: "🛌", text: "Rest", isCorrect: true },
        { id: "1-3-w", emoji: "🏃", text: "Run around", isCorrect: false },
      ],
    },
    {
      id: "1-4",
      emoji: "🧴",
      situation: "You need help opening a bottle.",
      question: "What should you do?",
      options: [
        { id: "1-4-c", emoji: "🙋", text: "Ask an adult", isCorrect: true },
        { id: "1-4-w", emoji: "💢", text: "Throw it", isCorrect: false },
      ],
    },
    {
      id: "1-5",
      emoji: "🍱",
      situation: "You finished eating.",
      question: "What should you do?",
      options: [
        { id: "1-5-c", emoji: "🍽️", text: "Clean your plate", isCorrect: true },
        { id: "1-5-w", emoji: "🧹", text: "Leave it on the floor", isCorrect: false },
      ],
    },
  ],
  2: [
    {
      id: "2-1",
      emoji: "🎒",
      situation: "You are getting ready for school.",
      question: "What should you do first?",
      options: [
        { id: "2-1-c", emoji: "🪥", text: "Brush teeth", isCorrect: true },
        { id: "2-1-w1", emoji: "📺", text: "Watch TV", isCorrect: false },
        { id: "2-1-w2", emoji: "👞", text: "Hide shoes", isCorrect: false },
      ],
    },
    {
      id: "2-2",
      emoji: "✏️",
      situation: "You cannot find your pencil.",
      question: "What is a good choice?",
      options: [
        { id: "2-2-c", emoji: "🙋", text: "Ask for help", isCorrect: true },
        { id: "2-2-w1", emoji: "😭", text: "Cry loudly", isCorrect: false },
        { id: "2-2-w2", emoji: "🗯️", text: "Push things", isCorrect: false },
      ],
    },
    {
      id: "2-3",
      emoji: "🌊",
      situation: "You spilled water.",
      question: "What should you do?",
      options: [
        { id: "2-3-c", emoji: "🧽", text: "Tell an adult and wipe it", isCorrect: true },
        { id: "2-3-w1", emoji: "🚶", text: "Walk away", isCorrect: false },
        { id: "2-3-w2", emoji: "😆", text: "Laugh at it", isCorrect: false },
      ],
    },
    {
      id: "2-4",
      emoji: "🧸",
      situation: "It is time to stop playing and eat.",
      question: "What should you do?",
      options: [
        { id: "2-4-c", emoji: "📦", text: "Put toys away", isCorrect: true },
        { id: "2-4-w1", emoji: "💢", text: "Throw toys", isCorrect: false },
        { id: "2-4-w2", emoji: "🙈", text: "Hide under table", isCorrect: false },
      ],
    },
    {
      id: "2-5",
      emoji: "❄️",
      situation: "You feel cold.",
      question: "What can help?",
      options: [
        { id: "2-5-c", emoji: "🧥", text: "Wear a jacket", isCorrect: true },
        { id: "2-5-w1", emoji: "🧦", text: "Remove socks", isCorrect: false },
        { id: "2-5-w2", emoji: "🪟", text: "Open the window", isCorrect: false },
      ],
    },
    {
      id: "2-6",
      emoji: "🛣️",
      situation: "You need to cross the road.",
      question: "What should you do?",
      options: [
        { id: "2-6-c", emoji: "🤝", text: "Hold an adult's hand", isCorrect: true },
        { id: "2-6-w1", emoji: "🏃", text: "Run alone", isCorrect: false },
        { id: "2-6-w2", emoji: "🙈", text: "Close eyes", isCorrect: false },
      ],
    },
    {
      id: "2-7",
      emoji: "🖍️",
      situation: "You finished using crayons.",
      question: "What should you do?",
      options: [
        { id: "2-7-c", emoji: "📥", text: "Put crayons back", isCorrect: true },
        { id: "2-7-w1", emoji: "📍", text: "Drop them", isCorrect: false },
        { id: "2-7-w2", emoji: "📄", text: "Tear paper", isCorrect: false },
      ],
    },
    {
      id: "2-8",
      emoji: "🏫",
      situation: "You feel worried in class.",
      question: "What can help?",
      options: [
        { id: "2-8-c", emoji: "👩‍🏫", text: "Tell teacher", isCorrect: true },
        { id: "2-8-w1", emoji: "🏃", text: "Run outside", isCorrect: false },
        { id: "2-8-w2", emoji: "🪑", text: "Push chair", isCorrect: false },
      ],
    },
  ],
  3: [
    {
      id: "3-1",
      emoji: "🧸",
      situation: "A friend is using the toy you want.",
      question: "What is a good choice?",
      options: [
        { id: "3-1-c", emoji: "⏳", text: "Wait for your turn", isCorrect: true },
        { id: "3-1-w1", emoji: "💢", text: "Grab it", isCorrect: false },
        { id: "3-1-w2", emoji: "🗯️", text: "Shout", isCorrect: false },
        { id: "3-1-w3", emoji: "🚶", text: "Walk away without asking", isCorrect: false },
      ],
    },
    {
      id: "3-2",
      emoji: "🎮",
      situation: "You feel angry because a game ended.",
      question: "What can help?",
      options: [
        { id: "3-2-c", emoji: "🌬️", text: "Take a calm breath", isCorrect: true },
        { id: "3-2-w1", emoji: "💢", text: "Throw the game", isCorrect: false },
        { id: "3-2-w2", emoji: "🗯️", text: "Shout", isCorrect: false },
        { id: "3-2-w3", emoji: "🥊", text: "Hit table", isCorrect: false },
      ],
    },
    {
      id: "3-3",
      emoji: "🔊",
      situation: "You hear a loud sound and feel uncomfortable.",
      question: "What can help?",
      options: [
        { id: "3-3-c", emoji: "🙉", text: "Cover ears and ask for help", isCorrect: true },
        { id: "3-3-w1", emoji: "🏃", text: "Run away", isCorrect: false },
        { id: "3-3-w2", emoji: "😱", text: "Scream at others", isCorrect: false },
        { id: "3-3-w3", emoji: "💢", text: "Throw objects", isCorrect: false },
      ],
    },
    {
      id: "3-4",
      emoji: "🎨",
      situation: "You make a mistake in an activity.",
      question: "What is a good choice?",
      options: [
        { id: "3-4-c", emoji: "🔄", text: "Try again slowly", isCorrect: true },
        { id: "3-4-w1", emoji: "🚫", text: "Quit forever", isCorrect: false },
        { id: "3-4-w2", emoji: "📄", text: "Tear paper", isCorrect: false },
        { id: "3-4-w3", emoji: "💨", text: "Push it away", isCorrect: false },
      ],
    },
    {
      id: "3-5",
      emoji: "👋",
      situation: "Someone says hello to you.",
      question: "What can you do?",
      options: [
        { id: "3-5-c", emoji: "🙋", text: "Wave or say hello", isCorrect: true },
        { id: "3-5-w1", emoji: "🥊", text: "Push them", isCorrect: false },
        { id: "3-5-w2", emoji: "🙈", text: "Hide", isCorrect: false },
        { id: "3-5-w3", emoji: "🗯️", text: "Shout", isCorrect: false },
      ],
    },
    {
      id: "3-6",
      emoji: "🚶",
      situation: "You are waiting in line.",
      question: "What is a good choice?",
      options: [
        { id: "3-6-c", emoji: "⏳", text: "Wait calmly", isCorrect: true },
        { id: "3-6-w1", emoji: "🗯️", text: "Push forward", isCorrect: false },
        { id: "3-6-w2", emoji: "🚶", text: "Leave", isCorrect: false },
        { id: "3-6-w3", emoji: "🗯️", text: "Shout", isCorrect: false },
      ],
    },
    {
      id: "3-7",
      emoji: "🍎",
      situation: "You feel hungry but food is not ready yet.",
      question: "What can help?",
      options: [
        { id: "3-7-c", emoji: "🙋", text: "Ask politely and wait", isCorrect: true },
        { id: "3-7-w1", emoji: "😭", text: "Cry loudly", isCorrect: false },
        { id: "3-7-w2", emoji: "🍎", text: "Grab food", isCorrect: false },
        { id: "3-7-w3", emoji: "💢", text: "Throw plate", isCorrect: false },
      ],
    },
    {
      id: "3-8",
      emoji: "💆",
      situation: "You need a break.",
      question: "What is a good choice?",
      options: [
        { id: "3-8-c", emoji: "⏸️", text: "Ask for a short break", isCorrect: true },
        { id: "3-8-w1", emoji: "🏃", text: "Run away", isCorrect: false },
        { id: "3-8-w2", emoji: "🥊", text: "Hit table", isCorrect: false },
        { id: "3-8-w3", emoji: "🗯️", text: "Shout", isCorrect: false },
      ],
    },
    {
      id: "3-9",
      emoji: "🧸",
      situation: "Your toy breaks.",
      question: "What should you do?",
      options: [
        { id: "3-9-c", emoji: "🙋", text: "Ask an adult for help", isCorrect: true },
        { id: "3-9-w1", emoji: "💢", text: "Throw it", isCorrect: false },
        { id: "3-9-w2", emoji: "😱", text: "Scream", isCorrect: false },
        { id: "3-9-w3", emoji: "👉", text: "Blame others", isCorrect: false },
      ],
    },
    {
      id: "3-10",
      emoji: "❓",
      situation: "You are unsure what to do next.",
      question: "What can help?",
      options: [
        { id: "3-10-c", emoji: "👂", text: "Ask for instructions", isCorrect: true },
        { id: "3-10-w1", emoji: "💨", text: "Guess quickly", isCorrect: false },
        { id: "3-10-w2", emoji: "🏃", text: "Run away", isCorrect: false },
        { id: "3-10-w3", emoji: "🛑", text: "Stop listening", isCorrect: false },
      ],
    },
  ],
};

export function getScenariosForLevel(level: number, count: number): ChoiceScenario[] {
  const all = SCENARIO_BANK[level] || SCENARIO_BANK[1];
  return [...all].sort(() => Math.random() - 0.5).slice(0, count);
}
