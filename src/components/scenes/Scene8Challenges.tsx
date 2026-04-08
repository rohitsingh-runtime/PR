'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneSection from '../ui/SceneSection';
import AnimatedText from '../ui/AnimatedText';
import Character from '../character/Character';

gsap.registerPlugin(ScrollTrigger);

const pressureItems = [
  { text: 'DEADLINE MISSED', color: '#EF4444' },
  { text: 'BUILD FAILED', color: '#F97316' },
  { text: 'CLIENT ESCALATION', color: '#EF4444' },
  { text: 'SCOPE CREEP', color: '#F59E0B' },
  { text: 'SERVER DOWN', color: '#EF4444' },
];

const positions = [
  { left: '16%', top: '16%', rotate: 3 },
  { left: '58%', top: '20%', rotate: -2 },
  { left: '74%', top: '46%', rotate: 4 },
  { left: '28%', top: '52%', rotate: -3 },
  { left: '62%', top: '62%', rotate: 2 },
];

export default function Scene8Challenges() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.shake-container', { x: 'random(-4, 4)', y: 'random(-2, 2)', duration: 0.1, repeat: 18, yoyo: true, scrollTrigger: { trigger: sceneRef.current, start: 'top 40%', toggleActions: 'play none none none' } });
      gsap.fromTo('.error-flash', { opacity: 0 }, { opacity: 0.12, duration: 0.08, repeat: 5, yoyo: true, scrollTrigger: { trigger: sceneRef.current, start: 'top 40%', toggleActions: 'play none none none' } });
      gsap.fromTo('.resolution-text', { opacity: 0, y: 25 }, { opacity: 1, y: 0, scrollTrigger: { trigger: sceneRef.current, start: 'center center', end: 'bottom center', scrub: 1 } });
      gsap.fromTo('.challenge-overlay', { opacity: 0.5 }, { opacity: 0.08, scrollTrigger: { trigger: sceneRef.current, start: 'center center', end: 'bottom center', scrub: true } });
      gsap.fromTo('.red-vignette', { opacity: 0.3 }, { opacity: 0, scrollTrigger: { trigger: sceneRef.current, start: 'center center', end: 'bottom center', scrub: true } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene8" background="darker" className="scene8-challenges">
        {/* Red/dark vignette */}
        <div className="red-vignette" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, #EF444415 70%, #EF444425 100%)', zIndex: 1, pointerEvents: 'none' }} />
        <div className="challenge-overlay" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)', zIndex: 1, pointerEvents: 'none' }} />

        <div className="error-flash" style={{ position: 'absolute', inset: 0, background: '#EF4444', opacity: 0, zIndex: 2, pointerEvents: 'none' }} />

        <div className="shake-container" style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            {pressureItems.map((item, i) => (
              <motion.div key={i} style={{
                position: 'absolute', left: positions[i].left, top: positions[i].top,
                background: `${item.color}12`, border: `1px solid ${item.color}35`, backdropFilter: 'blur(8px)',
                padding: '0.5rem 1.2rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700,
                color: item.color, letterSpacing: '0.12em', fontFamily: "'JetBrains Mono', monospace",
              }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: [0, 1, 0.7], scale: [0, 1.08, 1], rotate: [0, positions[i].rotate, 0] } : { opacity: 0 }}
                transition={{ delay: 0.3 + i * 0.18, duration: 0.45 }}>
                {item.text}
              </motion.div>
            ))}
          </div>

          <motion.div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8 }}>
            <Character size="medium" variant="standing" evolution={0.5} />
          </motion.div>
        </div>

        <div className="scene-text-overlay">
          <AnimatedText variant="quote" splitWords>
            Deadlines. Pressure. Uncertainty.
          </AnimatedText>
        </div>

        <div className="resolution-text scene-text-overlay scene-text-lower">
          <AnimatedText variant="accent" splitWords delay={0.5}>
            But every challenge made me stronger.
          </AnimatedText>
        </div>
      </SceneSection>
    </div>
  );
}
