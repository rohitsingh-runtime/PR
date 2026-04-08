'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneSection from '../ui/SceneSection';
import AnimatedText from '../ui/AnimatedText';
import Character from '../character/Character';

gsap.registerPlugin(ScrollTrigger);

const bugsData = [
  { text: '❌ TypeError: Cannot read undefined', x: '8%', y: '18%' },
  { text: '⚠️ Test Failed: 3/12 cases', x: '62%', y: '12%' },
  { text: '🐛 Bug #247: Layout overflow on mobile', x: '68%', y: '48%' },
  { text: '✅ Test Suite Passed: 9/12', x: '5%', y: '58%' },
  { text: '📋 QA Report — Build v2.1.4', x: '55%', y: '72%' },
  { text: '🔍 DOM inspection: missing aria-label', x: '12%', y: '78%' },
];

const testCases = [
  { name: 'Login Flow', status: 'pass' },
  { name: 'Payment Gateway', status: 'fail' },
  { name: 'User Dashboard', status: 'pass' },
  { name: 'API Response Time', status: 'pass' },
  { name: 'Form Validation', status: 'fail' },
  { name: 'Data Export CSV', status: 'pass' },
  { name: 'Session Timeout', status: 'pass' },
];

export default function Scene4Tester() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.bug-popup', { scale: 0, opacity: 0, rotation: -8 }, { scale: 1, opacity: 1, rotation: 0, stagger: 0.2, duration: 0.5, ease: 'back.out(1.7)', scrollTrigger: { trigger: sceneRef.current, start: 'top 40%', toggleActions: 'play none none reverse' } });
      gsap.fromTo('.test-panel', { x: 80, opacity: 0 }, { x: 0, opacity: 1, scrollTrigger: { trigger: sceneRef.current, start: 'top 50%', end: 'center center', scrub: 1 } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  const codeWidths = [55, 72, 38, 65, 80, 45, 60, 73, 42, 68, 50, 77, 35, 58, 70];
  const codeOps = [0.08, 0.12, 0.06, 0.1, 0.14, 0.07, 0.09, 0.13, 0.06, 0.11, 0.08, 0.12, 0.07, 0.1, 0.09];

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene4" background="dark" className="scene4-tester">
        {/* Code background */}
        <div className="screen-bg">
          <div className="code-lines">
            {codeWidths.map((w, i) => (
              <motion.div key={i} className="code-line" style={{ width: `${w}%`, opacity: codeOps[i] }}
                animate={{ opacity: [codeOps[i] * 0.5, codeOps[i], codeOps[i] * 0.5] }}
                transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }} />
            ))}
          </div>
        </div>

        {/* Bug popups */}
        {bugsData.map((bug, i) => (
          <motion.div key={i} className="bug-popup glass-card" style={{ position: 'absolute', left: bug.x, top: bug.y, zIndex: 5 }}>
            <span style={{ fontSize: '0.78rem', fontFamily: "'JetBrains Mono', 'Courier New', monospace", letterSpacing: '-0.01em' }}>{bug.text}</span>
          </motion.div>
        ))}

        {/* Test panel */}
        <motion.div className="test-panel glass-card" style={{ position: 'absolute', right: '4%', top: '20%', zIndex: 5, width: '240px', padding: '1.5rem' }}>
          <h3 style={{ color: '#A5B4FC', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Test Results — v2.1</h3>
          {testCases.map((tc, i) => (
            <motion.div key={i} className="test-case" initial={{ opacity: 0, x: 15 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.3rem 0', fontSize: '0.8rem', color: '#94A3B8' }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', width: '18px', color: tc.status === 'pass' ? '#10B981' : '#EF4444' }}>
                {tc.status === 'pass' ? '✓' : '✗'}
              </span>
              <span>{tc.name}</span>
            </motion.div>
          ))}
          <div style={{ marginTop: '1rem', padding: '0.5rem 0.75rem', background: '#10B98115', borderRadius: '6px', border: '1px solid #10B98130' }}>
            <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600 }}>5 Passed</span>
            <span style={{ fontSize: '0.7rem', color: '#64748B', margin: '0 0.4rem' }}>·</span>
            <span style={{ fontSize: '0.7rem', color: '#EF4444', fontWeight: 600 }}>2 Failed</span>
          </div>
        </motion.div>

        {/* Character */}
        <motion.div style={{ position: 'absolute', bottom: '16%', left: '32%', zIndex: 10 }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Character size="medium" variant="working" evolution={0.25} />
        </motion.div>

        {/* Text */}
        <div className="scene-text-overlay scene-text-bottom">
          <AnimatedText variant="quote" splitWords>
            I started with testing — understanding systems, finding flaws, improving quality.
          </AnimatedText>
        </div>
      </SceneSection>
    </div>
  );
}
