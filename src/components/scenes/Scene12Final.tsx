'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SceneSection from '../ui/SceneSection';
import ParticleField from '../ui/ParticleField';

export default function Scene12Final() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.4 });

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene12" background="darker" className="scene12-final">
        <ParticleField count={45} color="#6366F1" />

        {/* Radial glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 50%)', zIndex: 1 }} />

        {/* Glow ring */}
        <motion.div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '450px', height: '450px', borderRadius: '50%', border: '1px solid rgba(99,102,241,0.15)', zIndex: 1, pointerEvents: 'none' }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: [0.5, 1.15, 1], opacity: [0, 0.25, 0.12] } : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 2, delay: 0.5 }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', fontWeight: 300, color: '#94A3B8', letterSpacing: '-0.02em' }}>
              This is just the beginning.
            </span>
          </motion.div>

          <motion.div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, #6366F1, transparent)', transformOrigin: 'center' }}
            initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.8, delay: 0.6 }} />

          <motion.div initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 1, delay: 0.8 }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', fontWeight: 800,
              background: 'linear-gradient(135deg, #E2E8F0 0%, #A5B4FC 50%, #6366F1 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              letterSpacing: '-0.03em',
            }}>Rohit Kumar Singh</h1>
            <motion.p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)', fontWeight: 500, color: '#818CF8', textTransform: 'uppercase', marginTop: '0.75rem' }}
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={isInView ? { opacity: 1, letterSpacing: '0.3em' } : { opacity: 0, letterSpacing: '0.5em' }}
              transition={{ duration: 1.2, delay: 1.2 }}>
              Project Manager
            </motion.p>
          </motion.div>
        </div>

        <motion.div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#64748B', letterSpacing: '0.3em' }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.5 } : { opacity: 0 }} transition={{ delay: 1.5 }}>
          2024 — 2025
        </motion.div>
      </SceneSection>
    </div>
  );
}
