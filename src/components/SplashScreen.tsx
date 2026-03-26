"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "exit">("typing");

  const fullText = "Welcome to Krisnanda Suaryana's Portfolio";

  // Typewriter effect
  const typeText = useCallback(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setPhase("pause");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(() => setShow(false), 800);
        }, 800);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Small delay before starting typewriter
    const timeout = setTimeout(typeText, 600);
    return () => clearTimeout(timeout);
  }, [typeText]);

  // Render gradient parts
  const renderText = (text: string) => {
    const parts = text.split(/(Krisnanda Suaryana's)/);
    return parts.map((part, i) =>
      part === "Krisnanda Suaryana's" ? (
        <span
          key={i}
          className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent"
        >
          {part}
        </span>
      ) : (
        <span key={i} className="text-[var(--text-primary)]">{part}</span>
      )
    );
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-primary)]"
          >
            {/* Animated background grid */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute opacity-[0.03] animate-grid-scroll"
                style={{
                  inset: "-60px",
                  width: "calc(100% + 120px)",
                  height: "calc(100% + 120px)",
                  backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            {/* Typewriter text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 text-center px-6"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-relaxed">
                {renderText(typedText)}
                {phase === "typing" && (
                  <span
                    className="inline-block w-[3px] h-[1em] bg-[var(--accent)] ml-1 align-middle rounded-full animate-blink-cursor"
                  />
                )}
              </h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 mt-10 w-48 h-1 rounded-full bg-[var(--glass-border)] overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: fullText.length * 0.05 + 1.2,
                  ease: "easeInOut",
                }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always render children so they load in background */}
      <div
        style={{
          opacity: show ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
