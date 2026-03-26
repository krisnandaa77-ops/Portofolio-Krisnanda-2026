"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Career", href: "#career" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <div
          className={`w-full max-w-6xl transition-all duration-500 rounded-2xl ${
            scrolled
              ? "bg-[var(--glass-bg)]/80 backdrop-blur-2xl shadow-xl shadow-black/5 dark:shadow-black/20 border border-[var(--glass-border)]"
              : "bg-[var(--glass-bg)]/50 backdrop-blur-xl border border-[var(--glass-border)]/50"
          }`}
        >
          <div className="px-5 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="text-lg font-bold tracking-tight shrink-0">
              <span className="gradient-text">K</span>
              <span className="text-[var(--text-primary)]">risnanda</span>
            </a>

            {/* Desktop Nav Links — centered */}
            <div className="hidden md:flex items-center gap-1 mx-auto">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeSection === link.href
                      ? "text-[var(--accent)] bg-[var(--accent)]/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-border)]/50"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side: Theme toggle + CTA */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--glass-border)]/50 hover:scale-105 transition-all duration-300"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={16} className="text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={16} className="text-indigo-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* CTA Button */}
              <a
                href="#portfolio"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white text-sm font-semibold hover:scale-105 hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300"
              >
                My Work
              </a>
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--glass-border)]/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={16} className="text-yellow-400" />
                ) : (
                  <Moon size={16} className="text-indigo-500" />
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--glass-border)]/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X size={18} className="text-[var(--text-primary)]" />
                ) : (
                  <Menu size={18} className="text-[var(--text-primary)]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-4 right-4 z-40 rounded-2xl bg-[var(--glass-bg)]/90 backdrop-blur-2xl border border-[var(--glass-border)] shadow-xl shadow-black/10 dark:shadow-black/30 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-3 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === link.href
                      ? "text-[var(--accent)] bg-[var(--accent)]/10"
                      : "text-[var(--text-primary)] hover:bg-[var(--glass-border)]/50"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Mobile CTA */}
              <a
                href="#portfolio"
                onClick={() => setMobileOpen(false)}
                className="mt-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white text-base font-semibold text-center hover:scale-[1.02] transition-transform"
              >
                My Work
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
