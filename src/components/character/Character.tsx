'use client';

import React from 'react';

interface CharacterProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  variant?: 'walking' | 'standing' | 'confident' | 'looking' | 'working';
  className?: string;
  glowing?: boolean;
  evolution?: number; // 0-1, controls visual maturity
}

const sizeMap = {
  small: { width: 70, height: 140 },
  medium: { width: 100, height: 200 },
  large: { width: 130, height: 260 },
  hero: { width: 170, height: 340 },
};

export default function Character({
  size = 'medium',
  variant = 'standing',
  className = '',
  glowing = false,
  evolution = 0.5,
}: CharacterProps) {
  const { width, height } = sizeMap[size];

  const getAnimation = () => {
    switch (variant) {
      case 'walking': return 'character-walk';
      case 'working': return 'character-work';
      case 'confident': return 'character-float';
      case 'looking': return 'character-look';
      default: return '';
    }
  };

  // Evolution-driven properties
  const shoulderWidth = 34 + evolution * 10; // broader shoulders as evolves
  const bodyBuild = evolution; // 0 = slim/uncertain, 1 = strong/confident
  const posture = evolution; // affects stance

  // Color palette evolves: early = softer, later = deeper/more authoritative
  const shirtColor = evolution < 0.3 ? '#7C8CF5' : evolution < 0.7 ? '#5B6AE8' : '#4338CA';
  const shirtHighlight = evolution < 0.3 ? '#A5B4FC' : evolution < 0.7 ? '#818CF8' : '#6366F1';
  const pantsColor = evolution < 0.5 ? '#2D2B55' : '#1E1B4B';
  const skinTone = '#D4A574';
  const skinShadow = '#B8895C';
  const hairColor = '#1A1A2E';

  return (
    <div
      className={`character-container ${getAnimation()} ${className}`}
      style={{ width, height, position: 'relative' }}
    >
      {glowing && (
        <div
          className="character-glow"
          style={{
            position: 'absolute',
            inset: -30,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${shirtHighlight}30 0%, transparent 70%)`,
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        />
      )}
      <svg
        viewBox="0 0 140 280"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Shirt gradient */}
          <linearGradient id={`shirt-grad-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={shirtHighlight} />
            <stop offset="100%" stopColor={shirtColor} />
          </linearGradient>
          {/* Skin gradient */}
          <linearGradient id={`skin-grad-${size}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skinTone} />
            <stop offset="100%" stopColor={skinShadow} />
          </linearGradient>
          {/* Shadow filter */}
          <filter id={`shadow-${size}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
          </filter>
          {/* Hair shine */}
          <radialGradient id={`hair-shine-${size}`} cx="0.4" cy="0.3" r="0.5">
            <stop offset="0%" stopColor="#2D2D52" />
            <stop offset="100%" stopColor={hairColor} />
          </radialGradient>
        </defs>

        <g filter={`url(#shadow-${size})`}>
          {/* ========== HAIR (back) ========== */}
          <path
            d={`M${70 - shoulderWidth * 0.45} 42 Q${70 - shoulderWidth * 0.35} 12 70 14 Q${70 + shoulderWidth * 0.35} 12 ${70 + shoulderWidth * 0.45} 42 Q${70 + shoulderWidth * 0.4} 20 70 16 Q${70 - shoulderWidth * 0.4} 20 ${70 - shoulderWidth * 0.45} 42Z`}
            fill={`url(#hair-shine-${size})`}
          />

          {/* ========== HEAD ========== */}
          <ellipse cx="70" cy="40" rx="20" ry="22" fill={`url(#skin-grad-${size})`} />

          {/* Jaw definition (more defined with evolution) */}
          {evolution > 0.3 && (
            <path
              d={`M52 45 Q55 ${62 + bodyBuild * 2} 70 ${65 + bodyBuild * 2} Q85 ${62 + bodyBuild * 2} 88 45`}
              fill={skinShadow}
              opacity="0.3"
            />
          )}

          {/* Hair */}
          <path
            d={`M50 35 Q48 15 70 12 Q92 15 90 35 Q90 22 82 17 Q70 8 58 17 Q50 22 50 35Z`}
            fill={`url(#hair-shine-${size})`}
          />
          {/* Hair side details */}
          <path d="M50 35 Q48 40 49 45" stroke={hairColor} strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M90 35 Q92 40 91 45" stroke={hairColor} strokeWidth="2" fill="none" opacity="0.5" />

          {/* ========== FACE ========== */}
          {/* Eyebrows (more defined with evolution) */}
          <path
            d={`M57 31 Q61 ${29 - posture * 2} 65 31`}
            stroke={hairColor}
            strokeWidth={1.5 + evolution * 0.5}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M75 31 Q79 ${29 - posture * 2} 83 31`}
            stroke={hairColor}
            strokeWidth={1.5 + evolution * 0.5}
            fill="none"
            strokeLinecap="round"
          />

          {/* Eyes */}
          <ellipse cx="61" cy="37" rx="3.5" ry="3" fill="white" />
          <ellipse cx="79" cy="37" rx="3.5" ry="3" fill="white" />
          <ellipse cx="61" cy="37.5" rx="2" ry="2" fill="#1A1A2E">
            <animate attributeName="ry" values="2;0.3;2" dur="5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="79" cy="37.5" rx="2" ry="2" fill="#1A1A2E">
            <animate attributeName="ry" values="2;0.3;2" dur="5s" repeatCount="indefinite" />
          </ellipse>
          {/* Eye shine */}
          <circle cx="62" cy="36.5" r="0.8" fill="white" opacity="0.9" />
          <circle cx="80" cy="36.5" r="0.8" fill="white" opacity="0.9" />

          {/* Nose */}
          <path d="M68 40 Q70 46 72 40" fill="none" stroke={skinShadow} strokeWidth="1" opacity="0.4" />

          {/* Mouth - expression varies with evolution */}
          {evolution < 0.3 ? (
            // Uncertain / neutral
            <path d="M64 49 Q70 50 76 49" fill="none" stroke={skinShadow} strokeWidth="1.2" strokeLinecap="round" />
          ) : evolution < 0.7 ? (
            // Slight confident smile
            <path d="M63 49 Q70 53 77 49" fill="none" stroke={skinShadow} strokeWidth="1.2" strokeLinecap="round" />
          ) : (
            // Confident determined look
            <path d="M62 48 Q70 54 78 48" fill="none" stroke="#A0705A" strokeWidth="1.5" strokeLinecap="round" />
          )}

          {/* ========== NECK ========== */}
          <rect
            x={70 - 5 - bodyBuild * 1}
            y="58"
            width={10 + bodyBuild * 2}
            height="10"
            fill={`url(#skin-grad-${size})`}
            rx="2"
          />

          {/* ========== BODY / TORSO ========== */}
          <path
            d={`M${70 - shoulderWidth} 72
              Q${70 - shoulderWidth + 3} 66 ${70 - 8} 65
              L${70 + 8} 65
              Q${70 + shoulderWidth - 3} 66 ${70 + shoulderWidth} 72
              L${70 + shoulderWidth - 2} ${145 + bodyBuild * 5}
              Q70 ${150 + bodyBuild * 5} ${70 - shoulderWidth + 2} ${145 + bodyBuild * 5}
              Z`}
            fill={`url(#shirt-grad-${size})`}
          />

          {/* Shirt collar */}
          <path
            d={`M62 65 L70 76 L78 65`}
            fill="none"
            stroke={shirtColor}
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Collar/neck shadow */}
          <path
            d={`M60 68 Q70 72 80 68`}
            fill="none"
            stroke={shirtColor}
            strokeWidth="1"
            opacity="0.4"
          />

          {/* Chest line (subtle body definition) */}
          {bodyBuild > 0.4 && (
            <path
              d={`M70 80 L70 ${110 + bodyBuild * 10}`}
              stroke={shirtColor}
              strokeWidth="1"
              opacity="0.15"
            />
          )}

          {/* Shirt pocket (professional) */}
          <rect x="76" y="85" width="12" height="14" rx="2" fill={shirtColor} opacity="0.5" />
          <rect x="78" y="87" width="8" height="2" rx="1" fill={shirtHighlight} opacity="0.3" />

          {/* ========== ARMS ========== */}
          {variant === 'walking' ? (
            <>
              <path
                d={`M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 12} 100 ${70 - shoulderWidth - 5} 125`}
                stroke={skinTone} strokeWidth={8 + bodyBuild * 2} fill="none" strokeLinecap="round"
              >
                <animate attributeName="d"
                  values={`M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 12} 100 ${70 - shoulderWidth - 5} 125;M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 8} 95 ${70 - shoulderWidth + 2} 110;M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 12} 100 ${70 - shoulderWidth - 5} 125`}
                  dur="0.8s" repeatCount="indefinite"
                />
              </path>
              <path
                d={`M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 8} 95 ${70 + shoulderWidth - 2} 110`}
                stroke={skinTone} strokeWidth={8 + bodyBuild * 2} fill="none" strokeLinecap="round"
              >
                <animate attributeName="d"
                  values={`M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 8} 95 ${70 + shoulderWidth - 2} 110;M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 12} 100 ${70 + shoulderWidth + 5} 125;M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 8} 95 ${70 + shoulderWidth - 2} 110`}
                  dur="0.8s" repeatCount="indefinite"
                />
              </path>
            </>
          ) : variant === 'working' ? (
            <>
              <path d={`M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 15} 90 ${70 - shoulderWidth + 5} 108`}
                stroke={skinTone} strokeWidth={8 + bodyBuild * 2} fill="none" strokeLinecap="round">
                <animate attributeName="d"
                  values={`M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 15} 90 ${70 - shoulderWidth + 5} 108;M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 12} 88 ${70 - shoulderWidth + 8} 104;M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 15} 90 ${70 - shoulderWidth + 5} 108`}
                  dur="1.5s" repeatCount="indefinite" />
              </path>
              <path d={`M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 15} 90 ${70 + shoulderWidth - 5} 108`}
                stroke={skinTone} strokeWidth={8 + bodyBuild * 2} fill="none" strokeLinecap="round">
                <animate attributeName="d"
                  values={`M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 15} 90 ${70 + shoulderWidth - 5} 108;M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 12} 88 ${70 + shoulderWidth - 8} 104;M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 15} 90 ${70 + shoulderWidth - 5} 108`}
                  dur="1.5s" repeatCount="indefinite" />
              </path>
            </>
          ) : variant === 'confident' ? (
            <>
              {/* Arms crossed / at sides confidently */}
              <path d={`M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 10} 95 ${70 - shoulderWidth - 4} 118`}
                stroke={skinTone} strokeWidth={8 + bodyBuild * 2} fill="none" strokeLinecap="round" />
              <path d={`M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 10} 95 ${70 + shoulderWidth + 4} 118`}
                stroke={skinTone} strokeWidth={8 + bodyBuild * 2} fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d={`M${70 - shoulderWidth} 74 Q${70 - shoulderWidth - 10} 98 ${70 - shoulderWidth - 3} 122`}
                stroke={skinTone} strokeWidth={8 + bodyBuild * 2} fill="none" strokeLinecap="round" />
              <path d={`M${70 + shoulderWidth} 74 Q${70 + shoulderWidth + 10} 98 ${70 + shoulderWidth + 3} 122`}
                stroke={skinTone} strokeWidth={8 + bodyBuild * 2} fill="none" strokeLinecap="round" />
            </>
          )}

          {/* Hands */}
          <circle cx={variant === 'walking' ? 70 - shoulderWidth - 5 : 70 - shoulderWidth - 3} cy={variant === 'walking' ? 125 : 122} r={4 + bodyBuild} fill={skinTone} />
          <circle cx={variant === 'walking' ? 70 + shoulderWidth - 2 : 70 + shoulderWidth + 3} cy={variant === 'working' ? 108 : 122} r={4 + bodyBuild} fill={skinTone} />

          {/* ========== BELT ========== */}
          <rect x={70 - shoulderWidth + 3} y={145 + bodyBuild * 5} width={shoulderWidth * 2 - 6} height="5" rx="2" fill="#1A1A2E" opacity="0.7" />
          <rect x="67" y={145 + bodyBuild * 5} width="6" height="5" rx="1" fill="#4B5563" opacity="0.8" />

          {/* ========== PANTS ========== */}
          <path
            d={`M${70 - shoulderWidth + 3} ${150 + bodyBuild * 5}
              L${70 - shoulderWidth + 1} 230
              Q${70 - shoulderWidth + 1} 235 ${70 - shoulderWidth + 8} 235
              L${70 - 3} 235
              Q${70 + 2} 235 ${70 + 2} 230
              L70 ${165 + bodyBuild * 5}
              L${70 - 2} 230
              Q${70 - 2} 235 ${70 + 3} 235
              L${70 + shoulderWidth - 8} 235
              Q${70 + shoulderWidth - 1} 235 ${70 + shoulderWidth - 1} 230
              L${70 + shoulderWidth - 3} ${150 + bodyBuild * 5}
              Z`}
            fill={pantsColor}
          />
          {/* Pants crease */}
          <line x1="55" y1={170 + bodyBuild * 5} x2="55" y2="228" stroke="#151336" strokeWidth="0.8" opacity="0.3" />
          <line x1="85" y1={170 + bodyBuild * 5} x2="85" y2="228" stroke="#151336" strokeWidth="0.8" opacity="0.3" />

          {/* Walking leg animation */}
          {variant === 'walking' && (
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="0.8s" repeatCount="indefinite" />
            </g>
          )}

          {/* ========== SHOES ========== */}
          <path d={`M${70 - shoulderWidth + 1} 232 Q${70 - shoulderWidth - 4} 242 ${70 - shoulderWidth + 6} 243 L${70 + 2} 243 Q${70 + 5} 243 ${70 + 2} 235`}
            fill="#1F2937" />
          <path d={`M${70 + shoulderWidth - 1} 232 Q${70 + shoulderWidth + 4} 242 ${70 + shoulderWidth - 6} 243 L${70 - 2} 243 Q${70 - 5} 243 ${70 - 2} 235`}
            fill="#1F2937" />
          {/* Shoe soles */}
          <rect x={70 - shoulderWidth - 2} y="241" width={shoulderWidth - 2} height="3" rx="1.5" fill="#111827" opacity="0.6" />
          <rect x={70 - 2} y="241" width={shoulderWidth - 2} height="3" rx="1.5" fill="#111827" opacity="0.6" />

          {/* ========== BACKPACK (walking only) ========== */}
          {variant === 'walking' && (
            <g>
              <rect x={70 - shoulderWidth - 2} y="72" width="14" height="40" rx="5" fill="#6D28D9" opacity="0.85" />
              <rect x={70 - shoulderWidth} y="78" width="10" height="6" rx="1.5" fill="#7C3AED" opacity="0.7" />
              <path d={`M${70 - shoulderWidth + 5} 70 Q${70 - shoulderWidth + 5} 64 ${70 - shoulderWidth + 12} 64`}
                stroke="#7C3AED" strokeWidth="2" fill="none" />
              <rect x={70 - shoulderWidth + 1} y="92" width="8" height="8" rx="2" fill="#5B21B6" opacity="0.5" />
            </g>
          )}

          {/* ========== ID BADGE (confident only) ========== */}
          {(variant === 'confident' || variant === 'standing') && evolution > 0.4 && (
            <g>
              {/* Lanyard */}
              <path d={`M65 65 Q62 75 60 90`} stroke="#A5B4FC" strokeWidth="1" fill="none" opacity="0.6" />
              {/* Badge */}
              <rect x="52" y="90" width="18" height="24" rx="3" fill="white" opacity="0.9" />
              <rect x="55" y="94" width="12" height="3" rx="1" fill={shirtColor} />
              <rect x="55" y="100" width="10" height="2" rx="0.5" fill="#CBD5E1" />
              <rect x="55" y="104" width="8" height="2" rx="0.5" fill="#CBD5E1" />
              <circle cx="61" cy="111" r="1.5" fill={shirtColor} opacity="0.5" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
