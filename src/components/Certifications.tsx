"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

type CertItem = {
  title: string;
  issuer: string;
  year: string;
  image: string;
};

const colorMap: Record<string, string> = {
  Google: "from-amber-500 to-yellow-500",
  Udemy: "from-purple-600 to-indigo-600",
};

function getColor(issuer: string, index: number): string {
  if (colorMap[issuer]) return colorMap[issuer];
  const colors = [
    "from-amber-500 to-yellow-500",
    "from-purple-600 to-indigo-600",
    "from-blue-500 to-cyan-500",
    "from-pink-500 to-rose-500",
    "from-green-500 to-emerald-500",
    "from-indigo-500 to-violet-500",
  ];
  return colors[index % colors.length];
}

function CertCard({
  cert,
  index,
  onClick,
}: {
  cert: CertItem;
  index: number;
  onClick: () => void;
}) {
  const color = getColor(cert.issuer, index);
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[340px]">
      <div
        onClick={onClick}
        className="glass rounded-2xl overflow-hidden h-full hover:scale-[1.03] transition-all duration-300 group cursor-pointer"
      >
        {/* Certificate Image */}
        <div className="relative w-full h-48 sm:h-56 overflow-hidden">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <ExternalLink
              size={28}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div
            className={`h-1 rounded-full bg-gradient-to-r ${color} mb-4 group-hover:h-1.5 transition-all duration-300`}
          />
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
            >
              <Award size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] text-sm leading-tight mb-1">
                {cert.title}
              </h3>
              <p className="text-xs text-[var(--accent)] font-medium">
                {cert.issuer}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Issued {cert.year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certifications({ data }: { data: CertItem[] }) {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  // Duplicate for seamless loop
  const duped = [...data, ...data, ...data, ...data];

  return (
    <SectionWrapper id="certifications">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4 block"
          >
            Credentials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
          >
            Licenses & <span className="gradient-text">Certifications</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-lg mx-auto"
          >
            Professional certifications that validate my expertise across
            marketing and technology.
          </motion.p>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none" />

          <div
            className="flex gap-6 animate-cert-scroll"
            style={{ width: "max-content" }}
          >
            {duped.map((cert, i) => (
              <CertCard
                key={`${cert.title}-${i}`}
                cert={cert}
                index={i % data.length}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-size Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[var(--glass-bg)] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getColor(selectedCert.issuer, 0)} flex items-center justify-center`}
                  >
                    <Award size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {selectedCert.issuer} · {selectedCert.year}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <X size={16} className="text-[var(--text-primary)]" />
                </button>
              </div>

              {/* Certificate Image */}
              <div className="relative w-full overflow-auto" style={{ maxHeight: "calc(90vh - 80px)" }}>
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  width={1200}
                  height={900}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
