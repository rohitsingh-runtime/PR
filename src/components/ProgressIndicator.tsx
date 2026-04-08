'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const scenes = [
  { id: 'scene1', label: 'Beginning' },
  { id: 'scene2', label: 'Transition' },
  { id: 'scene3', label: 'New World' },
  { id: 'scene4', label: 'Testing' },
  { id: 'scene5', label: 'Growth' },
  { id: 'scene6', label: 'Leadership' },
  { id: 'scene7', label: 'Team' },
  { id: 'scene8', label: 'Challenges' },
  { id: 'scene9', label: 'Achievements' },
  { id: 'scene10', label: 'Today' },
  { id: 'scene11', label: 'Future' },
  { id: 'scene12', label: 'The End' },
];

export default function ProgressIndicator() {
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // Determine active scene
      const sceneElements = scenes.map((s) => document.getElementById(s.id));
      for (let i = sceneElements.length - 1; i >= 0; i--) {
        const el = sceneElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveScene(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToScene = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="progress-indicator">
      {/* Vertical progress line */}
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Scene dots */}
      <div className="progress-dots">
        {scenes.map((scene, i) => (
          <button
            key={scene.id}
            className={`progress-dot ${i === activeScene ? 'active' : ''} ${
              i < activeScene ? 'passed' : ''
            }`}
            onClick={() => scrollToScene(scene.id)}
            title={scene.label}
          >
            <span className="dot-inner" />
            <span className="dot-label">{scene.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
