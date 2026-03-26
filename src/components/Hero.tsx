"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, Sparkles, Download } from "lucide-react";

type HeroData = {
  badge: string;
  heading: string;
  titles: string[];
  description: string;
  ctaText: string;
  ctaLink: string;
  cvFile: string;
};

export default function Hero({ data }: { data: HeroData }) {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % data.titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [data.titles.length]);

  // Split heading into parts for gradient styling
  const headingParts = data.heading.split(/(Digital Innovation|Marketing)/);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.07] blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent-secondary)] opacity-[0.07] blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] opacity-[0.04] blur-[150px]" />
      </div>

      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute opacity-[0.04] animate-grid-scroll"
          style={{
            inset: "-60px",
            width: "calc(100% + 120px)",
            height: "calc(100% + 120px)",
            backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8"
        >
          <Sparkles size={14} className="text-[var(--accent)]" />
          <span className="text-xs font-medium tracking-wider uppercase text-[var(--text-secondary)]">
            {data.badge}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          {headingParts.map((part, i) =>
            part === "Digital Innovation" || part === "Marketing" ? (
              <span key={i} className="gradient-text">{part}</span>
            ) : (
              <span key={i} className="text-[var(--text-primary)]">
                {part.includes("and Strategic") ? (
                  <>
                    <br />
                    <span className="text-[var(--text-primary)]">{part}</span>
                  </>
                ) : part.includes("Bridging") ? (
                  <>
                    {part}
                    <br />
                  </>
                ) : (
                  part
                )}
              </span>
            )
          )}
        </motion.h1>

        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-10 mb-8 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl font-medium text-[var(--accent)]"
            >
              {data.titles[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--text-secondary)] mb-12 leading-relaxed"
        >
          {data.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href={data.ctaLink}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white font-medium hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 hover:scale-105"
          >
            {data.ctaText}
          </a>
          <a
            href={data.cvFile}
            download
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass font-medium text-[var(--text-primary)] hover:scale-105 transition-all duration-300"
          >
            <Download size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex justify-center"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-9 h-16 rounded-full border-2 border-[var(--text-secondary)]/30 flex items-center justify-center hover:border-[var(--accent)]/50 transition-colors duration-300 cursor-pointer"
          >
            <ArrowDown size={18} className="text-[var(--text-secondary)]" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
