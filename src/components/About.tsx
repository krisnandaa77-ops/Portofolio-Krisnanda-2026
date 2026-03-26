"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles, Code2, Instagram, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

type AboutData = {
  name: string;
  photo: string;
  bio: string[];
  location: string;
  education: {
    school: string;
    period: string;
    location: string;
    description: string;
  }[];
};

export default function About({ data }: { data: AboutData }) {
  return (
    <SectionWrapper id="about">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block"
          >
            About Me
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6"
          >
            My <span className="gradient-text">Story</span>
          </motion.h2>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Photo / Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center"
          >
            <div className="relative w-72 h-72 sm:w-[340px] sm:h-[340px]">
              {/* === Rotating gradient ring === */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-5 rounded-[2rem] border-2 border-transparent"
                style={{
                  background: "linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box, linear-gradient(135deg, var(--accent), var(--accent-secondary), transparent, var(--accent)) border-box",
                }}
              />


              {/* === Glow blob behind photo === */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--accent-secondary)]/10 blur-2xl -z-10 scale-110" />

              {/* === Corner accent lines === */}
              <svg className="absolute -top-3 -left-3 w-8 h-8 opacity-40" viewBox="0 0 32 32">
                <path d="M0 16 L0 0 L16 0" fill="none" stroke="var(--accent)" strokeWidth="2" />
              </svg>
              <svg className="absolute -bottom-3 -right-3 w-8 h-8 opacity-40" viewBox="0 0 32 32">
                <path d="M32 16 L32 32 L16 32" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" />
              </svg>

              {/* === Main photo === */}
              <div className="w-full h-full rounded-3xl glass glow overflow-hidden relative z-10">
                <Image
                  src={data.photo}
                  alt={data.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle inner glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/5 via-transparent to-transparent" />
              </div>

              {/* === Status badge (bottom-center) === */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full glass backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-[var(--text-primary)] whitespace-nowrap">Available for Work</span>
              </motion.div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              {data.name}
            </h3>
            {data.bio.map((paragraph, index) => (
              <p key={index} className="text-[var(--text-secondary)] leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <a href="https://www.instagram.com/krisnandaputu" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:scale-110 hover:bg-[var(--accent)]/10 transition-all duration-300 group/icon">
                <Instagram size={16} className="text-[var(--text-secondary)] group-hover/icon:text-[var(--accent)] transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/krisnanda" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:scale-110 hover:bg-[var(--accent)]/10 transition-all duration-300 group/icon">
                <Linkedin size={16} className="text-[var(--text-secondary)] group-hover/icon:text-[var(--accent)] transition-colors" />
              </a>
              <a href="https://www.tiktok.com/@krisnanda" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:scale-110 hover:bg-[var(--accent)]/10 transition-all duration-300 group/icon">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[var(--text-secondary)] group-hover/icon:text-[var(--accent)] transition-colors"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.28 8.28 0 0 0 4.84 1.56v-3.5a4.85 4.85 0 0 1-1.08-.06z"/></svg>
              </a>
              <a href="https://github.com/krisnanda" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:scale-110 hover:bg-[var(--accent)]/10 transition-all duration-300 group/icon">
                <Github size={16} className="text-[var(--text-secondary)] group-hover/icon:text-[var(--accent)] transition-colors" />
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:scale-110 hover:bg-[var(--accent)]/10 transition-all duration-300 group/icon">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[var(--text-secondary)] group-hover/icon:text-[var(--accent)] transition-colors"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Education Timeline */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-[var(--text-primary)] text-center mb-12"
          >
            Education
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {data.education.map((edu, index) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                      {edu.school}
                    </h4>
                    <p className="text-sm text-[var(--accent)] font-medium mb-1">
                      {edu.period}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mb-2 flex items-center gap-1">
                      <MapPin size={10} /> {edu.location}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
