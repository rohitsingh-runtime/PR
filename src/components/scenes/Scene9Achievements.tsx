'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneSection from '../ui/SceneSection';
import AnimatedText from '../ui/AnimatedText';
import ParticleField from '../ui/ParticleField';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: 'USP', color: '#6366F1', desc: 'End-to-end delivery & ownership' },
  { name: 'Attitude Living', color: '#10B981', desc: 'E-commerce platform management' },
  { name: 'Mitra', color: '#F59E0B', desc: 'Admin & mobile system delivery' },
  { name: 'Gresham Global', color: '#8B5CF6', desc: 'International client coordination' },
  { name: 'Amplify', color: '#06B6D4', desc: 'High-pressure rapid execution' },
];

export default function Scene9Achievements() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', { y: 80, opacity: 0, rotateY: -20, scale: 0.85 }, { y: 0, opacity: 1, rotateY: 0, scale: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: sceneRef.current, start: 'top 45%', toggleActions: 'play none none reverse' } });
      gsap.fromTo('.bright-overlay', { opacity: 0 }, { opacity: 1, scrollTrigger: { trigger: sceneRef.current, start: 'top 60%', end: 'top 30%', scrub: true } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene9" background="dark" className="scene9-achievements">
        <div className="bright-overlay" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 60%)', zIndex: 1, pointerEvents: 'none' }} />
        <ParticleField count={30} color="#818CF8" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', maxWidth: '950px', width: '90%', zIndex: 5, position: 'relative', marginBottom: '5rem' }}>
          {projects.map((project, i) => (
            <motion.div key={i} className="project-card glass-card" style={{ position: 'relative', padding: '1.75rem', overflow: 'hidden', cursor: 'default', borderColor: `${project.color}25` }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 35px ${project.color}25`, borderColor: `${project.color}50` }}
              transition={{ type: 'spring', stiffness: 300 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', background: `linear-gradient(135deg, ${project.color}12, transparent)` }} />
              {/* Status indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: project.color, boxShadow: `0 0 10px ${project.color}` }} />
                <span style={{ fontSize: '0.6rem', color: '#64748B', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Delivered</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: project.color, marginBottom: '0.4rem' }}>{project.name}</h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.4 }}>{project.desc}</p>
              <div style={{ width: '40px', height: '2px', borderRadius: '2px', background: project.color, opacity: 0.3, marginTop: '1rem' }} />
            </motion.div>
          ))}
        </div>

        <div className="scene-text-overlay scene-text-bottom">
          <AnimatedText variant="quote" splitWords>
            Delivered. Learned. Repeated.
          </AnimatedText>
        </div>
      </SceneSection>
    </div>
  );
}
