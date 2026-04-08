'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MILESTONE DATA — 15 CAREER MILESTONES
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const milestones = [
  { id: 'beginning', label: 'Beginning', x: 600, heading: 'Every journey starts somewhere.', desc: 'Mine started with curiosity, ambition,\nand a constant drive to grow.', visual: 'beginning', evolution: 0.08 },
  { id: 'kolkata', label: 'Kolkata', x: 2000, heading: 'Kolkata — where it all began.', desc: 'Learning, exploring,\nand searching for the right direction.', visual: 'kolkata', evolution: 0.12 },
  { id: 'transition', label: 'The Leap', x: 3400, heading: 'A decision that changed everything.', desc: 'Moved from Kolkata to Mumbai —\nstepping out of comfort to chase growth.', visual: 'flight', evolution: 0.18 },
  { id: 'runtime', label: 'Runtime', x: 4800, heading: 'I joined Runtime Solutions.', desc: 'As a Web Development Intern.\nMy first step into real-world projects.', visual: 'runtime', evolution: 0.25 },
  { id: 'internship', label: 'Internship', x: 6200, heading: 'My Journey at Runtime.', desc: 'Started as an intern, explored multiple roles,\nand evolved into a Project Manager within one year.', visual: 'internship', evolution: 0.32 },
  { id: 'testing-usp', label: 'Testing & Invespy', x: 7600, heading: 'Started with QA & Testing.', desc: 'Worked on Invespy — my first critical project.', visual: 'testing', evolution: 0.40 },
  { id: 'projects', label: 'Projects', x: 9000, heading: 'Worked across multiple projects.', desc: 'From testing to delivery — contributing across\ndiverse products, teams, and challenges.', visual: 'projects', evolution: 0.50 },
  { id: 'skills', label: 'Skills', x: 10400, heading: 'Every challenge built a new skill.', desc: 'From execution to leadership — building skills across\ntechnology, management, and decision-making.', visual: 'skills', evolution: 0.55 },
  { id: 'pm', label: 'Achievements', x: 11800, heading: 'Efforts turned into outcomes.', desc: 'Consistent execution, fast turnaround, and on-time\ndelivery across multiple projects.', visual: 'pm', evolution: 0.62 },
  { id: 'team', label: 'Team', x: 13200, heading: 'Guided by mentors. Supported by team.', desc: 'Aditya · Kiran · The Team', visual: 'team', evolution: 0.68 },
  { id: 'challenges', label: 'Future', x: 14600, heading: 'Focused on what\'s next.', desc: 'From growing as a leader today\nto shaping technology tomorrow.', visual: 'challenges', evolution: 0.58 },
  { id: 'current', label: 'Today', x: 16000, heading: 'Today, I lead projects, manage teams, and take ownership.', desc: '', visual: 'current', evolution: 0.88 },
  { id: 'future', label: 'Vision', x: 18800, heading: 'Building towards the future.', desc: 'Driven by continuous learning,\nleadership, and long-term impact.', visual: 'future', evolution: 1.0 },
  { id: 'final', label: '', x: 20200, heading: 'Rohit Kumar Singh', desc: 'Project Manager\nRuntime Solutions Pvt. Ltd.', visual: 'final', evolution: 1.0 },
];

const TRACK_TOTAL = 22000;
const CHAR_POS = 0.22;

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BITMOJI-STYLE CHARACTER SVG
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function JourneyCharacter({ evolution }: { evolution: number }) {
  const build = 0.85 + evolution * 0.25;
  const skin = '#D4A574';
  const skinSh = '#B8895C';
  const beard = '#1A1A2E';
  const hair = '#0D0D1A';
  const shoe = '#1F1F2E';
  const white = '#F0F0F5';

  // Outfit changes based on evolution — blazer at the end
  const wearsBlazer = evolution >= 0.85;
  const blazer = '#1B1F3B';       // dark navy blazer
  const blazerHi = '#252A4A';     // blazer highlight
  const sweater = wearsBlazer ? blazer : '#4A4A5A';
  const sweaterHi = wearsBlazer ? blazerHi : '#5C5C6E';
  const jeans = wearsBlazer ? '#2C2C3E' : '#8BA4C4';       // formal dark trousers when blazer
  const jeansSh = wearsBlazer ? '#1E1E2E' : '#6B8AAF';

  return (
    <svg viewBox="0 0 120 260" width="86" height={Math.round(178 * build)} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={skin} /><stop offset="100%" stopColor={skinSh} /></linearGradient>
        <linearGradient id="swG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={sweaterHi} /><stop offset="100%" stopColor={sweater} /></linearGradient>
        <radialGradient id="hG" cx=".5" cy=".3" r=".5"><stop offset="0%" stopColor="#1A1A30" /><stop offset="100%" stopColor={hair} /></radialGradient>
        <linearGradient id="jG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={jeans} /><stop offset="100%" stopColor={jeansSh} /></linearGradient>
        {wearsBlazer && (
          <linearGradient id="blzG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2A3058" /><stop offset="100%" stopColor={blazer} /></linearGradient>
        )}
      </defs>
      {/* Man bun */}
      <ellipse cx="60" cy="8" rx="8" ry="7" fill="url(#hG)" />
      <ellipse cx="60" cy="12" rx="5" ry="3" fill={hair} />
      {/* Hair back */}
      <path d="M42 30 Q40 12 60 8 Q80 12 78 30 Q78 20 72 14 Q60 6 48 14 Q42 20 42 30Z" fill="url(#hG)" />
      {/* Head */}
      <ellipse cx="60" cy="32" rx="18" ry="20" fill="url(#skG)" />
      {/* Hair top and sides */}
      <path d="M42 28 Q40 12 60 8 Q80 12 78 28 Q77 18 70 13 Q60 6 50 13 Q43 18 42 28Z" fill="url(#hG)" />
      <path d="M42 28 Q41 32 42 38" stroke={hair} strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M78 28 Q79 32 78 38" stroke={hair} strokeWidth="3" fill="none" opacity="0.5" />
      {/* Ears */}
      <ellipse cx="41" cy="33" rx="3" ry="4" fill={skinSh} opacity="0.6" />
      <ellipse cx="79" cy="33" rx="3" ry="4" fill={skinSh} opacity="0.6" />
      {/* Eyebrows */}
      <path d={`M48 25 Q52 ${23 - evolution * 2} 56 25`} stroke={beard} strokeWidth={1.8} fill="none" strokeLinecap="round" />
      <path d={`M64 25 Q68 ${23 - evolution * 2} 72 25`} stroke={beard} strokeWidth={1.8} fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="52" cy="30" rx="3.5" ry="3" fill="white" />
      <ellipse cx="68" cy="30" rx="3.5" ry="3" fill="white" />
      <ellipse cx="52" cy="30.5" rx="2" ry="2" fill="#1A1A2E">
        <animate attributeName="ry" values="2;0.3;2" dur="5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="68" cy="30.5" rx="2" ry="2" fill="#1A1A2E">
        <animate attributeName="ry" values="2;0.3;2" dur="5s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="53" cy="29.5" r="0.8" fill="white" opacity="0.9" />
      <circle cx="69" cy="29.5" r="0.8" fill="white" opacity="0.9" />
      {/* Nose */}
      <path d="M58 33 Q60 37 62 33" fill="none" stroke={skinSh} strokeWidth="0.8" opacity="0.5" />
      {/* Beard */}
      <path d={`M44 38 Q44 42 46 46 Q50 ${52 + evolution * 2} 60 ${53 + evolution * 2} Q70 ${52 + evolution * 2} 74 46 Q76 42 76 38`} fill={beard} opacity="0.85" />
      <path d="M50 38 Q60 40 70 38" fill="none" stroke={beard} strokeWidth="1.5" opacity="0.3" />
      {/* Mouth (in beard) */}
      {evolution < 0.4
        ? <path d="M55 44 Q60 45 65 44" fill="none" stroke="#C4946A" strokeWidth="0.8" strokeLinecap="round" />
        : <path d="M54 43 Q60 47 66 43" fill="none" stroke="#C4946A" strokeWidth="1" strokeLinecap="round" />
      }
      {/* Neck */}
      <rect x="55" y="50" width="10" height="10" fill="url(#skG)" rx="3" />

      {/* === SHIRT / INNER LAYER === */}
      {wearsBlazer ? (
        <>
          {/* Formal white shirt visible under blazer */}
          <path d={`M${60 - 28 * build} 62 Q${60 - 20 * build} 57 55 56 L65 56 Q${60 + 20 * build} 57 ${60 + 28 * build} 62 L${60 + 27 * build} 130 Q60 134 ${60 - 27 * build} 130 Z`} fill={white} opacity="0.95" />
          {/* Shirt front visible strip */}
          <rect x="56" y="58" width="8" height="72" fill={white} opacity="0.9" />
          {/* Shirt buttons */}
          <circle cx="60" cy="68" r="1" fill="#CBD5E1" />
          <circle cx="60" cy="78" r="1" fill="#CBD5E1" />
          <circle cx="60" cy="88" r="1" fill="#CBD5E1" />
          <circle cx="60" cy="98" r="1" fill="#CBD5E1" />
          {/* Tie */}
          <path d="M58 58 L60 62 L62 58" fill="#6366F1" />
          <path d="M58.5 62 L60 108 L61.5 62" fill="#6366F1" opacity="0.9" />
          <path d="M58 108 L60 114 L62 108" fill="#6366F1" opacity="0.85" />
          {/* Blazer body — left panel */}
          <path d={`M${60 - 28 * build} 62 Q${60 - 20 * build} 57 55 56 L56 56 L56 130 Q${60 - 5} 134 ${60 - 27 * build} 130 Z`} fill="url(#blzG)" />
          {/* Blazer body — right panel */}
          <path d={`M${60 + 28 * build} 62 Q${60 + 20 * build} 57 65 56 L64 56 L64 130 Q${60 + 5} 134 ${60 + 27 * build} 130 Z`} fill="url(#blzG)" />
          {/* Blazer lapels */}
          <path d="M56 58 L52 64 L56 76" fill="#2A3058" stroke="#353B6B" strokeWidth="0.5" />
          <path d="M64 58 L68 64 L64 76" fill="#2A3058" stroke="#353B6B" strokeWidth="0.5" />
          {/* Lapel notch highlights */}
          <path d="M52 64 L49 60" stroke="#353B6B" strokeWidth="0.8" fill="none" />
          <path d="M68 64 L71 60" stroke="#353B6B" strokeWidth="0.8" fill="none" />
          {/* Blazer collar over shirt collar */}
          <path d="M48 58 L54 56 L56 58" fill="none" stroke="#353B6B" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M72 58 L66 56 L64 58" fill="none" stroke="#353B6B" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Breast pocket */}
          <rect x={60 + 8} y="72" width="8" height="1" rx="0.5" fill="#353B6B" opacity="0.5" />
          {/* Pocket square accent */}
          <path d={`M${60 + 9} 69 L${60 + 11} 66 L${60 + 13} 68 L${60 + 15} 66 L${60 + 14} 72 L${60 + 9} 72 Z`} fill="#A5B4FC" opacity="0.7" />
        </>
      ) : (
        <>
          {/* White collar */}
          <path d="M48 58 L54 56 L60 64 L66 56 L72 58" fill="none" stroke={white} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M52 56 L60 66 L68 56" fill={white} opacity="0.9" />
          {/* Sweater body */}
          <path d={`M${60 - 28 * build} 62 Q${60 - 20 * build} 57 55 56 L65 56 Q${60 + 20 * build} 57 ${60 + 28 * build} 62 L${60 + 27 * build} 130 Q60 134 ${60 - 27 * build} 130 Z`} fill="url(#swG)" />
          {/* Sweater collar V over white */}
          <path d="M52 58 L60 70 L68 58" fill="none" stroke={sweater} strokeWidth="1.5" opacity="0.6" />
        </>
      )}

      {/* Arms (with walk swing) */}
      <g>
        {/* Left arm */}
        <path d={`M${60 - 28 * build} 63 Q${60 - 35 * build} 82 ${60 - 30 * build} 105`} stroke={wearsBlazer ? blazer : sweater} strokeWidth={9 * build} fill="none" strokeLinecap="round">
          <animate attributeName="d" values={`M${60 - 28 * build} 63 Q${60 - 35 * build} 82 ${60 - 30 * build} 105;M${60 - 28 * build} 63 Q${60 - 30 * build} 76 ${60 - 26 * build} 92;M${60 - 28 * build} 63 Q${60 - 35 * build} 82 ${60 - 30 * build} 105`} dur="0.8s" repeatCount="indefinite" />
        </path>
        {/* Left wrist cuff */}
        <circle cx={60 - 30 * build} cy="105" r={4.5 * build} fill={wearsBlazer ? white : white} opacity="0.85">
          <animate attributeName="cy" values="105;92;105" dur="0.8s" repeatCount="indefinite" />
        </circle>
        {/* Left hand */}
        <circle cx={60 - 30 * build} cy="110" r={4 * build} fill={skin}>
          <animate attributeName="cy" values="110;96;110" dur="0.8s" repeatCount="indefinite" />
        </circle>
        {/* Right arm */}
        <path d={`M${60 + 28 * build} 63 Q${60 + 35 * build} 82 ${60 + 30 * build} 105`} stroke={wearsBlazer ? blazer : sweater} strokeWidth={9 * build} fill="none" strokeLinecap="round">
          <animate attributeName="d" values={`M${60 + 28 * build} 63 Q${60 + 30 * build} 76 ${60 + 26 * build} 92;M${60 + 28 * build} 63 Q${60 + 35 * build} 82 ${60 + 30 * build} 105;M${60 + 28 * build} 63 Q${60 + 30 * build} 76 ${60 + 26 * build} 92`} dur="0.8s" repeatCount="indefinite" />
        </path>
        <circle cx={60 + 30 * build} cy="105" r={4.5 * build} fill={white} opacity="0.85">
          <animate attributeName="cy" values="92;105;92" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx={60 + 30 * build} cy="110" r={4 * build} fill={skin}>
          <animate attributeName="cy" values="96;110;96" dur="0.8s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* Belt area */}
      <rect x={60 - 26 * build} y="128" width={52 * build} height="5" rx="2" fill={wearsBlazer ? '#1B1F3B' : '#2A2A3A'} opacity="0.6" />
      {/* Trousers / Jeans - left leg */}
      <rect x={60 - 22 * build} y="132" width={20 * build} height={78} rx="4" fill="url(#jG)">
        <animate attributeName="x" values={`${60 - 22 * build};${60 - 25 * build};${60 - 22 * build}`} dur="0.8s" repeatCount="indefinite" />
      </rect>
      {/* Trousers / Jeans - right leg */}
      <rect x={60 + 2 * build} y="132" width={20 * build} height={78} rx="4" fill="url(#jG)">
        <animate attributeName="x" values={`${60 + 2 * build};${60 + 5 * build};${60 + 2 * build}`} dur="0.8s" repeatCount="indefinite" />
      </rect>
      {/* Left shoe */}
      <g>
        <rect x={60 - 24 * build} y="208" width={22 * build} height="8" rx="4" fill={wearsBlazer ? '#111118' : shoe}>
          <animate attributeName="x" values={`${60 - 24 * build};${60 - 27 * build};${60 - 24 * build}`} dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x={60 - 24 * build} y="214" width={22 * build} height="3" rx="1.5" fill={wearsBlazer ? '#2A2A3A' : 'white'} opacity="0.7">
          <animate attributeName="x" values={`${60 - 24 * build};${60 - 27 * build};${60 - 24 * build}`} dur="0.8s" repeatCount="indefinite" />
        </rect>
      </g>
      {/* Right shoe */}
      <g>
        <rect x={60 + 2 * build} y="208" width={22 * build} height="8" rx="4" fill={wearsBlazer ? '#111118' : shoe}>
          <animate attributeName="x" values={`${60 + 2 * build};${60 + 5 * build};${60 + 2 * build}`} dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x={60 + 2 * build} y="214" width={22 * build} height="3" rx="1.5" fill={wearsBlazer ? '#2A2A3A' : 'white'} opacity="0.7">
          <animate attributeName="x" values={`${60 + 2 * build};${60 + 5 * build};${60 + 2 * build}`} dur="0.8s" repeatCount="indefinite" />
        </rect>
      </g>
      {/* ID badge (appears after evolution 0.35) */}
      {evolution > 0.35 && !wearsBlazer && (
        <g>
          <path d="M55 58 Q52 68 51 80" stroke="#A5B4FC" strokeWidth="0.8" fill="none" opacity="0.4" />
          <rect x="44" y="80" width="14" height="19" rx="2" fill="white" opacity="0.85" />
          <rect x="46" y="83" width="10" height="2.5" rx="0.5" fill="#4338CA" />
          <rect x="46" y="87" width="8" height="1.5" rx="0.5" fill="#CBD5E1" />
          <rect x="46" y="90" width="6" height="1.5" rx="0.5" fill="#CBD5E1" />
        </g>
      )}
    </svg>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MILESTONE VISUAL COMPONENTS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/* ═══════════════════════════════════════
   PROJECT SHOWCASE — Interactive Orbit
   ═══════════════════════════════════════ */
const PROJECT_DATA = [
  { id: 'attitude', name: 'Attitude Living', color: '#1A7A6D', tags: 'Development • Client Communication • Testing', desc: 'Handled end-to-end execution — from development coordination to delivery.' },
  { id: 'millmitra', name: 'Mill Mitra', color: '#E53E3E', tags: 'Testing • Team Collaboration', desc: 'Tested admin panel & mobile app with structured coordination.' },
  { id: 'nexus', name: 'Nexus One', color: '#10B981', tags: 'QA Testing • Reporting', desc: 'Performed testing, created reports, and ensured quality delivery.' },
  { id: 'aufinja', name: 'Au Finja', color: '#D4A017', tags: 'Testing • Documentation • Integrations', desc: 'Testing, documentation, PayTabs & FedEx integration, client calls.' },
  { id: 'frams', name: 'FRAMS', color: '#6366F1', tags: 'Testing • QA Support', desc: 'Contributed to QA testing and ensured system reliability.' },
  { id: 'gresham', name: 'Gresham Global', color: '#E85D5D', tags: 'Project Management • Client Handling', desc: 'Managed project end-to-end — from communication to delivery.' },
  { id: 'xanadu', name: 'Xanadu', color: '#B8860B', tags: 'Project Involvement • Coordination', desc: 'Contributed to project milestones and team coordination.' },
  { id: 'amplify', name: 'Amplify Chicago', color: '#ffffff', tags: 'Client Communication • Delivery', desc: 'Handled tight deadlines and ensured on-time delivery.' },
  { id: 'academic', name: 'Academic Group', color: '#E8732C', tags: 'Maintenance • Testing', desc: 'Ensured smooth progress and testing under supervision.' },
  { id: 'projectwire', name: 'Project Wire', color: '#4CAF50', tags: 'Tender Application • US Government', desc: 'Applying for tender for US government contracts.' },
];

// Scattered positions (px) — wider scatter across 900x380 container for projector
const SCATTER_POS = [
  { x: 420, y: 20 },    // top center
  { x: 80, y: 75 },    // left upper
  { x: 740, y: 55 },    // right upper
  { x: 240, y: 140 },   // center-left
  { x: 600, y: 120 },   // center-right
  { x: 40, y: 240 },   // far left middle
  { x: 850, y: 210 },   // far right middle
  { x: 440, y: 230 },   // center lower
  { x: 170, y: 310 },   // left lower
  { x: 700, y: 300 },   // right lower
];

function ProjectLogoSVG({ id, size = 50 }: { id: string; size?: number }) {
  const s = size;
  const v = `0 0 ${s} ${s}`;
  if (id === 'attitude') return (
    <svg width={s} height={s} viewBox={v}><rect width={s} height={s} rx={s * 0.16} fill="#1A7A6D" /><text x={s / 2} y={s * 0.38} textAnchor="middle" fill="#fff" fontSize={s * 0.18} fontWeight="800" letterSpacing="1.5">ATTI</text><text x={s / 2} y={s * 0.62} textAnchor="middle" fill="#fff" fontSize={s * 0.18} fontWeight="800" letterSpacing="1.5">TUDE</text><text x={s / 2} y={s * 0.84} textAnchor="middle" fill="#ffffff80" fontSize={s * 0.1} fontWeight="600" letterSpacing="2">LIVING</text></svg>
  );
  if (id === 'millmitra') return (
    <svg width={s} height={s} viewBox={v}><circle cx={s / 2} cy={s / 2} r={s * 0.48} fill="#fff" stroke="#E53E3E" strokeWidth="1" /><path d={`M${s * 0.3} ${s * 0.76} L${s * 0.3} ${s * 0.32} L${s / 2} ${s * 0.56} L${s * 0.7} ${s * 0.32} L${s * 0.7} ${s * 0.76}`} fill="#E53E3E" opacity="0.9" /></svg>
  );
  if (id === 'nexus') return (
    <svg width={s} height={s} viewBox={v}><circle cx={s / 2} cy={s / 2} r={s * 0.48} fill="#2D1B4E" /><path d={`M${s / 2} ${s * 0.12} L${s * 0.58} ${s * 0.36} L${s / 2} ${s * 0.28} L${s * 0.42} ${s * 0.36} Z`} fill="#F97316" /><path d={`M${s * 0.12} ${s / 2} L${s * 0.36} ${s * 0.42} L${s * 0.28} ${s / 2} L${s * 0.36} ${s * 0.58} Z`} fill="#EC4899" /><path d={`M${s / 2} ${s * 0.88} L${s * 0.42} ${s * 0.64} L${s / 2} ${s * 0.72} L${s * 0.58} ${s * 0.64} Z`} fill="#8B5CF6" /><path d={`M${s * 0.88} ${s / 2} L${s * 0.64} ${s * 0.58} L${s * 0.72} ${s / 2} L${s * 0.64} ${s * 0.42} Z`} fill="#EF4444" /><circle cx={s / 2} cy={s / 2} r={s * 0.08} fill="#2D1B4E" /></svg>
  );
  if (id === 'aufinja') return (
    <svg width={s} height={s} viewBox={v}><rect width={s} height={s} rx={s * 0.16} fill="#111" /><text x={s * 0.32} y={s * 0.6} fill="#D4A017" fontSize={s * 0.32} fontWeight="800" fontFamily="serif">Aü</text><text x={s * 0.72} y={s * 0.56} fill="#fff" fontSize={s * 0.18} fontWeight="600" fontFamily="serif">FJ</text></svg>
  );
  if (id === 'frams') return (
    <svg width={s} height={s} viewBox={v}><rect width={s} height={s} rx={s * 0.16} fill="#1a1540" /><text x={s / 2} y={s * 0.42} textAnchor="middle" fill="#6366F1" fontSize={s * 0.28} fontWeight="900" letterSpacing="1">FR</text><text x={s / 2} y={s * 0.7} textAnchor="middle" fill="#6366F180" fontSize={s * 0.14} fontWeight="700" letterSpacing="2">AMS</text></svg>
  );
  if (id === 'gresham') return (
    <svg width={s} height={s} viewBox={v}><circle cx={s / 2} cy={s / 2} r={s * 0.48} fill="#E85D5D" /><circle cx={s / 2} cy={s * 0.4} r={s * 0.2} fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.6" /><ellipse cx={s / 2} cy={s * 0.4} rx={s * 0.2} ry={s * 0.1} fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.4" /><ellipse cx={s / 2} cy={s * 0.4} rx={s * 0.1} ry={s * 0.2} fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.4" /><text x={s / 2} y={s * 0.76} textAnchor="middle" fill="#fff" fontSize={s * 0.1} fontWeight="700" letterSpacing="1">GRESHAM</text><text x={s / 2} y={s * 0.9} textAnchor="middle" fill="#ffffffb0" fontSize={s * 0.08} fontWeight="600" letterSpacing="1.5">GLOBAL</text></svg>
  );
  if (id === 'xanadu') return (
    <svg width={s} height={s} viewBox={v}><rect width={s} height={s} rx={s * 0.16} fill="#F5F0E6" /><line x1={s * 0.2} y1={s * 0.2} x2={s * 0.8} y2={s * 0.8} stroke="#B8860B" strokeWidth="2" /><line x1={s * 0.8} y1={s * 0.2} x2={s * 0.2} y2={s * 0.8} stroke="#B8860B" strokeWidth="2" /><line x1={s / 2} y1={s * 0.1} x2={s / 2} y2={s * 0.9} stroke="#B8860B" strokeWidth="1.5" opacity="0.6" /><line x1={s * 0.1} y1={s / 2} x2={s * 0.9} y2={s / 2} stroke="#B8860B" strokeWidth="1.5" opacity="0.6" /><text x={s / 2} y={s * 0.56} textAnchor="middle" fill="#6B3A2E" fontSize={s * 0.11} fontWeight="700" letterSpacing="2">XANADU</text></svg>
  );
  if (id === 'amplify') return (
    <svg width={s} height={s} viewBox={v}><rect width={s} height={s} rx={s * 0.16} fill="#111" /><path d={`M${s * 0.24} ${s / 2} L${s * 0.3} ${s * 0.36} L${s * 0.36} ${s * 0.44} L${s * 0.42} ${s * 0.3} L${s * 0.48} ${s * 0.4} L${s * 0.54} ${s * 0.24} L${s * 0.6} ${s * 0.4} L${s * 0.66} ${s * 0.3} L${s * 0.72} ${s * 0.44} L${s * 0.78} ${s * 0.36}`} fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.5" /><text x={s / 2} y={s * 0.72} textAnchor="middle" fill="#fff" fontSize={s * 0.14} fontWeight="800" letterSpacing="0.8">AMPLIFY</text><text x={s / 2} y={s * 0.88} textAnchor="middle" fill="#ffffff80" fontSize={s * 0.1} fontWeight="600" letterSpacing="1.5">CHICAGO</text></svg>
  );
  if (id === 'academic') return (
    <svg width={s} height={s} viewBox={v}><circle cx={s / 2} cy={s / 2} r={s * 0.48} fill="#fff" stroke="#1B3A5C" strokeWidth="1.5" /><text x={s * 0.36} y={s * 0.64} fill="#1B3A5C" fontSize={s * 0.44} fontWeight="800" fontFamily="serif">A</text><text x={s * 0.6} y={s * 0.56} fill="#E8732C" fontSize={s * 0.32} fontWeight="800" fontFamily="serif">G</text></svg>
  );
  if (id === 'projectwire') return (
    <svg width={s} height={s} viewBox={v}><rect width={s} height={s} rx={s * 0.16} fill="#0D1B2A" /><path d={`M${s * 0.2} ${s * 0.7} L${s * 0.4} ${s * 0.4} L${s * 0.6} ${s * 0.56} L${s * 0.8} ${s * 0.3}`} fill="none" stroke="#4CAF50" strokeWidth="2" /><circle cx={s * 0.4} cy={s * 0.4} r={s * 0.04} fill="#4CAF50" /><circle cx={s * 0.6} cy={s * 0.56} r={s * 0.04} fill="#4CAF50" /><circle cx={s * 0.8} cy={s * 0.3} r={s * 0.04} fill="#4CAF50" /><text x={s / 2} y={s * 0.9} textAnchor="middle" fill="#4CAF50" fontSize={s * 0.09} fontWeight="700" letterSpacing="0.5">PROJECT WIRE</text></svg>
  );
  return <svg width={s} height={s} viewBox={v}><circle cx={s / 2} cy={s / 2} r={s * 0.48} fill="#22223310" stroke="#222233" strokeWidth="1" /></svg>;
}

function ProjectShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = PROJECT_DATA.find(p => p.id === activeId) || null;

  return (
    <div style={{ position: 'relative', width: '900px', height: '380px', pointerEvents: 'auto' }}>
      {/* Scattered project logos */}
      {PROJECT_DATA.map((p, i) => {
        const pos = SCATTER_POS[i];
        const isActive = activeId === p.id;
        const hasActive = activeId !== null;
        return (
          <motion.div
            key={p.id}
            onClick={() => setActiveId(isActive ? null : p.id)}
            animate={{
              left: isActive ? 420 : pos.x,
              top: isActive ? 60 : pos.y,
              scale: isActive ? 1.8 : (hasActive && !isActive ? 0.65 : 1),
              opacity: hasActive && !isActive ? 0.2 : 1,
            }}
            transition={{ type: 'spring', stiffness: 140, damping: 20, duration: 0.6 }}
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: isActive ? 20 : 5,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            }}
          >
            {/* Logo circle */}
            <div style={{
              width: isActive ? '110px' : '80px',
              height: isActive ? '110px' : '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isActive ? `0 0 50px ${p.color}70, 0 0 100px ${p.color}30, 0 0 150px ${p.color}10` : `0 0 12px ${p.color}18`,
              transition: 'width 0.4s ease-in-out, height 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
            }}>
              <ProjectLogoSVG id={p.id} size={isActive ? 110 : 80} />
            </div>
            {/* Name always visible below logo */}
            <div style={{
              fontSize: isActive ? '1.3rem' : '0.88rem',
              fontWeight: 700,
              color: p.color,
              fontFamily: 'var(--font-heading)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              transition: 'font-size 0.4s ease-in-out, opacity 0.4s ease-in-out',
              opacity: hasActive && !isActive ? 0.25 : 1,
              textShadow: isActive ? `0 0 20px ${p.color}50` : 'none',
            }}>
              {p.name}
            </div>
          </motion.div>
        );
      })}

      {/* Active project description panel */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute',
              left: '50%', bottom: '-20px',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              zIndex: 25,
              width: '500px',
              maxWidth: '90%',
            }}
          >
            <div style={{
              fontSize: '1.05rem', color: activeProject.color,
              fontWeight: 600, letterSpacing: '0.06em',
              marginBottom: '0.5rem', opacity: 0.9,
            }}>
              {activeProject.tags}
            </div>
            <div style={{
              fontSize: '1rem', color: '#b0bec5',
              lineHeight: 1.6,
            }}>
              {activeProject.desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MilestoneVisual({ type }: { type: string }) {
  if (type === 'beginning') {
    return (
      <svg width="300" height="170" viewBox="0 0 300 170" className="milestone-svg">
        {/* Soft spotlight behind buildings */}
        <defs>
          <radialGradient id="spotBg" cx="0.5" cy="0.4" r="0.55">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="150" cy="90" rx="140" ry="80" fill="url(#spotBg)" />
        {/* Building 1 - lit (hope) */}
        <rect x="20" y="55" width="45" height="115" rx="2" fill="#1E1B4B" opacity="0.7" />
        {[0, 1, 2, 3].map(r => [0, 1].map(c => <rect key={`b1${r}${c}`} x={28 + c * 18} y={65 + r * 24} width="9" height="14" rx="1" fill="#FCD34D" opacity={0.5}>
          <animate attributeName="opacity" values={`0.5;0.2;0.5`} dur={`${2 + r * 0.5 + c * 0.7}s`} repeatCount="indefinite" />
        </rect>))}
        {/* Building 2 - lit (hope) */}
        <rect x="75" y="25" width="58" height="145" rx="3" fill="#1E1B4B" opacity="0.85" />
        <rect x="75" y="20" width="58" height="7" rx="2" fill="#312E81" opacity="0.4" />
        {[0, 1, 2, 3, 4].map(r => [0, 1].map(c => <rect key={`b2${r}${c}`} x={85 + c * 24} y={35 + r * 22} width="13" height="15" rx="1" fill="#FCD34D" opacity={0.45}>
          <animate attributeName="opacity" values={`0.45;0.15;0.45`} dur={`${2.5 + r * 0.4 + c * 0.6}s`} repeatCount="indefinite" />
        </rect>))}
        {/* Building 3 - dark (uncertainty) */}
        <rect x="145" y="60" width="42" height="110" rx="2" fill="#1E1B4B" opacity="0.6" />
        <rect x="153" y="72" width="9" height="12" rx="1" fill="#0A0820" opacity="0.8" />
        <rect x="167" y="72" width="9" height="12" rx="1" fill="#0A0820" opacity="0.8" />
        <rect x="153" y="92" width="9" height="12" rx="1" fill="#0A0820" opacity="0.8" />
        <rect x="167" y="92" width="9" height="12" rx="1" fill="#0A0820" opacity="0.8" />
        {/* Building 4 - dark (uncertainty) */}
        <rect x="200" y="40" width="50" height="130" rx="2" fill="#1E1B4B" opacity="0.75" />
        <rect x="210" y="55" width="9" height="12" rx="1" fill="#0A0820" opacity="0.8" />
        <rect x="225" y="55" width="9" height="12" rx="1" fill="#0A0820" opacity="0.8" />
        <rect x="210" y="75" width="9" height="12" rx="1" fill="#0A0820" opacity="0.8" />
        <rect x="225" y="75" width="9" height="12" rx="1" fill="#0A0820" opacity="0.8" />
        {/* Building 5 - small, dark */}
        <rect x="260" y="80" width="32" height="90" rx="2" fill="#1E1B4B" opacity="0.5" />
        {/* Flickering star */}
        <circle cx="150" cy="12" r="4" fill="#FCD34D" opacity="0.15"><animate attributeName="opacity" values="0.15;0.45;0.15" dur="3s" repeatCount="indefinite" /></circle>
      </svg>
    );
  }
  if (type === 'kolkata') {
    return (
      <div style={{ textAlign: 'center' }}>
        <svg width="220" height="90" viewBox="0 0 220 90" className="milestone-svg">
          {/* Warm tint glow */}
          <defs>
            <radialGradient id="warmGlow" cx="0.5" cy="0.5" r="0.6">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="220" height="90" fill="url(#warmGlow)" />
          <path d="M20 85 L20 45 Q30 35 40 40 L40 85" fill="#1E1B4B" opacity="0.5" />
          <path d="M60 85 L60 28 Q70 18 80 23 Q90 18 100 28 L100 85" fill="#1E1B4B" opacity="0.6" />
          <path d="M85 28 L85 8 L90 8 L90 28" fill="#312E81" opacity="0.5" />
          <rect x="110" y="50" width="38" height="35" rx="2" fill="#1E1B4B" opacity="0.5" />
          <rect x="160" y="40" width="35" height="45" rx="2" fill="#1E1B4B" opacity="0.4" />
        </svg>
        <div style={{ fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.3em', fontWeight: 600, fontFamily: 'var(--font-heading)', marginBottom: '0.2rem' }}>📍 HOME</div>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#F59E0B', textShadow: '0 0 35px rgba(245,158,11,0.45), 0 0 70px rgba(245,158,11,0.15)', letterSpacing: '0.08em' }}>KOLKATA</div>
        <div style={{ width: '50px', height: '2px', background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)', margin: '0.4rem auto', opacity: 0.6 }} />
      </div>
    );
  }
  if (type === 'flight') {
    return (
      <svg width="320" height="130" viewBox="0 0 320 130" className="milestone-svg">
        <defs>
          <linearGradient id="flG" x1="0%" y1="0%" x2="100%"><stop offset="0%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#6366F1" /></linearGradient>
          {/* Glow filter for the trail */}
          <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* KOL marker */}
        <circle cx="35" cy="72" r="9" fill="#F59E0B" opacity="0.6" />
        <circle cx="35" cy="72" r="14" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.2"><animate attributeName="r" values="9;18;9" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" /></circle>
        <text x="35" y="98" fill="#F59E0B" fontSize="10" textAnchor="middle" fontWeight="700" fontFamily="var(--font-heading)">KOL</text>
        {/* MUM marker */}
        <circle cx="285" cy="42" r="11" fill="#6366F1" opacity="0.7"><animate attributeName="r" values="8;13;8" dur="2.5s" repeatCount="indefinite" /></circle>
        <circle cx="285" cy="42" r="16" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.2"><animate attributeName="r" values="11;22;11" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" /></circle>
        <text x="285" y="68" fill="#6366F1" fontSize="10" textAnchor="middle" fontWeight="700" fontFamily="var(--font-heading)">MUM</text>
        {/* Flight path - brighter and with glow */}
        <path d="M47 72 Q160 5 273 42" fill="none" stroke="url(#flG)" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.6" filter="url(#trailGlow)">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
        </path>
        {/* Glow trail */}
        <path d="M47 72 Q160 5 273 42" fill="none" stroke="url(#flG)" strokeWidth="6" opacity="0.12" filter="url(#trailGlow)" />
        {/* Airplane bigger */}
        <text x="160" y="22" fontSize="28" textAnchor="middle">✈️</text>
        {/* Distance text */}
        <text x="160" y="122" fill="#A5B4FC" fontSize="10" textAnchor="middle" opacity="0.7" fontWeight="600" fontFamily="var(--font-heading)" letterSpacing="0.1em">~2,000 km journey</text>
      </svg>
    );
  }
  if (type === 'runtime') {
    return (
      <div style={{ position: 'relative', width: '400px', height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Large background logo with animation */}
        <div className="runtime-bg-logo">
          <svg width="350" height="200" viewBox="0 0 350 200" style={{ opacity: 0.06 }}>
            {/* Hourglass shape */}
            <path d="M140 20 L210 20 L195 80 Q175 100 175 100 Q175 100 155 80 Z" fill="#22B8CF" />
            <path d="M140 180 L210 180 L195 120 Q175 100 175 100 Q175 100 155 120 Z" fill="#C4D62E" />
            <rect x="135" y="15" width="80" height="8" rx="3" fill="#22B8CF" />
            <rect x="135" y="177" width="80" height="8" rx="3" fill="#C4D62E" />
            {/* Text */}
            <text x="175" y="210" textAnchor="middle" fill="#22B8CF" fontSize="28" fontWeight="800" fontFamily="var(--font-heading)" letterSpacing="3">RUNTIME</text>
          </svg>
        </div>
        {/* Front card */}
        <div className="glass-card runtime-card-glow" style={{ padding: '1.8rem', width: '340px', position: 'relative', zIndex: 2 }}>
          <div style={{ height: '110px', background: '#0A0820', borderRadius: '10px', padding: '14px', marginBottom: '14px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(99,102,241,0.1)' }}>
            <div style={{ width: '55%', height: '4px', background: '#6366F130', borderRadius: '2px', marginBottom: '6px' }} />
            <div style={{ width: '75%', height: '4px', background: '#6366F120', borderRadius: '2px', marginBottom: '6px' }} />
            <div style={{ width: '40%', height: '4px', background: '#10B98120', borderRadius: '2px', marginBottom: '6px' }} />
            <div style={{ width: '65%', height: '4px', background: '#6366F115', borderRadius: '2px', marginBottom: '6px' }} />
            <div style={{ width: '50%', height: '4px', background: '#F59E0B10', borderRadius: '2px' }} />
            <div className="status-led" style={{ position: 'absolute', top: '10px', right: '10px', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
            <div className="cursor-blink" style={{ position: 'absolute', bottom: '14px', left: '14px', width: '8px', height: '16px', background: '#6366F1', borderRadius: '1px' }} />
          </div>
          <div style={{ width: '60px', height: '3px', background: '#374151', margin: '0 auto', borderRadius: '0 0 3px 3px' }} />
          <div style={{ fontSize: '1.45rem', color: '#6366F1', textAlign: 'center', marginTop: '14px', fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '0.06em', textShadow: '0 0 25px rgba(99,102,241,0.45), 0 0 50px rgba(99,102,241,0.18)' }}>RUNTIME SOLUTIONS</div>
        </div>
      </div>
    );
  }
  if (type === 'internship') {
    return <InteractiveTimeline />;
  }
  if (type === 'testing') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', pointerEvents: 'auto' }}>
        {/* Invespy logo */}
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '3.6rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em', textShadow: '0 0 40px rgba(255,255,255,0.18), 0 0 80px rgba(99,102,241,0.12)' }}>invespy</span>
        </div>
        {/* Cards row */}
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'stretch' }}>
          {/* Test results card */}
          <div className="glass-card runtime-card-glow" style={{ padding: '1.5rem 1.8rem', width: '420px' }}>
            <div style={{ fontSize: '1.1rem', color: '#A5B4FC', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>TEST RESULTS — INVESPY v2.0</div>
            {[
              { label: '✓ Login Flow', pass: true },
              { label: '✓ Dashboard', pass: true },
              { label: '✓ API Integration', pass: true },
              { label: '✗ Payment Gateway', pass: false },
              { label: '✗ Validation', pass: false },
            ].map((t, i) => (
              <div key={i} style={{ fontSize: '1.02rem', color: t.pass ? '#10B981' : '#EF4444', padding: '4px 0', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.02em' }}>{t.label}</div>
            ))}
            <div style={{ marginTop: '0.9rem', padding: '8px 16px', background: '#10B98110', borderRadius: '8px', border: '1px solid #10B98120', display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
              <span style={{ fontSize: '1rem', color: '#10B981', fontWeight: 700 }}>3 Passed</span>
              <span style={{ fontSize: '1rem', color: '#475569' }}>•</span>
              <span style={{ fontSize: '1rem', color: '#EF4444', fontWeight: 700 }}>2 Failed</span>
            </div>
          </div>
          {/* QA Visual card */}
          <div className="glass-card" style={{ padding: '1.1rem 1.4rem', width: '280px', borderColor: '#6366F120' }}>
            <div style={{ fontSize: '0.82rem', color: '#6366F1', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>QA PROCESS</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.8 }}>
              • End-to-end testing<br />
              • Bug identification & reproduction<br />
              • Cross-browser testing<br />
              • Dev coordination for fixes<br />
              • Reporting & validation
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'projects') {
    return <ProjectShowcase />;
  }
  if (type === 'skills') {
    const pillars = [
      {
        icon: '⚙️', title: 'Technical & Execution', color: '#06B6D4', glow: '#06B6D4',
        items: [
          { name: 'Development & Vibe Coding', hover: 'Built and contributed to real-world applications' },
          { name: 'QA & Testing', hover: 'Ensuring product quality through structured testing' },
          { name: 'Debugging & Problem Solving', hover: 'Handled complex issues with practical solutions' },
          { name: 'System Understanding', hover: 'Deep knowledge of architecture and workflows' },
        ],
      },
      {
        icon: '📊', title: 'Project & Product Management', color: '#F59E0B', glow: '#F59E0B',
        items: [
          { name: 'Team Management', hover: 'Coordinated teams to ensure smooth execution' },
          { name: 'Product Thinking & Execution', hover: 'Understood product vision and user needs' },
          { name: 'Agile Workflow Handling', hover: 'Managed sprints, standups, and iterative delivery' },
          { name: 'Delivery & Timeline Ownership', hover: 'Ensured on-time delivery across projects' },
        ],
      },
      {
        icon: '🧠', title: 'Leadership & Communication', color: '#8B5CF6', glow: '#8B5CF6',
        items: [
          { name: 'Client Communication', hover: 'Handled discussions, demos, and feedback loops' },
          { name: 'Stakeholder Management', hover: 'Aligned expectations across teams and leadership' },
          { name: 'Tender Documentation', hover: 'Created proposals for government contracts' },
          { name: 'Content & Video Creation', hover: 'Produced marketing and product content' },
          { name: 'Decision Making & Ownership', hover: 'Took decisive action with accountability' },
        ],
      },
    ];
    return (
      <div style={{ display: 'flex', gap: '1.6rem', maxWidth: '1050px', justifyContent: 'center', pointerEvents: 'auto', alignItems: 'stretch' }}>
        {pillars.map((pillar, i) => (
          <div key={i} style={{
            flex: '1', minWidth: '280px', maxWidth: '340px',
            background: 'rgba(15,12,40,0.7)', backdropFilter: 'blur(12px)',
            border: `1px solid ${pillar.color}20`, borderRadius: '18px',
            padding: '1.8rem 1.6rem', position: 'relative', overflow: 'hidden',
            boxShadow: `0 0 35px ${pillar.glow}08, 0 4px 24px rgba(0,0,0,0.3)`,
            transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out, border-color 0.4s ease-in-out',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 0 50px ${pillar.glow}25, 0 10px 40px rgba(0,0,0,0.4)`; e.currentTarget.style.borderColor = `${pillar.color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 35px ${pillar.glow}08, 0 4px 24px rgba(0,0,0,0.3)`; e.currentTarget.style.borderColor = `${pillar.color}20`; }}
          >
            {/* Glow accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${pillar.color}, transparent)`, opacity: 0.5 }} />
            {/* Icon + Title */}
            <div style={{ textAlign: 'center', marginBottom: '1.3rem' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.6rem' }}>{pillar.icon}</div>
              <div style={{ fontSize: '1.1rem', color: pillar.color, fontWeight: 700, fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', lineHeight: 1.3 }}>{pillar.title}</div>
            </div>
            {/* Skills list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {pillar.items.map((item, j) => (
                <div key={j} className="skill-pillar-item" style={{
                  padding: '0.6rem 0.9rem', borderRadius: '10px',
                  background: `${pillar.color}08`, border: `1px solid ${pillar.color}10`,
                  cursor: 'default', transition: 'all 0.35s ease-in-out',
                  position: 'relative',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${pillar.color}15`;
                    e.currentTarget.style.borderColor = `${pillar.color}30`;
                    e.currentTarget.style.transform = 'scale(1.03)';
                    const hoverEl = e.currentTarget.querySelector('.skill-hover-text') as HTMLElement;
                    if (hoverEl) { hoverEl.style.maxHeight = '40px'; hoverEl.style.opacity = '1'; hoverEl.style.marginTop = '0.4rem'; }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${pillar.color}08`;
                    e.currentTarget.style.borderColor = `${pillar.color}10`;
                    e.currentTarget.style.transform = 'scale(1)';
                    const hoverEl = e.currentTarget.querySelector('.skill-hover-text') as HTMLElement;
                    if (hoverEl) { hoverEl.style.maxHeight = '0'; hoverEl.style.opacity = '0'; hoverEl.style.marginTop = '0'; }
                  }}
                >
                  <div style={{ fontSize: '0.95rem', color: '#E8ECF4', fontWeight: 600 }}>{item.name}</div>
                  <div className="skill-hover-text" style={{
                    fontSize: '0.8rem', color: '#a0aec0', lineHeight: 1.5,
                    maxHeight: 0, opacity: 0, overflow: 'hidden',
                    transition: 'max-height 0.35s ease-in-out, opacity 0.35s ease-in-out, margin-top 0.35s ease-in-out',
                  }}>{item.hover}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'pm') {
    const achievements = [
      { icon: '🚀', title: 'On-Time Delivery', text: 'Delivered Amplify & Xanadu projects successfully within deadlines.', color: '#10B981' },
      { icon: '⚡', title: 'Speed & Execution', text: 'Created 50+ mockups in just 2 days for rapid project progress.', color: '#6366F1' },
      { icon: '📦', title: 'Ownership', text: 'Completed Palghar website content upload within timeline.', color: '#8B5CF6' },
      { icon: '📊', title: 'Project Impact', text: 'Contributed to delivery of 10+ projects across multiple domains.', color: '#F59E0B' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', maxWidth: '720px', pointerEvents: 'auto' }}>
        {achievements.map((a, i) => (
          <div key={i} style={{
            background: 'rgba(15,12,40,0.7)', backdropFilter: 'blur(12px)',
            border: `1px solid ${a.color}20`, borderRadius: '18px',
            padding: '1.5rem 1.6rem', position: 'relative', overflow: 'hidden',
            transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out, border-color 0.4s ease-in-out',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'; e.currentTarget.style.boxShadow = `0 0 40px ${a.color}25, 0 10px 32px rgba(0,0,0,0.35)`; e.currentTarget.style.borderColor = `${a.color}45`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${a.color}20`; }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${a.color}, transparent)`, opacity: 0.45 }} />
            <div style={{ fontSize: '2rem', marginBottom: '0.7rem' }}>{a.icon}</div>
            <div style={{ fontSize: '1.1rem', color: a.color, fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '0.45rem', letterSpacing: '0.04em' }}>{a.title}</div>
            <div style={{ fontSize: '0.9rem', color: '#a0aec0', lineHeight: 1.6 }}>{a.text}</div>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'team') {
    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
        {[{ n: 'Aditya', c: '#10B981', h: 75 }, { n: 'Kiran', c: '#F59E0B', h: 68 }, { n: 'Team', c: '#8B5CF6', h: 58 }].map((m, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <svg width="50" height={m.h} viewBox={`0 0 50 ${m.h}`}>
              <ellipse cx="25" cy="12" rx="10" ry="11" fill={m.c} opacity="0.5" />
              <path d={`M7 28 Q12 24 25 25 Q38 24 43 28 L42 ${m.h - 5} Q39 ${m.h} 25 ${m.h} Q11 ${m.h} 8 ${m.h - 5} Z`} fill={m.c} opacity="0.35" />
            </svg>
            <div style={{ fontSize: '0.85rem', color: m.c, fontWeight: 600, marginTop: '5px' }}>{m.n}</div>
          </div>
        ))}
      </div>
    );
  }
  if (type === 'challenges') {
    return (
      <div style={{ display: 'flex', gap: '1.6rem', maxWidth: '800px', justifyContent: 'center', pointerEvents: 'auto', alignItems: 'stretch' }}>
        {/* Short-Term Goal */}
        <div style={{
          flex: 1, background: 'rgba(15,12,40,0.75)', backdropFilter: 'blur(14px)',
          border: '1px solid #10B98125', borderRadius: '20px',
          padding: '2rem 1.8rem', position: 'relative', overflow: 'hidden',
          boxShadow: '0 0 40px #10B98108, 0 6px 28px rgba(0,0,0,0.3)',
          transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out, border-color 0.4s ease-in-out',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 0 60px #10B98120, 0 14px 48px rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = '#10B98145'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px #10B98108, 0 6px 28px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = '#10B98125'; }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #10B981, transparent)', opacity: 0.5 }} />
          <div style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>🎯</div>
          <div style={{ fontSize: '0.95rem', color: '#10B981', fontWeight: 700, letterSpacing: '0.12em', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', textTransform: 'uppercase' as const }}>Short-Term Goal</div>
          <div style={{ fontSize: '1.05rem', color: '#E8ECF4', lineHeight: 1.7, fontWeight: 500 }}>
            To step into a <span style={{ color: '#10B981', fontWeight: 700 }}>Team Lead</span> role and manage the Kolkata team — driving execution, collaboration, and delivery.
          </div>
        </div>
        {/* Long-Term Vision */}
        <div style={{
          flex: 1, background: 'rgba(15,12,40,0.75)', backdropFilter: 'blur(14px)',
          border: '1px solid #8B5CF625', borderRadius: '20px',
          padding: '2rem 1.8rem', position: 'relative', overflow: 'hidden',
          boxShadow: '0 0 40px #8B5CF608, 0 6px 28px rgba(0,0,0,0.3)',
          transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out, border-color 0.4s ease-in-out',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 0 60px #8B5CF620, 0 14px 48px rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = '#8B5CF645'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px #8B5CF608, 0 6px 28px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = '#8B5CF625'; }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)', opacity: 0.5 }} />
          {/* Subtle glow pulse */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150px', height: '150px', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, #8B5CF610 0%, transparent 70%)', animation: 'pulse 3s ease-in-out infinite' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>🚀</div>
            <div style={{ fontSize: '0.95rem', color: '#8B5CF6', fontWeight: 700, letterSpacing: '0.12em', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', textTransform: 'uppercase' as const }}>Long-Term Vision</div>
            <div style={{ fontSize: '1.05rem', color: '#E8ECF4', lineHeight: 1.7, fontWeight: 500 }}>
              To grow into a <span style={{ color: '#A78BFA', fontWeight: 700 }}>Chief Technology Officer (CTO)</span> — leading technology, strategy, and innovation at scale.
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'achievements') {
    return (
      <svg width="200" height="100" viewBox="0 0 200 100" className="milestone-svg">
        {[{ x: 15, h: 30, c: '#6366F1' }, { x: 45, h: 50, c: '#818CF8' }, { x: 75, h: 65, c: '#6366F1' }, { x: 105, h: 75, c: '#A5B4FC' }, { x: 135, h: 85, c: '#6366F1' }, { x: 165, h: 95, c: '#818CF8' }].map((b, i) => (
          <rect key={i} x={b.x} y={100 - b.h} width="22" height={b.h} rx="2" fill={b.c} opacity="0.5"><animate attributeName="opacity" values="0.3;0.6;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" /></rect>
        ))}
        <text x="100" y="15" textAnchor="middle" fill="#FCD34D" fontSize="16">🏆</text>
      </svg>
    );
  }
  if (type === 'current') {
    return (
      <div style={{ display: 'flex', gap: '0.8rem' }}>
        {['LEAD', 'DECIDE', 'DELIVER'].map((r, i) => (
          <div key={i} className="glass-card" style={{ padding: '0.75rem 1.4rem', color: ['#A5B4FC', '#818CF8', '#6366F1'][i], fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', textShadow: `0 0 16px ${['#A5B4FC', '#818CF8', '#6366F1'][i]}35` }}>{r}</div>
        ))}
      </div>
    );
  }
  if (type === 'future') {
    return (
      <div style={{ textAlign: 'center', pointerEvents: 'auto' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
          {['LEARN', 'LEAD', 'INNOVATE'].map((w, i) => (
            <div key={i} style={{
              padding: '0.7rem 1.6rem', borderRadius: '12px',
              background: 'rgba(15,12,40,0.6)', border: `1px solid ${['#06B6D4', '#8B5CF6', '#F59E0B'][i]}25`,
              color: ['#06B6D4', '#8B5CF6', '#F59E0B'][i], fontFamily: 'var(--font-heading)',
              fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em',
              textShadow: `0 0 18px ${['#06B6D4', '#8B5CF6', '#F59E0B'][i]}35`,
              transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 0 28px ${['#06B6D4', '#8B5CF6', '#F59E0B'][i]}25`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >{w}</div>
          ))}
        </div>
        <div style={{ width: '80px', height: '1.5px', background: 'linear-gradient(90deg, transparent, #6366F1, transparent)', margin: '0 auto', opacity: 0.4 }} />
      </div>
    );
  }
  if (type === 'final') {
    return (
      <div style={{ textAlign: 'center', padding: '1.4rem' }}>
        <div style={{ width: '80px', height: '2.5px', background: 'linear-gradient(90deg, transparent, #6366F1, transparent)', margin: '0 auto 1.2rem' }} />
        <div style={{ fontSize: '0.85rem', color: '#6366F1', letterSpacing: '0.3em', fontWeight: 600, fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>RUNTIME SOLUTIONS PVT. LTD.</div>
        <div style={{ width: '50px', height: '1.5px', background: '#6366F130', margin: '0 auto' }} />
      </div>
    );
  }
  return null;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   INTERACTIVE TIMELINE — INTERNSHIP CARDS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function InteractiveTimeline() {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    { label: 'MONTHS 1–3', title: 'Web Developer Intern', color: '#6366F1', items: ['Learned real-world workflows', 'Understood systems & debugging', 'Built foundation in development'] },
    { label: 'MONTHS 4–6', title: 'Growth Phase', color: '#10B981', items: ['Internship extended based on performance', 'Transitioned into QA & Testing', 'Contributed actively across projects'] },
    { label: 'POST INTERNSHIP', title: 'Assistant Project Manager', color: '#8B5CF6', items: ['Promoted based on performance', 'Started handling client communication', 'Took ownership of project delivery'] },
    { label: 'TODAY', title: 'Project Manager', color: '#F59E0B', items: ['Leading projects & teams', 'Driving delivery and outcomes', 'Taking decisions with ownership'] },
  ];
  const handleClick = useCallback(() => {
    setActiveCard(prev => (prev < cards.length - 1 ? prev + 1 : 0));
  }, [cards.length]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem', pointerEvents: 'auto' }}>
      {/* Cards row */}
      <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'center', justifyContent: 'center' }}>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            onClick={activeCard === i ? handleClick : () => setActiveCard(i)}
            layout
            animate={{
              scale: activeCard === i ? 1.12 : 0.78,
              opacity: activeCard === i ? 1 : 0.35,
              y: activeCard === i ? -10 : 0,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
            className={`glass-card ${activeCard === i ? (i === 3 ? 'today-card-glow' : 'timeline-card-active') : ''}`}
            style={{
              padding: '1.4rem 1.6rem',
              width: '240px',
              cursor: 'pointer',
              borderColor: activeCard === i ? `${card.color}60` : 'rgba(99,102,241,0.06)',
              boxShadow: activeCard === i ? `0 0 40px ${card.color}35, 0 0 75px ${card.color}15, 0 10px 40px rgba(0,0,0,0.35)` : 'none',
              filter: activeCard !== i ? 'blur(1px)' : 'none',
            }}
          >
            <div style={{ fontSize: '1.02rem', color: card.color, fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{card.label}</div>
            <div style={{ fontSize: '1.25rem', color: '#e8ecf4', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', lineHeight: 1.3 }}>{card.title}</div>
            <div style={{ fontSize: '0.92rem', color: '#a0aec0', lineHeight: 1.7 }}>
              {card.items.map((item, j) => <div key={j}>• {item}</div>)}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Hint */}
      <div style={{ fontSize: '0.82rem', color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>Click active card to progress →</div>
      {/* Punchline — always centered */}
      <div className="punchline-text" style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#A5B4FC', letterSpacing: '0.04em' }}>
        Rapid growth from Intern → Project Manager within 1 year
      </div>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN TIMELINE COMPONENT
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgFarRef = useRef<HTMLDivElement>(null);
  const bgMidRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const stars = useMemo(() => {
    if (!mounted) return [];
    const s: Array<{ id: number; x: number; y: number; size: number; dur: number }> = [];
    let seed = 42;
    for (let i = 0; i < 70; i++) {
      seed = (seed * 16807) % 2147483647; const x = (seed % 10000) / 100;
      seed = (seed * 16807) % 2147483647; const y = (seed % 5000) / 100;
      seed = (seed * 16807) % 2147483647; const size = 0.5 + (seed % 250) / 100;
      seed = (seed * 16807) % 2147483647; const dur = 2 + (seed % 400) / 100;
      s.push({ id: i, x, y, size, dur });
    }
    return s;
  }, [mounted]);

  const particles = useMemo(() => {
    if (!mounted) return [];
    const p: Array<{ id: number; x: number; y: number; size: number; dur: number }> = [];
    let seed = 123;
    for (let i = 0; i < 80; i++) {
      seed = (seed * 16807) % 2147483647; const x = (seed % TRACK_TOTAL);
      seed = (seed * 16807) % 2147483647; const y = 45 + (seed % 40);
      seed = (seed * 16807) % 2147483647; const size = 1 + (seed % 300) / 100;
      seed = (seed * 16807) % 2147483647; const dur = 3 + (seed % 500) / 100;
      p.push({ id: i, x, y, size, dur });
    }
    return p;
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !containerRef.current || !panelRef.current || !trackRef.current) return;
    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const maxX = TRACK_TOTAL - vw;
      const charTrackOffset = vw * CHAR_POS;
      gsap.to(trackRef.current, {
        x: -maxX, ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current, start: 'top top', end: 'bottom bottom',
          scrub: 1.2, pin: panelRef.current, pinSpacing: false,
          onUpdate: (self) => {
            const p = self.progress;
            if (bgFarRef.current) bgFarRef.current.style.transform = `translateX(${-p * maxX * 0.15}px)`;
            if (bgMidRef.current) bgMidRef.current.style.transform = `translateX(${-p * maxX * 0.35}px)`;
            if (progressFillRef.current) progressFillRef.current.style.width = `${p * 100}%`;
            if (progressDotRef.current) progressDotRef.current.style.left = `${p * 100}%`;
            const charWorldX = p * maxX + charTrackOffset;
            let evo = 0.08; let nearest = 0; let nearestDist = Infinity;
            for (let i = 0; i < milestones.length; i++) {
              if (charWorldX >= milestones[i].x) evo = milestones[i].evolution;
              const d = Math.abs(charWorldX - milestones[i].x);
              if (d < nearestDist) { nearestDist = d; nearest = i; }
            }
            if (activeIdxRef.current !== nearest) { activeIdxRef.current = nearest; setActiveIdx(nearest); }
            if (charRef.current) { const scale = 0.7 + evo * 0.4; charRef.current.style.transform = `translateX(-50%) scale(${scale})`; }
          },
        },
      });
    });
    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return <div style={{ height: '1200vh' }} />;

  const m = milestones[activeIdx];
  const isFinal = m.id === 'final';

  return (
    <div ref={containerRef} style={{ height: '1200vh', position: 'relative' }}>
      <div ref={panelRef} className="journey-viewport">
        {/* Noise overlay */}
        <div className="noise-overlay" />
        {/* Stars */}
        <div className="journey-stars">
          {stars.map(s => (<div key={s.id} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, animationDuration: `${s.dur}s` }} />))}
        </div>
        {/* Gradient wave layers for depth */}
        <div className="gradient-wave gradient-wave-1" />
        <div className="gradient-wave gradient-wave-2" />
        {/* Far parallax */}
        <div ref={bgFarRef} className="journey-bg-far" style={{ willChange: 'transform' }}>
          <svg viewBox="0 0 6000 220" preserveAspectRatio="none" style={{ width: '6000px', height: '220px', position: 'absolute', bottom: '18%', left: 0 }}>
            <path d="M0 220 L0 150 Q300 85 600 130 Q900 60 1200 110 Q1500 45 1800 95 Q2100 55 2400 85 Q2700 35 3000 110 Q3300 65 3600 95 Q3900 45 4200 115 Q4500 75 4800 90 Q5100 55 5400 105 L6000 130 L6000 220Z" fill="#0A0820" opacity="0.6" />
          </svg>
        </div>
        {/* Mid parallax - faint city silhouettes */}
        <div ref={bgMidRef} className="journey-bg-mid" style={{ willChange: 'transform' }}>
          <svg viewBox="0 0 8000 200" preserveAspectRatio="none" style={{ width: '8000px', height: '200px', position: 'absolute', bottom: '10%', left: 0 }}>
            {Array.from({ length: 45 }).map((_, i) => {
              const x = i * 178; const h = 20 + ((i * 37 + 13) % 100); const w = 20 + ((i * 23 + 7) % 50);
              return <rect key={i} x={x} y={200 - h} width={w} height={h} rx="2" fill="#0F0D2E" opacity={0.25 + ((i * 13) % 3) * 0.12} />;
            })}
          </svg>
        </div>
        {/* Track */}
        <div ref={trackRef} className="journey-track" style={{ width: `${TRACK_TOTAL}px`, willChange: 'transform' }}>
          <div className="journey-ground">
            <svg viewBox={`0 0 ${TRACK_TOTAL} 50`} preserveAspectRatio="none" style={{ width: `${TRACK_TOTAL}px`, height: '50px' }}>
              <rect x="0" y="8" width={TRACK_TOTAL} height="42" fill="#080618" />
              <line x1="0" y1="8" x2={TRACK_TOTAL} y2="8" stroke="#6366F1" strokeWidth="2.5" opacity="0.3" />
              <line x1="0" y1="8" x2={TRACK_TOTAL} y2="8" stroke="#818CF8" strokeWidth="1.5" opacity="0.1" />
              {/* Glow effect on the timeline rail */}
              <line x1="0" y1="8" x2={TRACK_TOTAL} y2="8" stroke="#6366F1" strokeWidth="6" opacity="0.06" />
              {Array.from({ length: Math.floor(TRACK_TOTAL / 70) }).map((_, i) => (
                <rect key={i} x={i * 70 + 8} y="28" width="35" height="2" rx="1" fill="#312E81" opacity="0.12" />
              ))}
            </svg>
          </div>
          {particles.map(p => (<div key={p.id} className="track-particle" style={{ left: p.x, top: `${p.y}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s` }} />))}
          {milestones.map((ms, i) => (
            <div key={ms.id} className={`milestone ${activeIdx === i ? 'milestone-active' : ''}`} style={{ left: ms.x }}>
              <div className="milestone-visual"><MilestoneVisual type={ms.visual} /></div>
              <div className="milestone-line" />
              <div className={`milestone-dot ${activeIdx === i ? 'active' : activeIdx > i ? 'passed' : ''}`} />
              {ms.label && <div className="milestone-label">{ms.label}</div>}
            </div>
          ))}
        </div>
        {/* Character */}
        <div ref={charRef} className="journey-character" style={{ left: `${CHAR_POS * 100}%` }}>
          <div className="character-walk-wrapper">
            <JourneyCharacter evolution={milestones[activeIdx]?.evolution ?? 0.08} />
          </div>
          <div className="character-ground-glow" />
          {/* Welcome message */}
          {activeIdx === 0 && (
            <motion.div
              className="character-welcome-bubble"
              initial={{ opacity: 0, y: 15, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#A5B4FC', marginBottom: '0.5rem', textShadow: '0 0 24px rgba(165,180,252,0.35)', letterSpacing: '0.02em' }}>Welcome, Runtimers.</div>
              <div style={{ fontSize: '1.2rem', color: '#CBD5E1', lineHeight: 1.6, fontWeight: 500 }}>This is my journey — from learning to leading.</div>
              <div className="welcome-bubble-arrow" />
            </motion.div>
          )}
        </div>
        {/* Text overlay */}
        <div className={`journey-text-overlay ${isFinal ? 'final-overlay' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div key={m.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}>
              <h2 className={`journey-heading ${isFinal ? 'final-heading' : ''}`}>{m.heading}</h2>
              {m.desc && <p className={`journey-desc ${isFinal ? 'final-desc' : ''}`}>{m.desc.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Progress bar with moving dot */}
        <div className="journey-progress-bar">
          <div ref={progressFillRef} className="journey-progress-fill" />
          <div ref={progressDotRef} className="journey-progress-moving-dot" />
          {milestones.map((ms, i) => (
            <div key={ms.id} className={`journey-progress-dot ${activeIdx === i ? 'active' : activeIdx > i ? 'passed' : ''}`} style={{ left: `${(ms.x / TRACK_TOTAL) * 100}%` }} title={ms.label} />
          ))}
        </div>
        {/* Active milestone label below progress bar */}
        <div className="journey-progress-label">
          <AnimatePresence mode="wait">
            <motion.span key={m.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3 }}>
              {m.label.toUpperCase()}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* Scroll hint */}
        {activeIdx === 0 && (
          <motion.div className="journey-scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="22" height="36" viewBox="0 0 22 36"><rect x="1" y="1" width="20" height="34" rx="10" stroke="#6366F1" strokeWidth="1.5" fill="none" opacity="0.35" /><circle cx="11" cy="9" r="2.5" fill="#6366F1" opacity="0.5"><animate attributeName="cy" values="9;25;9" dur="2s" repeatCount="indefinite" /></circle></svg>
              <span>Scroll to begin</span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
