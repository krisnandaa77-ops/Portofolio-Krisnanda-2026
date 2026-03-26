"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, Heart, ArrowUp, Twitter } from "lucide-react";

type FooterData = {
  tagline: string;
  email: string;
  social: {
    platform: string;
    url: string;
    icon: string;
  }[];
};

const iconMap: Record<string, React.ElementType> = {
  Instagram,
  Linkedin,
  Github,
  Mail,
  Twitter,
};

export default function Footer({ data }: { data: FooterData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--glass-border)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">K</span>
              <span className="text-[var(--text-primary)]">risnanda</span>
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {data.tagline}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Career", "Skills", "Portfolio", "Certifications"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-[var(--text-primary)] mb-4">Connect</h4>
            <div className="flex gap-3 mb-6">
              {data.social.map((social) => {
                const Icon = iconMap[social.icon] || Mail;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-110 hover:text-[var(--accent)] transition-all duration-300 text-[var(--text-secondary)]"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              {data.email}
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[var(--glass-border)]">
          <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1 mb-4 sm:mb-0">
            © 2024 Krisnanda. Made with <Heart size={12} className="text-red-500 fill-red-500" /> in Bali.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300 group"
          >
            Back to top
            <span className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
