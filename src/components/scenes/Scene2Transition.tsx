'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneSection from '../ui/SceneSection';
import AnimatedText from '../ui/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

export default function Scene2Transition() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sceneRef, { amount: 0.3 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.transition-blur', { scaleX: 1, opacity: 0 }, { scaleX: 20, opacity: 0.5, scrollTrigger: { trigger: sceneRef.current, start: 'top center', end: 'center center', scrub: 1 } });
      gsap.fromTo('.map-path-line', { strokeDashoffset: 500 }, { strokeDashoffset: 0, scrollTrigger: { trigger: sceneRef.current, start: 'top 60%', end: 'bottom 60%', scrub: true } });
      gsap.fromTo('.airplane-icon', { motionPath: { path: '.flight-path', align: '.flight-path', alignOrigin: [0.5, 0.5] } }, { motionPath: { path: '.flight-path', align: '.flight-path', alignOrigin: [0.5, 0.5], end: 1 }, scrollTrigger: { trigger: sceneRef.current, start: 'top 60%', end: 'bottom 60%', scrub: true } });
      gsap.fromTo('.city-kolkata', { opacity: 1, scale: 1 }, { opacity: 0.25, scale: 0.85, scrollTrigger: { trigger: sceneRef.current, start: 'top 40%', end: 'center center', scrub: true } });
      gsap.fromTo('.city-mumbai', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, scrollTrigger: { trigger: sceneRef.current, start: '30% center', end: '70% center', scrub: true } });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef}>
      <SceneSection id="scene2" background="cinematic" className="scene2-transition">
        {/* Speed blur streaks */}
        <div className="speed-lines">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div key={i} className="transition-blur" style={{
              position: 'absolute', left: '0%', top: `${10 + i * 8}%`, width: '100%', height: '1.5px',
              background: `linear-gradient(90deg, transparent, ${i % 3 === 0 ? '#6366F1' : i % 3 === 1 ? '#818CF8' : '#A5B4FC'}60, transparent)`,
              transformOrigin: 'center', opacity: 0,
            }} />
          ))}
        </div>

        {/* Map */}
        <motion.div className="map-container" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 5, width: '85%', maxWidth: '650px' }}>
          <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto' }}>
            <defs>
              <linearGradient id="pathGrad2" x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#6366F1" /></linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" /><stop offset="100%" stopColor="transparent" /></radialGradient>
            </defs>

            {/* Subtle India outline */}
            <path d="M220 30 Q270 20 310 45 Q355 35 385 65 Q410 100 425 135 Q445 170 435 210 Q425 245 385 275 Q345 295 305 285 Q265 295 235 275 Q205 255 195 215 Q185 175 195 135 Q200 75 220 30Z"
              fill="#1E1B4B" opacity="0.2" stroke="#312E81" strokeWidth="0.8" />

            {/* Kolkata (RIGHT side - East India) */}
            <g className="city-kolkata">
              <circle cx="380" cy="155" r="30" fill="url(#cityGlow)" />
              <circle cx="380" cy="155" r="8" fill="#F59E0B" filter="url(#glow)">
                <animate attributeName="r" values="6;9;6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="380" cy="155" r="18" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <text x="380" y="130" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="700" fontFamily="var(--font-heading)">KOLKATA</text>
              <text x="380" y="142" textAnchor="middle" fill="#F59E0B" fontSize="8" fontWeight="400" opacity="0.6">Home</text>
            </g>

            {/* Mumbai (LEFT side - West India) */}
            <g className="city-mumbai">
              <circle cx="220" cy="195" r="30" fill="url(#cityGlow)" />
              <circle cx="220" cy="195" r="8" fill="#6366F1" filter="url(#glow)">
                <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="220" cy="195" r="18" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="14;24;14" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <text x="220" y="228" textAnchor="middle" fill="#6366F1" fontSize="13" fontWeight="700" fontFamily="var(--font-heading)">MUMBAI</text>
              <text x="220" y="240" textAnchor="middle" fill="#6366F1" fontSize="8" fontWeight="400" opacity="0.6">New Beginning</text>
            </g>

            {/* Flight path: Kolkata → Mumbai (right to left, east to west) */}
            <path className="flight-path" d="M380 155 Q340 120 300 140 Q260 160 240 185 Q230 190 220 195" fill="none" stroke="transparent" />
            <path className="map-path-line" d="M380 155 Q340 120 300 140 Q260 160 240 185 Q230 190 220 195"
              fill="none" stroke="url(#pathGrad2)" strokeWidth="2.5" strokeDasharray="500" strokeDashoffset="500" strokeLinecap="round" filter="url(#glow)" />

            {/* Airplane */}
            <g className="airplane-icon" filter="url(#glow)">
              <text fontSize="22" textAnchor="middle" dominantBaseline="central" style={{ filter: 'drop-shadow(0 0 4px rgba(99,102,241,0.5))' }}>✈️</text>
            </g>

            {/* Distance indicator */}
            <text x="300" y="300" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="400" opacity="0.5" fontFamily="var(--font-body)">~1,800 km</text>
          </svg>
        </motion.div>

        {/* Text */}
        <div className="scene-text-overlay scene-text-bottom">
          <AnimatedText variant="quote" splitWords delay={0.2}>
            Leaving comfort behind, I moved from Kolkata to Mumbai — chasing growth.
          </AnimatedText>
        </div>
      </SceneSection>
    </div>
  );
}
