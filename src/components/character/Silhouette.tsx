'use client';

import React from 'react';

interface SilhouetteProps {
  name?: string;
  className?: string;
  color?: string;
  size?: 'small' | 'medium';
}

export default function Silhouette({
  name,
  className = '',
  color = '#6366F1',
  size = 'medium',
}: SilhouetteProps) {
  const dims = size === 'small' ? { w: 55, h: 110 } : { w: 75, h: 150 };

  return (
    <div className={`silhouette-wrapper ${className}`} style={{ textAlign: 'center' }}>
      <svg
        viewBox="0 0 80 160"
        width={dims.w}
        height={dims.h}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`sil-grad-${name}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Head */}
        <ellipse cx="40" cy="22" rx="12" ry="14" fill={`url(#sil-grad-${name})`} />

        {/* Shoulders & Torso */}
        <path
          d="M18 45 Q22 38 40 40 Q58 38 62 45 L60 95 Q58 100 40 100 Q22 100 20 95 Z"
          fill={`url(#sil-grad-${name})`}
        />

        {/* Arms */}
        <path d="M18 48 Q10 65 15 85" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M62 48 Q70 65 65 85" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" />

        {/* Legs */}
        <path d="M28 97 L26 138 Q26 142 30 142 L38 142 Q40 142 40 138 L40 105" fill={color} opacity="0.3" />
        <path d="M40 105 L40 138 Q40 142 42 142 L50 142 Q54 142 54 138 L52 97" fill={color} opacity="0.3" />

        {/* Shoes */}
        <rect x="24" y="140" width="18" height="5" rx="2.5" fill={color} opacity="0.35" />
        <rect x="38" y="140" width="18" height="5" rx="2.5" fill={color} opacity="0.35" />

        {/* Ambient glow */}
        <ellipse cx="40" cy="80" rx="25" ry="50" fill={color} opacity="0.04">
          <animate attributeName="rx" values="22;30;22" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.04;0.08;0.04" dur="4s" repeatCount="indefinite" />
        </ellipse>
      </svg>
      {name && (
        <p
          style={{
            color: color,
            fontSize: '0.8rem',
            marginTop: '0.5rem',
            fontWeight: 600,
            opacity: 0.85,
            letterSpacing: '0.06em',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {name}
        </p>
      )}
    </div>
  );
}
