'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SceneSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'dark' | 'darker' | 'gradient' | 'bright' | 'cinematic';
  minHeight?: string;
}

const bgClasses: Record<string, string> = {
  dark: 'scene-dark',
  darker: 'scene-darker',
  gradient: 'scene-gradient',
  bright: 'scene-bright',
  cinematic: 'scene-cinematic',
};

export default function SceneSection({
  children,
  className = '',
  id,
  background = 'dark',
  minHeight = '100vh',
}: SceneSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`scene-section ${bgClasses[background]} ${className}`}
      style={{ minHeight }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="scene-content">{children}</div>
    </motion.section>
  );
}
