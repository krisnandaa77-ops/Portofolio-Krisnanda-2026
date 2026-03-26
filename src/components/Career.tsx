"use client";

import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Camera, Code, Leaf, Sparkles as SparklesIcon } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

type CareerItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievement: string;
  icon: string;
  color: string;
};

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Camera,
  Code,
  Leaf,
  Briefcase,
  Sparkles: SparklesIcon,
};

export default function Career({ data }: { data: CareerItem[] }) {
  return (
    <SectionWrapper id="career" className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block"
          >
            Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
          >
            Career <span className="gradient-text">Journey</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent)] opacity-20" />

          {data.map((career, index) => {
            const IconComponent = iconMap[career.icon] || Briefcase;
            return (
              <motion.div
                key={career.company + index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent)] z-10 mt-8">
                  <div className="absolute inset-0 rounded-full bg-[var(--accent)] animate-ping opacity-20" />
                </div>

                {/* Card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${career.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--text-primary)]">
                          {career.company}
                        </h3>
                        <p className="text-xs text-[var(--accent)] font-medium">
                          {career.period}
                        </p>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase size={14} className="text-[var(--text-secondary)]" />
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {career.role}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                      {career.description}
                    </p>

                    {/* Achievement */}
                    <div className="glass rounded-xl p-3">
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        <span className="text-[var(--accent)] font-semibold">✦ </span>
                        {career.achievement}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
