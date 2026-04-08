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

export default function Scene1Beginning() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.college-bg-layer1', { y: -30, ease: 'none', scrollTrigger: { trigger: sceneRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.college-bg-layer2', { y: -60, ease: 'none', scrollTrigger: { trigger: sceneRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.college-loop', { opacity: 0, filter: 'blur(10px)', scrollTrigger: { trigger: sceneRef.current, start: 'center center', end: 'bottom center', scrub: true } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  // Deterministic window data: [row, col, opacity, lit(true/false), animDur]
  const bldg1Windows = [
    { r: 0, c: 0, op: 0.7, lit: true, dur: '4.2s' }, { r: 0, c: 1, op: 0.15, lit: false, dur: '5s' }, { r: 0, c: 2, op: 0.6, lit: true, dur: '5.8s' },
    { r: 1, c: 0, op: 0.12, lit: false, dur: '4s' }, { r: 1, c: 1, op: 0.65, lit: true, dur: '3.5s' }, { r: 1, c: 2, op: 0.1, lit: false, dur: '6s' },
    { r: 2, c: 0, op: 0.55, lit: true, dur: '6.1s' }, { r: 2, c: 1, op: 0.7, lit: true, dur: '4.7s' }, { r: 2, c: 2, op: 0.08, lit: false, dur: '5.3s' },
    { r: 3, c: 0, op: 0.1, lit: false, dur: '3.9s' }, { r: 3, c: 1, op: 0.5, lit: true, dur: '6.5s' }, { r: 3, c: 2, op: 0.6, lit: true, dur: '4s' },
  ];

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene1" background="darker" className="scene1-beginning">
        <ParticleField count={20} color="#4338CA" />

        {/* Parallax layer 1 - distant buildings */}
        <div className="college-bg-layer1" style={{ position: 'absolute', bottom: '8%', left: 0, width: '100%', zIndex: 1, opacity: 0.4 }}>
          <svg viewBox="0 0 1200 250" preserveAspectRatio="xMidYMax slice" style={{ width: '100%', height: 'auto', maxHeight: '200px' }}>
            <rect x="30" y="100" width="100" height="150" rx="3" fill="#0F0D2E" />
            <rect x="180" y="60" width="70" height="190" rx="3" fill="#0F0D2E" />
            <rect x="300" y="120" width="130" height="130" rx="3" fill="#0C0A25" />
            <rect x="500" y="80" width="90" height="170" rx="3" fill="#0F0D2E" />
            <rect x="650" y="110" width="110" height="140" rx="3" fill="#0C0A25" />
            <rect x="820" y="70" width="80" height="180" rx="3" fill="#0F0D2E" />
            <rect x="960" y="100" width="120" height="150" rx="3" fill="#0C0A25" />
            <rect x="1120" y="130" width="80" height="120" rx="3" fill="#0F0D2E" />
          </svg>
        </div>

        {/* Parallax layer 2 - foreground buildings with windows */}
        <div className="college-bg-layer2" style={{ position: 'absolute', bottom: '5%', left: 0, width: '100%', zIndex: 2, opacity: 0.85 }}>
          <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMax slice" style={{ width: '100%', height: 'auto', maxHeight: '320px' }}>
            <defs>
              <linearGradient id="bldg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#0F0D2E" />
              </linearGradient>
              <linearGradient id="bldg2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A1845" />
                <stop offset="100%" stopColor="#0D0B28" />
              </linearGradient>
              <linearGradient id="windowLit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>

            {/* Building 1: College block (lit/dark windows mix) */}
            <rect x="50" y="110" width="160" height="210" rx="4" fill="url(#bldg1)" />
            <rect x="50" y="105" width="160" height="8" rx="2" fill="#312E81" opacity="0.5" />
            {bldg1Windows.map((w, i) => (
              <rect key={`w1-${i}`} x={70 + w.c * 45} y={130 + w.r * 42} width="18" height="24" rx="2"
                fill={w.lit ? 'url(#windowLit)' : '#0A0820'} opacity={w.op}>
                {w.lit && <animate attributeName="opacity" values={`${w.op};${w.op * 0.5};${w.op}`} dur={w.dur} repeatCount="indefinite" />}
              </rect>
            ))}

            {/* Building 2: Library (mostly dark) */}
            <rect x="260" y="150" width="120" height="170" rx="4" fill="url(#bldg2)" />
            <rect x="260" y="145" width="120" height="6" rx="3" fill="#312E81" opacity="0.4" />
            {[0, 1, 2].map(r => [0, 1].map(c => (
              <rect key={`w2-${r}-${c}`} x={278 + c * 50} y={168 + r * 44} width="22" height="28" rx="2"
                fill={r === 1 && c === 0 ? 'url(#windowLit)' : '#0A0820'} opacity={r === 1 && c === 0 ? 0.5 : 0.8} />
            )))}

            {/* Trees */}
            <ellipse cx="430" cy="265" rx="28" ry="32" fill="#064E3B" opacity="0.5" />
            <rect x="427" y="290" width="6" height="25" fill="#3B2507" opacity="0.3" />
            <ellipse cx="475" cy="255" rx="22" ry="28" fill="#065F46" opacity="0.4" />
            <rect x="472" y="278" width="5" height="35" fill="#3B2507" opacity="0.25" />

            {/* Building 3: Main block (well lit) */}
            <rect x="520" y="80" width="200" height="240" rx="6" fill="url(#bldg1)" />
            <rect x="520" y="72" width="200" height="12" rx="3" fill="#312E81" opacity="0.5" />
            {/* Clock/emblem on top */}
            <circle cx="620" cy="100" r="12" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.3" />
            <circle cx="620" cy="100" r="2" fill="#6366F1" opacity="0.4" />
            {[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3].map(c => {
              const litPattern = [true, false, true, false, false, true, false, true, true, true, false, false, false, true, true, false, true, false, false, true];
              const idx = r * 4 + c;
              const isLit = litPattern[idx];
              return (
                <rect key={`w3-${r}-${c}`} x={540 + c * 44} y={120 + r * 40} width="20" height="26" rx="2"
                  fill={isLit ? 'url(#windowLit)' : '#0A0820'} opacity={isLit ? 0.45 + (idx % 3) * 0.1 : 0.85}>
                  {isLit && <animate attributeName="opacity" values={`${0.4};${0.7};${0.4}`} dur={`${3.5 + (idx % 4) * 0.7}s`} repeatCount="indefinite" />}
                </rect>
              );
            }))}

            {/* Building 4: Hostel (dark, few lights) */}
            <rect x="780" y="160" width="100" height="160" rx="4" fill="url(#bldg2)" />
            <rect x="780" y="156" width="100" height="5" rx="2" fill="#312E81" opacity="0.3" />
            {[0, 1, 2].map(r => [0, 1].map(c => (
              <rect key={`w4-${r}-${c}`} x={798 + c * 40} y={176 + r * 40} width="16" height="22" rx="2"
                fill={(r === 0 && c === 1) || (r === 2 && c === 0) ? 'url(#windowLit)' : '#0A0820'}
                opacity={(r === 0 && c === 1) || (r === 2 && c === 0) ? 0.4 : 0.85} />
            )))}

            {/* Building 5: distant */}
            <rect x="940" y="130" width="140" height="190" rx="4" fill="url(#bldg1)" opacity="0.7" />

            {/* Ground with subtle gradient */}
            <rect x="0" y="315" width="1200" height="10" rx="2" fill="#0F0D2E" opacity="0.9" />
            <rect x="0" y="310" width="1200" height="8" rx="2" fill="#1E1B4B" opacity="0.25" />

            {/* Street lamps */}
            <g opacity="0.5">
              <rect x="420" y="272" width="3" height="42" fill="#374151" />
              <circle cx="421" cy="270" r="6" fill="#FCD34D" opacity="0.15" />
              <circle cx="421" cy="270" r="3" fill="#FCD34D" opacity="0.3" />
              <rect x="700" y="280" width="3" height="34" fill="#374151" />
              <circle cx="701" cy="278" r="6" fill="#FCD34D" opacity="0.15" />
              <circle cx="701" cy="278" r="3" fill="#FCD34D" opacity="0.3" />
            </g>
          </svg>
        </div>

        {/* Ground glow line */}
        <div style={{ position: 'absolute', bottom: '5%', left: '10%', width: '80%', height: '2px', background: 'linear-gradient(90deg, transparent, #312E8140, transparent)', zIndex: 3 }} />

        {/* Character walking */}
        <motion.div
          className="character-stage college-loop"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}
        >
          <Character size="medium" variant="walking" evolution={0.1} />
        </motion.div>

        {/* Text */}
        <div className="scene-text-overlay" style={{ bottom: '3%' }}>
          <AnimatedText variant="quote" splitWords delay={0.3}>
            Every journey starts somewhere...
          </AnimatedText>
          <motion.p
            style={{ color: '#94A3B8', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', marginTop: '0.75rem', fontWeight: 400, textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Mine started with uncertainty, curiosity, and ambition.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div className="scroll-indicator" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="30" height="50" viewBox="0 0 30 50">
            <rect x="1" y="1" width="28" height="48" rx="14" stroke="#6366F1" strokeWidth="2" fill="none" opacity="0.4" />
            <circle cx="15" cy="12" r="4" fill="#6366F1" opacity="0.6">
              <animate attributeName="cy" values="12;35;12" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
          <span>Scroll to begin</span>
        </motion.div>
      </SceneSection>
    </div>
  );
}
