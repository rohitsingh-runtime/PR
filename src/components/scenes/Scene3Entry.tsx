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

export default function Scene3Entry() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.office-env', { y: 80, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { trigger: sceneRef.current, start: 'top 70%', end: 'center center', scrub: 1 } });
      gsap.fromTo('.entry-char', { y: -60, scale: 0.6, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'power3.out', duration: 1.2, scrollTrigger: { trigger: sceneRef.current, start: 'top 50%', toggleActions: 'play none none reverse' } });
      gsap.fromTo('.desk-elements', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.15, scrollTrigger: { trigger: sceneRef.current, start: 'top 40%', toggleActions: 'play none none reverse' } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene3" background="gradient" className="scene3-entry">
        <ParticleField count={20} color="#818CF8" />

        {/* Office environment */}
        <div className="office-env" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 2 }}>
          <svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" style={{ width: '100%', height: 'auto', maxHeight: '420px' }}>
            <defs>
              <linearGradient id="offBldg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1E1B4B" /><stop offset="100%" stopColor="#0F0D2E" /></linearGradient>
              <linearGradient id="screenGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366F1" stopOpacity="0.12" /><stop offset="100%" stopColor="#4338CA" stopOpacity="0.05" /></linearGradient>
            </defs>

            {/* Background towers */}
            <rect x="80" y="60" width="90" height="360" rx="4" fill="url(#offBldg)" opacity="0.7" />
            <rect x="80" y="55" width="90" height="8" rx="2" fill="#6366F1" opacity="0.3" />

            <rect x="210" y="120" width="130" height="300" rx="4" fill="url(#offBldg)" opacity="0.6" />

            {/* Main office building with RUNTIME */}
            <rect x="400" y="30" width="220" height="390" rx="6" fill="url(#offBldg)" opacity="0.9" />
            <rect x="400" y="24" width="220" height="12" rx="3" fill="#6366F1" opacity="0.4" />
            <text x="510" y="58" textAnchor="middle" fill="#6366F1" fontSize="14" fontWeight="700" opacity="0.6" fontFamily="var(--font-heading)" letterSpacing="0.3em">RUNTIME</text>

            {/* Office windows */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(r => [0, 1, 2, 3].map(c => {
              const idx = r * 4 + c;
              const lit = [0, 2, 5, 6, 9, 11, 12, 15, 17, 20, 22, 25, 27, 28, 30, 31];
              const isLit = lit.includes(idx);
              return (
                <rect key={`ow-${r}-${c}`} x={418 + c * 50} y={75 + r * 44} width="38" height="34" rx="3"
                  fill={isLit ? 'url(#screenGlow)' : '#0A0820'} stroke={isLit ? '#6366F120' : 'none'} strokeWidth="1"
                  opacity={isLit ? 0.8 : 0.85}>
                  {isLit && <animate attributeName="opacity" values="0.6;0.9;0.6" dur={`${3 + (idx % 5)}s`} repeatCount="indefinite" />}
                </rect>
              );
            }))}

            {/* Entrance */}
            <rect x="485" y="380" width="50" height="40" rx="3" fill="#312E81" />
            <rect x="497" y="385" width="26" height="35" rx="2" fill="#4338CA" opacity="0.4" />
            <circle cx="510" cy="402" r="2" fill="#6366F1" opacity="0.6" />

            {/* Right towers */}
            <rect x="680" y="100" width="110" height="320" rx="4" fill="url(#offBldg)" opacity="0.6" />
            <rect x="840" y="160" width="90" height="260" rx="4" fill="url(#offBldg)" opacity="0.5" />
            <rect x="980" y="80" width="130" height="340" rx="4" fill="url(#offBldg)" opacity="0.55" />

            {/* Ground */}
            <rect x="0" y="415" width="1200" height="10" fill="#0A0820" />
            <rect x="0" y="412" width="1200" height="4" fill="#6366F1" opacity="0.1" />
          </svg>
        </div>

        {/* Desk & screen elements */}
        <div className="desk-elements" style={{ position: 'absolute', bottom: '18%', left: '50%', transform: 'translateX(-50%)', zIndex: 6, display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
          {/* Monitor */}
          <motion.div className="glass-card" style={{ width: '140px', padding: '0.5rem', borderColor: '#6366F120' }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 0.6, y: 0 } : { opacity: 0 }} transition={{ delay: 0.8 }}>
            <div style={{ height: '80px', background: '#0A0820', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '3px', padding: '8px' }}>
              <div style={{ width: '60%', height: '3px', background: '#6366F130', borderRadius: '2px' }} />
              <div style={{ width: '80%', height: '3px', background: '#6366F120', borderRadius: '2px' }} />
              <div style={{ width: '45%', height: '3px', background: '#6366F115', borderRadius: '2px' }} />
              <div style={{ width: '70%', height: '3px', background: '#6366F120', borderRadius: '2px' }} />
            </div>
            <div style={{ width: '30px', height: '4px', background: '#374151', margin: '0 auto', borderRadius: '0 0 2px 2px' }} />
          </motion.div>
        </div>

        {/* Character */}
        <motion.div className="entry-char" style={{ position: 'absolute', bottom: '14%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <Character size="small" variant="standing" evolution={0.15} />
        </motion.div>

        {/* Text */}
        <div className="scene-text-overlay">
          <AnimatedText variant="quote" splitWords>
            No way back. Only one direction — forward.
          </AnimatedText>
          <motion.p style={{ color: '#94A3B8', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', marginTop: '0.75rem', fontWeight: 400, textAlign: 'center' }}
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.6 } : { opacity: 0 }} transition={{ delay: 1 }}>
            I stepped into a new world — learning, adapting, surviving.
          </motion.p>
        </div>
      </SceneSection>
    </div>
  );
}
