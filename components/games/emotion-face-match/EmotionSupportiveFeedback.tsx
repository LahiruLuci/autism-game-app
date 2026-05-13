"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type EmotionSupportiveFeedbackProps = {
  type: "correct" | "incorrect" | null;
  visible: boolean;
};

const CORRECT_MESSAGES = [
  "Great job! 🌟",
  "Nice matching 😊",
  "Wonderful work 💛",
  "You found the feeling 🌈",
  "That was a kind answer ✨",
  "You're doing well 🌼",
];

const INCORRECT_MESSAGES = [
  "That’s okay 💛",
  "Let’s look carefully together 🌈",
  "Good try 😊",
  "We can practice this feeling again ✨",
  "Nice effort 🌼",
  "Let’s try another one gently 💫",
];

export function EmotionSupportiveFeedback({ type, visible }: EmotionSupportiveFeedbackProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (visible && type) {
      const messages = type === "correct" ? CORRECT_MESSAGES : INCORRECT_MESSAGES;
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [visible, type]);

  return (
    <div className="h-16 flex items-center justify-center">
      <AnimatePresence>
        {visible && type && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.2 } }}
            className={`px-8 py-3 rounded-full text-sm font-bold shadow-xl border-2 z-20 ${
              type === "correct" 
                ? "bg-green-50 text-green-700 border-green-100 shadow-green-900/5" 
                : "bg-orange-50 text-orange-700 border-orange-100 shadow-orange-900/5"
            }`}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              {message}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
