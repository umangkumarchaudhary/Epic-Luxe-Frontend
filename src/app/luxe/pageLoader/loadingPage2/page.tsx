'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Car, Zap, Atom, Settings, Star } from 'lucide-react';

/**
 * QuantumMolecularForgeLoader
 * AAA-level 3D animated loader for luxury car inventory experience.
 */
const QuantumMolecularForgeLoader = () => {
  // Major quantum phases for car assembly
  const phases = [
    { key: 'chassis', label: 'Chassis Synthesis', color: '#9edbff' },
    { key: 'engine', label: 'Quantum Engine Integration', color: '#84ffa8' },
    { key: 'body', label: 'Body Matrix Formation', color: '#ffd700' },
    { key: 'luxury', label: 'Luxury Features Infusion', color: '#d4af37' },
    { key: 'energize', label: 'Energize Complete', color: '#d4af37' },
  ];
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0...100
  const [tick, setTick] = useState(0); // For reactivity-driven effects
  // For accessibility
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Quantum assembly staged progress
  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          // Progressive phases
          if (prev < 25) setPhaseIndex(0);
          else if (prev < 50) setPhaseIndex(1);
          else if (prev < 75) setPhaseIndex(2);
          else if (prev < 90) setPhaseIndex(3);
          else setPhaseIndex(4);
          return prev + 1;
        }
        return prev;
      });
      setTick(t => t + 1);
    }, prefersReducedMotion.current ? 80 : 36);
    return () => clearInterval(interval);
  }, [progress]);

  // Memoize quantum particle field
  const particles = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        baseX: Math.cos((i / 45) * Math.PI * 2) * (80 + Math.random() * 30),
        baseY: Math.sin((i / 45) * Math.PI * 2) * (60 + Math.random() * 45),
        z: Math.random() * 130 - 65,
        size: 2.6 + Math.random() * 2.3,
        phase: Math.random() * Math.PI * 2,
        color: i % 4 === 0 ? '#d4af37' : i % 4 === 1 ? '#00F0FF' : i % 4 === 2 ? '#D0F0B0' : '#FFF6A0'
      })),
    []
  );

  // For counter-rotating rings
  const rings = [
    { radius: 105, speed: -0.42, width: 2.2, color: 'rgba(212,175,55,0.4)' },
    { radius: 78, speed: 0.77, width: 2.5, color: '#ffd700b5' },
    { radius: 65, speed: -1.1, width: 1.8, color: '#9edbffb4' },
  ];

  // For DNA helix
  const helix = Array.from({ length: 20 });
  const baseColors = ['#d4af37', '#00F0FF', '#ffd700', '#84ffa8'];

  // Build assembly layers for progressive disclosure
  const RevealChassis = phaseIndex >= 0;
  const RevealEngine = phaseIndex >= 1;
  const RevealBody = phaseIndex >= 2;
  const RevealLuxury = phaseIndex >= 3;
  const RevealFinalize = phaseIndex === 4 && progress >= 99;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#14121b] via-[#1f2229] to-[#1a111f] text-white select-none"
      style={{
        fontFamily: "'Manrope', 'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* Quantum Particle Field */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map(p => {
          const particleTime =
            tick * 0.19 +
            p.phase +
            (Math.sin((tick + p.id * 13.1) * 0.007) * 1.12);
          // 3D hack: scale and blur by z
          const px =
            50 +
            p.baseX * Math.cos(particleTime * 0.47) +
            Math.cos(particleTime * 0.31 + p.id) * 10;
          const py =
            50 +
            p.baseY * Math.sin(particleTime * 0.38) +
            Math.sin(particleTime * 0.5 + p.id * 0.6) * 12 -
            p.z * 0.08;
          const scale = 1 + p.z * 0.004;
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `calc(${px}% - ${p.size * scale}px)`,
                top: `calc(${py}% - ${p.size * scale}px)`,
                width: p.size * scale * 1.7,
                height: p.size * scale * 1.7,
                opacity:
                  0.42 +
                  Math.abs(Math.sin(tick * 0.02 + p.id * 2)) * 0.19,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 40% 55%, ' +
                  p.color +
                  ', transparent 100%)',
                filter: 'blur(1.3px)',
                zIndex: 1,
              }}
              aria-hidden
            />
          );
        })}
      </div>

      {/* Quantum Multi-Ring Assembly Chamber */}
      <div className="relative z-10 w-[440px] max-w-[96vw] aspect-square mx-auto flex items-center justify-center">
        {/* Counter-rotating rings */}
        {rings.map((ring, i) => (
          <svg
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              zIndex: 2,
              transform: `translate(-50%, -50%) rotate(${
                (tick * ring.speed * (prefersReducedMotion.current ? 0.2 : 1))
              }deg)`,
              filter: 'blur(0.5px)',
              pointerEvents: 'none',
            }}
            width={ring.radius * 2}
            height={ring.radius * 2}
          >
            <ellipse
              cx={ring.radius}
              cy={ring.radius}
              rx={ring.radius * 0.98}
              ry={ring.radius * (0.72 + 0.1 * Math.sin(tick * 0.014 + i))}
              stroke={ring.color}
              strokeWidth={ring.width}
              fill="none"
              strokeDasharray="8 9"
              style={{ opacity: 0.74 }}
            />
          </svg>
        ))}

        {/* Central 3D DNA Helix */}
        <div
          className="absolute w-[164px] h-[350px] left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -52%) rotateY(23deg)',
            perspective: '1700px',
            zIndex: 6,
          }}
          aria-label="DNA Helix Loader"
        >
          {/* Helix rungs */}
          {helix.map((_, i) => {
            const t = (i / helix.length) * Math.PI * 4 + tick * 0.048;
            const y = 160 * Math.cos(t) + 175;
            const rot = t * 17 + Math.sin(tick * 0.048 + i * 0.52) * 4.2;
            const X =
              Math.sin(t) * 48 +
              Math.cos(tick * 0.028 + i * 1.7) * 9.4;
            const size = 20 +
              Math.abs(Math.sin(t + tick * 0.0125 + i)) * 20;
            const baseCol = baseColors[i % baseColors.length];
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${X}px - ${size / 2}px)`,
                  top: `${y}px`,
                  width: size,
                  height: size * 0.82,
                  borderRadius: '50%',
                  boxShadow: `0 0 22px 3px ${baseCol}80`,
                  background: `radial-gradient(circle at 60% 30%, ${baseCol}, #2e243a 70%)`,
                  opacity: 0.86,
                  filter:
                    'blur(0.1px) brightness(1.1) saturate(1.3)',
                  transform: `rotateY(${rot}deg) scale(${
                    0.7 + 0.45 * Math.abs(Math.sin(t))
                  })`,
                  zIndex: 7 + i,
                }}
                aria-hidden
              />
            );
          })}
          {/* Helix Lines */}
          {helix.map((_, i) => {
            if (i === 0) return null;
            const t1 = ((i - 1) / helix.length) * Math.PI * 4 + tick * 0.048;
            const t2 = (i / helix.length) * Math.PI * 4 + tick * 0.048;
            const Y1 = 160 * Math.cos(t1) + 175;
            const Y2 = 160 * Math.cos(t2) + 175;
            const X1 = Math.sin(t1) * 48;
            // const X2 = Math.sin(t2) * 48; // Currently unused
            return (
              <div
                key={'line-' + i}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${X1}px)`,
                  top: `${Y1}px`,
                  width: 3,
                  height: Math.abs(Y2 - Y1) + 8,
                  background: i % 2 === 0
                    ? 'linear-gradient(to bottom,#ffd700 70%,#d4af37)'
                    : 'linear-gradient(to bottom,#00F0FF 60%,#BFA980)',
                  borderRadius: 2,
                  opacity: 0.35,
                  boxShadow: '0 0 7px 1px #ffd70096'
                }}
                aria-hidden
              />
            );
          })}
        </div>

        {/* Quantum Assembly Chamber - Car assembling */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%) scale(1.21)',
            zIndex: 11,
          }}
        >
          {/* Chassis */}
          {RevealChassis && (
            <svg width={66} height={36}>
              <rect
                x={7}
                y={16}
                width={52}
                height={12}
                rx={6}
                fill="#bde1ec"
                opacity={progress < 20 ? 0.66 : 0.08}
                filter="url(#shadowChassis)"
              />
            </svg>
          )}
          {/* Engine block */}
          {RevealEngine && (
            <svg width={40} height={24} style={{ position: 'absolute', left: 13, top: 7 }}>
              <rect
                x={0}
                y={0}
                width={40}
                height={24}
                rx={7}
                fill="#84ffa8"
                opacity={progress < 40 ? 0.8 : 0.08}
                filter="url(#shadowEngine)"
              />
              <Zap
                style={{
                  position: 'absolute',
                  left: 14,
                  top: 4,
                  color: '#ffd700',
                  opacity: progress > 29 && progress < 59 ? 0.8 : 0.06,
                }}
                className="w-6 h-6"
              />
            </svg>
          )}
          {/* Car body */}
          {RevealBody && (
            <Car
              className="w-20 h-20 absolute left-[3px] top-[-22px]"
              style={{
                filter: `drop-shadow(0 3px 13px #d4af3736) blur(0.2px)`,
                color: '#ffd700',
                opacity: progress < 70 ? 0.9 : 0.41,
              }}
            />
          )}
          {/* Luxury Features */}
          {RevealLuxury && (
            <Star
              className="w-11 h-11 absolute left-[24px] top-[-16px] text-[#d4af37]"
              style={{
                filter: `drop-shadow(0 0 9px #ffd700ac) blur(0.03px)`,
                color: '#ffd700',
                opacity: progress < 89 ? 0.67 : 0.18,
              }}
            />
          )}
          {/* Final Lightning Discharge */}
          {RevealFinalize && (
            <Zap
              className="w-16 h-16 absolute left-2 top-[-37px] text-[#ffd700]"
              style={{
                opacity: 0.42 + Math.abs(Math.sin(tick * 0.11)) * 0.5
              }}
            />
          )}
        </div>

        {/* Energy Discharge Lightning Bolts (foreground) */}
        {RevealLuxury && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${31 + i * 20}%`,
                  top: `${48 + Math.sin(tick * 0.26 + i) * 16}px`,
                  width: 13,
                  height: 46,
                  transform: `rotate(${Math.sin(tick * 0.11 + i) * 19}deg) scaleY(${1 +
                    Math.sin(tick * 0.07 + i) * 0.5})`,
                  opacity: 0.21 + Math.abs(Math.sin(tick * 0.52 + i)) * 0.6,
                  filter: 'blur(0.7px) drop-shadow(0 0 20px #ffd70093)',
                }}
              >
                <Zap className="w-full h-full text-[#d4af37]" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quantum Control Interface */}
      <div className="z-20 absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center w-full max-w-xl pb-12">
        {/* Rotating logo and science icon */}
        <div className="relative flex items-center mb-5">
          <div
            className="mr-3"
            style={{
              animation: 'scientificSpin 2.7s linear infinite',
              filter: 'drop-shadow(0 0 15px #d4af378a)',
            }}
          >
            <Atom className="w-14 h-14 text-[#d4af37]" />
          </div>
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight"
                style={{
                  fontFamily: "'Manrope', 'Segoe UI', Arial, sans-serif",
                  letterSpacing: '0.05em',
                  color: '#ffd700'
                }}>
            QUANTUM MOLECULAR FORGE
          </span>
        </div>
        {/* Phase indicators with progressive disclosure */}
        <div className="flex flex-row items-center justify-center gap-2">
          {phases.map((p, i) => (
            <div
              key={p.key}
              className="flex items-center gap-1 px-2 py-1 rounded-xl"
              style={{
                background:
                  i === phaseIndex
                    ? `linear-gradient(90deg,${p.color},#fffbe7 80%)`
                    : 'rgba(255,255,255,0.07)',
                color: i === phaseIndex ? '#32302a' : '#bfa980',
                fontWeight: i === phaseIndex ? 800 : 600,
                fontSize: i === phaseIndex ? 18 : 14,
                opacity: progress >= i * 25 ? 1 : 0.29,
                boxShadow:
                  i === phaseIndex
                    ? '0 2px 10px #fffbe7c9'
                    : undefined,
                transition: 'all 0.31s cubic-bezier(0.44,0,0.3,1)',
              }}
            >
              <span className="hidden md:inline mr-1">
                {i === phaseIndex && <Settings className="inline-block w-5 h-5 text-[#d4af37] mr-1" />}
              </span>
              {p.label}
            </div>
          ))}
        </div>
        {/* Scientific quantum info */}
        <div className="text-center mt-4 mb-2 text-[#bfa980] font-mono text-sm tracking-wide font-semibold">
          <span>
            STATUS:&nbsp;
            <span className="text-[#ffd700] font-bold">{phases[phaseIndex].label.toUpperCase()}</span>
          </span>
          &nbsp;|&nbsp;
          <span>
            MOLECULAR STAGE:&nbsp;
            <span className="text-[#00F0FF]">{phaseIndex + 1}</span> / {phases.length}
          </span>
        </div>
        {/* Progress ring */}
        <div className="w-full max-w-xl pt-2 pb-2 flex flex-col items-center">
          <div className="relative w-56 h-9">
            <div className="absolute left-0 top-0 h-9 w-full bg-gradient-to-r from-[#ffd70022] via-[#bfa98011] to-[#d4af37]/10 rounded-full" />
            {/* Segmented ring */}
            <div className="absolute left-0 top-0 h-9 w-full flex flex-row items-center gap-1 z-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="h-7 w-4 rounded-full mx-0.5"
                  style={{
                    background:
                      progress / 5 >= i
                        ? `linear-gradient(90deg,${phases[phaseIndex].color},#ffd70098 50%,#bfa980 100%)`
                        : 'rgba(255,255,255,0.1)',
                    opacity:
                      progress / 5 > i - 1
                        ? 0.95
                        : 0.17,
                    boxShadow:
                      progress / 5 > i - 1
                        ? '0 0 7px 2px #d4af37cc'
                        : undefined,
                    transition: 'all 0.22s cubic-bezier(0.54,0,0.44,1)',
                  }}
                />
              ))}
            </div>
            {/* Sweep shine */}
            <div
              className="absolute left-0 top-0 h-9 w-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(120deg, transparent 67%, #fffbe7bb 80%, transparent 93%)',
                opacity: 0.22 + Math.abs(Math.sin(tick * 0.023)) * 0.3,
                filter: 'blur(6px)',
              }}
            />
            {/* Progress text */}
            <span className="absolute left-1/2 -translate-x-1/2 top-[5px] text-[#d4af37] font-extrabold text-lg" style={{ letterSpacing: '1.5px' }}>
              {progress}% Molecular Integrity
            </span>
          </div>
        </div>
      </div>
      {/* Custom CSS for true 3D, GPU transforms, lighting */}
      <style jsx>{`
        @keyframes scientificSpin {
          to { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default QuantumMolecularForgeLoader;
