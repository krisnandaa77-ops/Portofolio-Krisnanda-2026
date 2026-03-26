"use client";

import { motion } from "framer-motion";
import {
  Megaphone,
  MonitorSmartphone,
  Code2,
  Palette,
  Globe,
  Database,
  Smartphone,
  GitBranch,
  Sparkles,
  Video,
  BarChart3,
  Layers,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";

type SkillItem = { name: string; icon: string; level: number };
type SkillsData = {
  marketing: SkillItem[];
  it: SkillItem[];
};

const iconMap: Record<string, React.ElementType> = {
  Megaphone,
  MonitorSmartphone,
  Code2,
  Palette,
  Globe,
  Database,
  Smartphone,
  GitBranch,
  Sparkles,
  Video,
  BarChart3,
  Layers,
};

function SkillBar({ name, icon, level, delay }: { name: string; icon: string; level: number; delay: number }) {
  const Icon = iconMap[icon] || Code2;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 opacity-80">
          <Icon size={14} className="text-white" />
        </div>
        <span className="text-sm font-medium text-[var(--text-primary)]">{name}</span>
        <span className="ml-auto text-xs text-[var(--text-secondary)]">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--glass-bg)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
        />
      </div>
    </motion.div>
  );
}

export default function Skills({ data }: { data: SkillsData }) {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block"
          >
            Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Marketing Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 glow"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Megaphone size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Marketing</h3>
                <p className="text-xs text-[var(--text-secondary)]">Digital & Creative</p>
              </div>
            </div>
            <div className="space-y-5">
              {data.marketing.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* IT Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass rounded-2xl p-8 glow"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                <Code2 size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">IT & Development</h3>
                <p className="text-xs text-[var(--text-secondary)]">Full-Stack & Tools</p>
              </div>
            </div>
            <div className="space-y-5">
              {data.it.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
