"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, ExternalLink } from "lucide-react";
import Image from "next/image";

type Achievement = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export default function Achievements({ data }: { data: Achievement[] }) {
  const [selected, setSelected] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="py-20 md:py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] mb-6">
            <Trophy className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--accent)]">ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Milestones &{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Key accomplishments throughout my career in Digital Marketing and IT.
          </p>
        </motion.div>

        {/* Achievement cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelected(item)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image with gradient overlay */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm line-clamp-2 drop-shadow-md">
                    {item.description}
                  </p>
                </div>

                {/* Hover icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal iframe */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-[var(--bg-primary)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--glass-border)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--glass-border)]">
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] text-lg">
                    {selected.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {selected.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-9 h-9 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
                >
                  <X className="w-4 h-4 text-[var(--text-primary)]" />
                </button>
              </div>

              {/* Iframe */}
              <div className="relative w-full" style={{ height: "70vh" }}>
                <iframe
                  src={selected.link}
                  title={selected.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Open in new tab link */}
              <div className="px-5 py-3 border-t border-[var(--glass-border)] flex justify-end">
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
