'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneSection from '../ui/SceneSection';
import AnimatedText from '../ui/AnimatedText';
import Character from '../character/Character';
import Silhouette from '../character/Silhouette';

gsap.registerPlugin(ScrollTrigger);

export default function Scene10Current() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.current-character', { scale: 0.6, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sceneRef.current, start: 'top 50%', toggleActions: 'play none none reverse' } });
      gsap.fromTo('.current-team', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.12, duration: 0.7, scrollTrigger: { trigger: sceneRef.current, start: 'top 40%', toggleActions: 'play none none reverse' } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene10" background="gradient" className="scene10-current">
        <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', zIndex: 1 }} />

        {/* Team behind */}
        <div style={{ position: 'absolute', left: '50%', top: '25%', transform: 'translateX(-50%)', display: 'flex', gap: '2.5rem', zIndex: 3 }}>
          {['Developer', 'Designer', 'QA Lead'].map((name, i) => (
            <motion.div key={i} className="current-team"><Silhouette name={name} color="#A5B4FC" size="small" /></motion.div>
          ))}
        </div>

        {/* Character */}
        <motion.div className="current-character" style={{ position: 'absolute', left: '50%', top: '38%', transform: 'translateX(-50%)', zIndex: 5 }}>
          <Character size="hero" variant="confident" glowing evolution={0.85} />
        </motion.div>

        {/* Role badges */}
        <motion.div style={{ position: 'absolute', bottom: '18%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', zIndex: 10 }}
          initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }} transition={{ delay: 0.7 }}>
          {['Lead', 'Decide', 'Deliver'].map((role, i) => (
            <motion.span key={i} className="glass-card" style={{ padding: '0.65rem 1.8rem', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: '#A5B4FC', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'default' }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 25px #6366F130' }}>
              {role}
            </motion.span>
          ))}
        </motion.div>

        <div className="scene-text-overlay scene-text-bottom">
          <AnimatedText variant="heading" splitWords>
            Today, I lead teams, manage clients, and drive delivery.
          </AnimatedText>
        </div>
      </SceneSection>
    </div>
  );
}
