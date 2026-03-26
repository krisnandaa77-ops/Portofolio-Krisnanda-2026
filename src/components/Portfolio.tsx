"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  X,
  ExternalLink,
  Instagram,
  Globe,
  MonitorSmartphone,
  Megaphone,
  Play,
  Eye,
} from "lucide-react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

type MarketingProject = {
  title: string;
  subtitle: string;
  description: string;
  reelUrl: string;
  thumbnail: string;
  gradient: string;
  account: string;
};

type ITProject = {
  title: string;
  subtitle: string;
  description: string;
  liveUrl: string;
  gradient: string;
};

type PortfolioData = {
  marketing: MarketingProject[];
  it: ITProject[];
};

/* ── Reusable marketing card ── */
function MarketingCard({
  project,
  onClick,
}: {
  project: MarketingProject;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group flex-shrink-0 w-[200px] sm:w-[240px]"
    >
      <div className="relative rounded-2xl overflow-hidden aspect-[9/16] glass">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}
        />
        {project.thumbnail && (
          <div className="absolute inset-0">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Instagram size={14} className="text-white" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-white/70 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
            Reels
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-bold text-white text-xs sm:text-sm leading-tight mb-0.5">
            {project.title}
          </h3>
          <p className="text-white/70 text-[9px] sm:text-[10px] font-medium mb-0.5">
            {project.subtitle}
          </p>
          <p className="text-white/50 text-[9px] leading-snug line-clamp-2 hidden sm:block">
            {project.description}
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            <Instagram size={9} className="text-white/50" />
            <span className="text-[9px] text-white/50">{project.account}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Infinite marquee row ── */
function MarqueeRow({
  items,
  direction,
  onCardClick,
}: {
  items: MarketingProject[];
  direction: "left" | "right";
  onCardClick: (p: MarketingProject) => void;
}) {
  // Duplicate items for seamless looping
  const duped = [...items, ...items, ...items, ...items];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none" />

      <div className={`flex gap-4 ${animClass}`} style={{ width: "max-content" }}>
        {duped.map((project, i) => (
          <MarketingCard
            key={`${project.title}-${i}`}
            project={project}
            onClick={() => onCardClick(project)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Portfolio({ data }: { data: PortfolioData }) {
  const [selectedReel, setSelectedReel] = useState<MarketingProject | null>(null);
  const [itModal, setItModal] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
  }>({ isOpen: false, title: "", url: "" });

  const getEmbedUrl = (reelUrl: string) => {
    try {
      const url = new URL(reelUrl);
      return `${url.origin}${url.pathname}embed`;
    } catch {
      return reelUrl + "/embed";
    }
  };

  // Split marketing items into 2 rows
  const half = Math.ceil(data.marketing.length / 2);
  const row1 = data.marketing.length > 0 ? data.marketing.slice(0, Math.max(half, 2)) : [];
  const row2 = data.marketing.length > 1 ? data.marketing.slice(half > 0 ? half : 1) : [];
  // If not enough items, duplicate for row2
  const row1Items = row1.length < 4 ? [...row1, ...row1, ...row1] : row1;
  const row2Items = (row2.length > 0 ? row2 : row1).length < 4
    ? [...(row2.length > 0 ? row2 : row1), ...(row2.length > 0 ? row2 : row1), ...(row2.length > 0 ? row2 : row1)]
    : (row2.length > 0 ? row2 : row1);

  return (
    <SectionWrapper id="portfolio">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
          >
            Featured <span className="gradient-text">Work</span>
          </motion.h2>
        </div>

        {/* ==================== DIGITAL MARKETING SECTION ==================== */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Megaphone size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Digital Marketing
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Social media content & campaign management
              </p>
            </div>
          </motion.div>

          {/* Row 1 — slides RIGHT */}
          <div className="mb-4">
            <MarqueeRow
              items={row1Items}
              direction="right"
              onCardClick={setSelectedReel}
            />
          </div>

          {/* Row 2 — slides LEFT */}
          <MarqueeRow
            items={row2Items}
            direction="left"
            onCardClick={setSelectedReel}
          />
        </div>

        {/* ==================== IT PROJECTS SECTION ==================== */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <MonitorSmartphone size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                IT Projects
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Web applications & software development
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {data.it.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  setItModal({
                    isOpen: true,
                    title: project.title,
                    url: project.liveUrl,
                  })
                }
                className="glass rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300"
              >
                <div
                  className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  {/* Scaled-down iframe as live preview thumbnail */}
                  <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
                    <iframe
                      src={project.liveUrl}
                      title={`${project.title} preview`}
                      className="border-0 pointer-events-none absolute top-0 left-0"
                      loading="lazy"
                      style={{
                        width: '250%',
                        height: '250%',
                        transform: 'scale(0.4)',
                        transformOrigin: 'top left',
                      }}
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to Preview
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                    <ExternalLink
                      size={14}
                      className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors"
                    />
                  </div>
                  <p className="text-xs text-[var(--accent)] font-medium mb-2">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== Reels Modal ==================== */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[380px] rounded-2xl overflow-hidden bg-black"
              style={{ aspectRatio: "9/16", maxHeight: "90vh" }}
            >
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-3 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center gap-2">
                  <Instagram size={16} className="text-white" />
                  <span className="text-white text-sm font-semibold">
                    {selectedReel.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={selectedReel.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink size={14} className="text-white" />
                  </a>
                  <button
                    onClick={() => setSelectedReel(null)}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X size={14} className="text-white" />
                  </button>
                </div>
              </div>
              <iframe
                src={getEmbedUrl(selectedReel.reelUrl)}
                className="w-full h-full border-0"
                title={selectedReel.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-medium mb-1">
                  {selectedReel.subtitle}
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  {selectedReel.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <a
                    href={selectedReel.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold hover:scale-105 transition-transform"
                  >
                    <Eye size={12} />
                    View on Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== IT Modal ==================== */}
      <AnimatePresence>
        {itModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() =>
              setItModal((prev) => ({ ...prev, isOpen: false }))
            }
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[80vh] glass rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-[var(--accent)]" />
                  <span className="font-medium text-[var(--text-primary)]">
                    {itModal.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={itModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ExternalLink
                      size={14}
                      className="text-[var(--text-secondary)]"
                    />
                  </a>
                  <button
                    onClick={() =>
                      setItModal((prev) => ({ ...prev, isOpen: false }))
                    }
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <X
                      size={14}
                      className="text-[var(--text-secondary)]"
                    />
                  </button>
                </div>
              </div>
              <iframe
                src={itModal.url}
                className="w-full h-[calc(100%-60px)] border-0"
                title={itModal.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
