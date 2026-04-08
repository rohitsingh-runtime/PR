'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface AnimatedTextProps {
  children: string;
  className?: string;
  variant?: 'heading' | 'subheading' | 'quote' | 'accent';
  delay?: number;
  splitWords?: boolean;
}

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function AnimatedText({
  children,
  className = '',
  variant = 'heading',
  delay = 0,
  splitWords = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const variantClass = `text-${variant}`;

  if (splitWords) {
    const words = children.split(' ');
    return (
      <motion.div
        ref={ref}
        className={`animated-text ${variantClass} ${className}`}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: delay,
            },
          },
        }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', justifyContent: 'center' }}
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block' }}>
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`animated-text ${variantClass} ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={headingVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
