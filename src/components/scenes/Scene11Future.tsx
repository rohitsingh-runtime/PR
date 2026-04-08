'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneSection from '../ui/SceneSection';
import AnimatedText from '../ui/AnimatedText';
import Character from '../character/Character';
import ParticleField from '../ui/ParticleField';

gsap.registerPlugin(ScrollTrigger);

export default function Scene11Future() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.future-path', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, scrollTrigger: { trigger: sceneRef.current, start: 'top 50%', end: 'center center', scrub: true } });
      gsap.fromTo('.future-city', { scale: 0.75, opacity: 0 }, { scale: 1, opacity: 1, scrollTrigger: { trigger: sceneRef.current, start: 'top 50%', end: 'bottom center', scrub: true } });
      gsap.fromTo('.light-ray', { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 0.25, stagger: 0.08, scrollTrigger: { trigger: sceneRef.current, start: 'top 40%', toggleActions: 'play none none reverse' } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene11" background="cinematic" className="scene11-future">
        <ParticleField count={35} color="#A5B4FC" />

        {/* Light rays */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="light-ray" style={{ position: 'absolute', left: `${38 + i * 4}%`, bottom: '28%', width: '2px', height: `${100 + i * 25}px`, background: 'linear-gradient(to top, #6366F140, transparent)', transformOrigin: 'bottom center', transform: `rotate(${(i - 3) * 5}deg)` }} />
          ))}
        </div>

        {/* Future city */}
        <div className="future-city" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 3 }}>
          <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" style={{ width: '100%', height: 'auto', maxHeight: '300px' }}>
            <defs>
              <linearGradient id="futBldg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1E1B4B" /><stop offset="100%" stopColor="#0F0D2E" /></linearGradient>
            </defs>
            <rect x="80" y="50" width="65" height="250" rx="4" fill="url(#futBldg)" opacity="0.55" />
            <rect x="80" y="45" width="65" height="8" rx="2" fill="#818CF8" opacity="0.3" />
            <rect x="190" y="90" width="85" height="210" rx="4" fill="url(#futBldg)" opacity="0.6" />
            <rect x="190" y="85" width="85" height="8" rx="2" fill="#6366F1" opacity="0.35" />
            <rect x="330" y="30" width="110" height="270" rx="6" fill="url(#futBldg)" opacity="0.7" />
            <rect x="330" y="24" width="110" height="10" rx="3" fill="#A5B4FC" opacity="0.4" />
            <circle cx="385" cy="24" r="12" fill="#6366F1" opacity="0.1"><animate attributeName="opacity" values="0.08;0.2;0.08" dur="3s" repeatCount="indefinite" /></circle>
            <rect x="500" y="60" width="130" height="240" rx="6" fill="url(#futBldg)" opacity="0.65" />
            <rect x="500" y="54" width="130" height="10" rx="3" fill="#818CF8" opacity="0.3" />
            <rect x="690" y="80" width="95" height="220" rx="4" fill="url(#futBldg)" opacity="0.55" />
            <rect x="840" y="40" width="120" height="260" rx="6" fill="url(#futBldg)" opacity="0.6" />
            <rect x="840" y="34" width="120" height="10" rx="3" fill="#6366F1" opacity="0.35" />
            <rect x="1010" y="100" width="75" height="200" rx="4" fill="url(#futBldg)" opacity="0.45" />
            {/* Glow windows */}
            {[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3, 4, 5].map(c => {
              const idx = r * 6 + c;
              const op = 0.06 + (idx % 7) * 0.018;
              return <rect key={`fw-${r}-${c}`} x={110 + c * 175} y={90 + r * 45} width="30" height="20" rx="2" fill="#6366F1" opacity={op}>
                <animate attributeName="opacity" values={`0.04;${0.12 + (idx % 4) * 0.025};0.04`} dur={`${3.5 + (idx % 5) * 0.7}s`} repeatCount="indefinite" />
              </rect>;
            }))}
            <rect x="0" y="295" width="1200" height="10" fill="#0A0820" />
            <rect x="0" y="290" width="1200" height="6" fill="#6366F1" opacity="0.1" />
          </svg>
        </div>

        {/* Glowing path */}
        <div style={{ position: 'absolute', bottom: '20%', left: '28%', width: '44%', zIndex: 4 }}>
          <div className="future-path" style={{ width: '100%', height: '3px', background: 'linear-gradient(90deg, #6366F1, #A5B4FC, transparent)', borderRadius: '2px', boxShadow: '0 0 12px #6366F1, 0 0 25px rgba(99,102,241,0.25)' }} />
        </div>

        {/* Character */}
        <motion.div style={{ position: 'absolute', bottom: '16%', left: '22%', zIndex: 10 }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          <Character size="large" variant="looking" glowing evolution={0.9} />
        </motion.div>

        <div className="scene-text-overlay scene-text-bottom">
          <AnimatedText variant="quote" splitWords>
            Building teams. Scaling impact. Leading the future.
          </AnimatedText>
        </div>
      </SceneSection>
    </div>
  );
}
