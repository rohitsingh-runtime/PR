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

const teamMembers = [
  { name: 'Aditya', color: '#10B981', role: 'Mentor' },
  { name: 'Kiran', color: '#F59E0B', role: 'Guide' },
  { name: 'Team', color: '#8B5CF6', role: 'Support' },
  { name: 'Team', color: '#06B6D4', role: 'Strength' },
];

export default function Scene7Team() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-member', { y: 30, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, stagger: 0.18, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: sceneRef.current, start: 'top 45%', toggleActions: 'play none none reverse' } });
      gsap.fromTo('.supported-character', { x: -20 }, { x: 20, scrollTrigger: { trigger: sceneRef.current, start: 'top center', end: 'bottom center', scrub: true } });
      gsap.fromTo('.energy-line', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.5, stagger: 0.08, scrollTrigger: { trigger: sceneRef.current, start: 'top 40%', toggleActions: 'play none none reverse' } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene7" background="gradient" className="scene7-team">
        {/* Energy lines */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="energy-line" style={{ position: 'absolute', left: '22%', top: `${38 + i * 5}%`, width: '28%', height: '2px', background: 'linear-gradient(90deg, #6366F120, #6366F180, #6366F120)', transformOrigin: 'left center', opacity: 0 }} />
          ))}
        </div>

        {/* Team */}
        <div style={{ position: 'absolute', left: '18%', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '1.2rem', alignItems: 'flex-end', zIndex: 5 }}>
          {teamMembers.map((member, i) => (
            <motion.div key={i} className="team-member" style={{ position: 'relative', zIndex: teamMembers.length - i, textAlign: 'center' }}>
              <Silhouette name={member.name} color={member.color} size={i < 2 ? 'medium' : 'small'} />
            </motion.div>
          ))}
        </div>

        {/* Main character */}
        <motion.div className="supported-character" style={{ position: 'absolute', right: '22%', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          <Character size="large" variant="standing" glowing evolution={0.6} />
        </motion.div>

        <div className="scene-text-overlay scene-text-bottom">
          <AnimatedText variant="quote" splitWords>
            Guided by mentors. Supported by team.
          </AnimatedText>
        </div>
      </SceneSection>
    </div>
  );
}
