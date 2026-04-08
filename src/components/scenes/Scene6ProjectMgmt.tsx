'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneSection from '../ui/SceneSection';
import AnimatedText from '../ui/AnimatedText';
import Character from '../character/Character';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { title: 'Client Calls', icon: '📞', items: ['Requirements Gathering', 'Sprint Demo', 'Feedback Sessions'] },
  { title: 'Dev Team', icon: '💻', items: ['Sprint Planning', 'Code Reviews', 'Release Coordination'] },
  { title: 'Timelines', icon: '📅', items: ['Milestone Tracking', 'Deadline Management', 'Risk Assessment'] },
];

export default function Scene6ProjectMgmt() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.mgmt-panel', { y: 60, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: sceneRef.current, start: 'top 45%', toggleActions: 'play none none reverse' } });
      gsap.fromTo('.connect-line', { scaleX: 0 }, { scaleX: 1, stagger: 0.25, duration: 0.5, scrollTrigger: { trigger: sceneRef.current, start: 'top 35%', toggleActions: 'play none none reverse' } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene6" background="darker" className="scene6-pm">
        {/* Flow lines bg */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 800 400" style={{ width: '80%', maxWidth: '800px', opacity: 0.4 }} preserveAspectRatio="xMidYMid meet">
            <path className="connect-line" d="M100 200 Q250 140 400 200 Q550 260 700 200" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.2" strokeDasharray="8 4">
              <animate attributeName="stroke-dashoffset" values="0;-24" dur="2s" repeatCount="indefinite" />
            </path>
            <path className="connect-line" d="M100 250 Q250 190 400 250 Q550 310 700 250" fill="none" stroke="#818CF8" strokeWidth="1" opacity="0.15" strokeDasharray="8 4">
              <animate attributeName="stroke-dashoffset" values="0;-24" dur="3s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        {/* Character */}
        <motion.div style={{ position: 'absolute', left: '50%', bottom: '22%', transform: 'translateX(-50%)', zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <Character size="large" variant="confident" glowing evolution={0.55} />
        </motion.div>

        {/* Panels */}
        <div style={{ display: 'flex', gap: '1.5rem', position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)', zIndex: 5, flexWrap: 'wrap', justifyContent: 'center' }}>
          {panels.map((panel, i) => (
            <motion.div key={i} className="mgmt-panel glass-card" style={{ width: '210px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{panel.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 600, color: '#A5B4FC' }}>{panel.title}</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {panel.items.map((item, j) => (
                  <motion.li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#94A3B8' }}
                    initial={{ opacity: 0, x: -8 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }} transition={{ delay: 0.7 + i * 0.2 + j * 0.08 }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#6366F1', flexShrink: 0 }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="scene-text-overlay scene-text-bottom">
          <AnimatedText variant="quote" splitWords>
            I transitioned from execution to ownership — managing people, timelines, and outcomes.
          </AnimatedText>
        </div>
      </SceneSection>
    </div>
  );
}
