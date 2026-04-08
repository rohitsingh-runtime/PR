'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneSection from '../ui/SceneSection';
import AnimatedText from '../ui/AnimatedText';
import Character from '../character/Character';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'QA & Testing', icon: '🧪', color: '#10B981' },
  { name: 'Documentation', icon: '📝', color: '#F59E0B' },
  { name: 'Client Communication', icon: '💬', color: '#6366F1' },
  { name: 'Bug Analysis', icon: '🔍', color: '#EF4444' },
  { name: 'Team Collaboration', icon: '🤝', color: '#8B5CF6' },
  { name: 'Process Optimization', icon: '⚡', color: '#06B6D4' },
];

export default function Scene5Growth() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-orb', { scale: 0, opacity: 0, rotation: -180 }, { scale: 1, opacity: 1, rotation: 0, stagger: 0.18, duration: 0.7, ease: 'back.out(1.7)', scrollTrigger: { trigger: sceneRef.current, start: 'top 40%', toggleActions: 'play none none reverse' } });
      gsap.fromTo('.growth-character-wrap', { scale: 0.7 }, { scale: 1, scrollTrigger: { trigger: sceneRef.current, start: 'top center', end: 'bottom center', scrub: true } });
      gsap.fromTo('.skill-line', { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 0.4, stagger: 0.12, scrollTrigger: { trigger: sceneRef.current, start: 'top 35%', toggleActions: 'play none none reverse' } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene5" background="gradient" className="scene5-growth">
        <div className="growth-glow" />

        <div className="skills-orbit">
          {skills.map((skill, i) => {
            const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 190;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <React.Fragment key={i}>
                <div className="skill-line" style={{ position: 'absolute', left: '50%', top: '50%', width: '2px', height: `${radius}px`, background: `linear-gradient(to bottom, transparent, ${skill.color}30)`, transformOrigin: 'top center', transform: `rotate(${(angle * 180) / Math.PI + 90}deg)` }} />
                <motion.div className="skill-orb glass-card" style={{ position: 'absolute', left: `calc(50% + ${x}px - 50px)`, top: `calc(50% + ${y}px - 32px)`, borderColor: `${skill.color}30`, boxShadow: `0 0 20px ${skill.color}15`, minWidth: '100px' }}
                  whileHover={{ scale: 1.12, boxShadow: `0 0 35px ${skill.color}30`, borderColor: `${skill.color}50` }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.25rem' }}>{skill.icon}</span>
                  <span style={{ color: skill.color, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap', fontFamily: 'var(--font-heading)' }}>{skill.name}</span>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        <motion.div className="growth-character-wrap" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8 }}>
          <Character size="medium" variant="standing" glowing evolution={0.4} />
        </motion.div>

        <div className="scene-text-overlay scene-text-bottom">
          <AnimatedText variant="quote" splitWords>
            Every challenge added a new skill.
          </AnimatedText>
        </div>
      </SceneSection>
    </div>
  );
}
