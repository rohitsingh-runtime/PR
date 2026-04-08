'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
  }, [mounted]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowCTA(true);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleBegin = useCallback(() => {
    setIsComplete(true);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="loading-content">
            {/* Small top text */}
            <motion.div
              className="loading-top-label"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A Journey of Growth
            </motion.div>

            {/* Hero name */}
            <motion.div
              className="loading-hero-name"
              data-text="Rohit Kumar Singh"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Rohit Kumar Singh
            </motion.div>

            {/* Subtext */}
            <motion.div
              className="loading-subtext"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="loading-subtext-line">From Intern to Project Manager</span>
              <span className="loading-subtext-company">Runtime Solutions Pvt. Ltd.</span>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="loading-divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            />

            {/* Progress bar — visible while loading */}
            {!showCTA && (
              <>
                <div className="loading-bar-container">
                  <motion.div
                    className="loading-bar"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <motion.p
                  className="loading-percentage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.5 }}
                >
                  {Math.min(Math.round(progress), 100)}%
                </motion.p>
              </>
            )}

            {/* CTA Button — appears after loading */}
            <AnimatePresence>
              {showCTA && (
                <motion.button
                  className="loading-cta"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={handleBegin}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Let&apos;s Begin →
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Background particles for loading */}
          <div className="loading-particles">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="loading-particle"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                }}
              />
            ))}
          </div>

          {/* Ambient glow behind name */}
          <div className="loading-ambient-glow" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
