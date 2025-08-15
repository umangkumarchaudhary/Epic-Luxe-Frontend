'use client';

import React, { useState, useEffect, useMemo } from 'react';

const CAR_COLORS = [
  '#d4af37', '#393939', '#7afaff', '#e457a1', '#8146dc', '#ea6300', '#92dd52',
  '#0088cc', '#ff595a', '#f1c40f',
];

const GRID_LANES = 8;

// Returns engines rev sound effect (optional for audio feedback)
// function playEngineRev() { /* ... */ }

const F1GrandPrixLoader = () => {
  const [progress, setProgress] = useState(0);   // Range 0-100
  const [lightsOn, setLightsOn] = useState(0);   // Number of red lights shown (0-5)
  const [racePhase, setRacePhase] = useState<'PREP'|'COUNTDOWN'|'GO'|'COMPLETE'>('PREP');
  const [tick, setTick] = useState(0);

  // Camera sweep effect
  const [cameraAngle, setCameraAngle] = useState(0);

  // For responsive fireworks and particles
  const fireworks = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 80,
        hue: 190 + Math.random() * 180,
        delay: Math.random() * 3,
      })),
    []
  );

  useEffect(() => {
    // Progress increments
    if (progress < 100) {
      const loader = setInterval(() => {
        setProgress((p) => {
          if (p < 100) return p + 1;
          return 100;
        });
        setTick((t) => t + 1);
      }, 36);
      return () => clearInterval(loader);
    }
  }, [progress]);

  // Red-to-green light sequence tracking loader progress
  useEffect(() => {
    if (progress < 100) {
      const newLights = Math.min(5, Math.ceil(progress / 20));
      setLightsOn(newLights);
      setRacePhase('COUNTDOWN');
    } else if (progress === 100) {
      setTimeout(() => setRacePhase('GO'), 700);
      setTimeout(() => setRacePhase('COMPLETE'), 2000);
      setLightsOn(0);
    }
  }, [progress]);

  // Animate camera sweep (0deg -> 35deg and back, then straight)
  useEffect(() => {
    const cameraMax = 40;
    const camInt = setInterval(() => {
      setCameraAngle((c) => (racePhase === 'GO' ? Math.max(0, c - 2) : Math.min(c + 1, cameraMax)));
    }, 24);
    return () => clearInterval(camInt);
  }, [racePhase]);

  // Car grid, top car is the hero (user's car)
  const cars = useMemo(
    () =>
      Array.from({ length: GRID_LANES }, (_, lane) => ({
        id: lane,
        color: lane === 0 ? '#d4af37' : CAR_COLORS[(lane + 1) % CAR_COLORS.length],
        carNum: lane + 1,
        team: lane === 0 ? 'EPIC LUXE' : `TEAM #${lane + 1}`,
        position: lane + 1,
      })),
    []
  );

  // Trigger: particle fireworks and confetti spray on racePhase === 'GO'
  const showFireworks = racePhase === 'GO' || racePhase === 'COMPLETE';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#242834] via-[#151826] to-[#1a1418] text-white font-manrope select-none">
      {/* Grandstand lights, racing spotlights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-0 right-0 top-0 mx-auto w-full h-20 flex items-center justify-center opacity-60 gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-full h-3 w-36 mx-2"
              style={{
                background: `linear-gradient(90deg, ${
                  i % 2
                    ? '#7afaff80, #bfa98080'
                    : '#f1c40f80, #e457a143'
                })`,
                filter: `blur(6px) brightness(${0.7 + Math.sin(tick * 0.025 + i) * 0.4})`,
                opacity: 0.95,
              }}
            />
          ))}
        </div>
      </div>

      {/* Track and Start Line */}
      <div
        className="absolute left-0 right-0 mx-auto flex items-end justify-center"
        style={{
          bottom: '8vh',
          width: '92vw',
          height: '72vh',
          zIndex: 10,
          perspective: '1300px',
        }}
      >
        {/* F1 Track */}
        <div
          style={{
            position: 'absolute',
            width: '90vw',
            minWidth: 340,
            maxWidth: 840,
            height: '70vh',
            background:
              'linear-gradient(180deg, #2f3540 38%, #393939 91%)',
            borderRadius: 60,
            boxShadow: '0 18px 64px #000, 0 3px 20px #f1c40f66',
            opacity: 0.85,
            border: '7px solid #23272e',
            overflow: 'hidden',
            left: '4vw',
            right: '4vw',
          }}
        >
          {/* Lane lines */}
          {[...Array(GRID_LANES + 1)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(i * 100) / GRID_LANES}%`,
                top: 0,
                bottom: 0,
                borderLeft: '2px dashed #f1c40f44',
                opacity: 0.28,
                zIndex: 2,
              }}
            />
          ))}
          {/* Segmented chequered start line */}
          <div
            style={{
              position: 'absolute',
              top: 70,
              left: 0,
              width: '100%',
              height: 16,
              background:
                'repeating-linear-gradient(90deg,#fff 0 19px,#23272e 19px 38px)',
              opacity: 0.93,
            }}
          />
        </div>

        {/* F1 Cars on the grid */}
        <div
          className="absolute left-0 right-0 mx-auto"
          style={{
            top: 46,
            width: '100%',
            maxWidth: 820,
            height: '63vh',
            pointerEvents: 'none',
            zIndex: 21,
            perspective: '1200px',
            transition: 'transform 0.8s cubic-bezier(.4,0,.35,1.1)',
            transform: `rotateX(${30 + cameraAngle / 3}deg) rotateY(${
              racePhase === 'GO'
                ? Math.sin(tick * 0.015) * 2
                : cameraAngle
            }deg)`,
          }}
        >
          {cars.map((car, grid) => {
            const baseY = 36 + grid * (45 - Math.min(tick, 38) * 0.52); // Animate approach
            // Animate hero car moving forward “off the line”
            const heroExtra =
              grid === 0 && racePhase === 'GO'
                ? Math.min(120, (progress - 98) * 5 + tick * 1.8)
                : 0;
            return (
              <div
                key={car.id}
                style={{
                  position: 'absolute',
                  left: `min(calc(${(car.id + 0.7) * (100 / (GRID_LANES + 0.5))}% - 38px), 87vw)`,
                  top: `${baseY - heroExtra}px`,
                  width: 72,
                  height: 44,
                  zIndex: 200 - grid * 2,
                }}
              >
                <div
                  className={`relative transition-all duration-700 ${grid === 0 ? 'scale-[1.18]' : "opacity-70"}`}
                >
                  {/* F1 Car body - colored */}
                  <svg
                    width={75}
                    height={30}
                    viewBox="0 0 75 30"
                    fill="none"
                    style={{
                      filter:
                        grid === 0
                          ? 'drop-shadow(0 0 18px #d4af3777) brightness(1.15)'
                          : 'drop-shadow(0 0 7px #191920)',
                      transition: 'filter 0.5s',
                    }}
                  >
                    {/* Car base */}
                    <rect
                      x={10}
                      y={10}
                      width={51}
                      height={10}
                      rx={3}
                      fill={car.color}
                      stroke="#fff"
                      strokeWidth={grid === 0 ? 2.6 : 1.2}
                      opacity={1}
                    />
                    {/* Front and rear wings */}
                    <rect x={7} y={12.6} width={6} height={4.6} fill="#393939" rx={1.5} />
                    <rect x={62} y={12.6} width={6} height={4.6} fill="#23272e" rx={1.5} />
                    {/* Cockpit */}
                    <ellipse
                      cx={44}
                      cy={14.8}
                      rx={6.5}
                      ry={4.8}
                      fill="#fffbe7"
                      opacity={grid === 0 ? 0.57 : 0.21}
                    />
                    {/* Hero car highlight */}
                    {grid === 0 && (
                      <ellipse
                        cx={35}
                        cy={15}
                        rx={18}
                        ry={7 + Math.sin(tick * 0.15 + grid) * 3.2}
                        fill="#ffd70055"
                        opacity={0.48}
                        filter="blur(5px)"
                      />
                    )}
                    {/* Wheels */}
                    <circle cx={17} cy={23.6} r={4.2} fill="#23272e" /><circle cx={58.1} cy={23.6} r={4.2} fill="#23272e" />
                    {/* Wheel neon color trails */}
                    <ellipse
                      cx={17}
                      cy={23.6}
                      rx={6}
                      ry={2}
                      fill={
                        racePhase === 'GO'
                          ? `url(#trailcolor${grid})`
                          : '#bfa98077'
                      }
                      opacity={0.8}
                      filter="blur(4.2px)"
                    />
                    <ellipse
                      cx={58}
                      cy={23.6}
                      rx={6}
                      ry={2}
                      fill={
                        racePhase === 'GO'
                          ? `url(#trailcolor${(grid + 4) % 5})`
                          : '#bfa98077'
                      }
                      opacity={0.8}
                      filter="blur(4.2px)"
                    />
                    <defs>
                      {[0,1,2,3,4].map((n)=>
                        <linearGradient key={n} id={`trailcolor${n}`} x1="0" x2="12" y1="0" y2="0">
                          <stop stopColor={["#ff0078","#18faff","#ffd700","#393939","#e457a1"][n]}/>
                          <stop offset="1" stopColor={["#ff9200","#004ef9","#bfa980","#8146dc","#14e69c"][n]}/>
                        </linearGradient>
                      )}
                    </defs>
                  </svg>
                  {/* Car number */}
                  <span
                    className="absolute left-[12px] top-[13px] text-[8.5px] font-bold"
                    style={{
                      color: car.color === '#d4af37' ? '#23272e' : '#ffd700',
                      textShadow: car.color === '#d4af37'
                        ? '1px 1px 7px #fffbe7'
                        : '1px 0px 2px #000',
                      letterSpacing: '0.7px',
                    }}
                  >
                    {car.carNum}
                  </span>
                  {/* Turbo effect for hero car */}
                  {grid === 0 && racePhase === 'GO' && (
                    <div
                      className="absolute left-[-16px] top-6 w-8 h-7 rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle at 70% 60%,#ff007750 0%,#ffd70000 85%)',
                        filter: 'blur(2.5px)'
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HUD, Progress Bar & Controls Overlay */}
      <div className="z-40 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between pointer-events-none">
        {/* Countdown Start Lights / “GO” Banner */}
        <div className="flex flex-col items-center mt-12 select-none">
          {/* Lights Row */}
          <div className="flex flex-row gap-5 mb-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-full h-7 w-7 border-2 border-[#3b3b3b] mx-1"
                style={{
                  background:
                    lightsOn > i
                      ? '#ff1c19'
                      : racePhase === 'GO'
                        ? '#41ff2e'
                        : '#1a1a1a',
                  boxShadow:
                    lightsOn > i
                      ? '0 0 22px 2px #ff1c1975'
                      : racePhase === 'GO'
                        ? '0 2px 14px #41ff2e66'
                        : undefined,
                  transition: 'background 0.22s, box-shadow .21s',
                }}
              />
            ))}
          </div>
          {racePhase === 'GO' && (
            <div className="mt-3 text-5xl md:text-7xl font-bold uppercase text-[#41ff2e] drop-shadow-xl tracking-widest font-mono animate-pulse">
              GO!
            </div>
          )}
          {racePhase === 'COMPLETE' && (
            <div className="mt-3 mb-1 text-4xl md:text-6xl font-bold uppercase text-[#ffd700] drop-shadow-xl tracking-widest font-playfair animate-bounce">
              Welcome to Epic Luxe
            </div>
          )}
        </div>

        {/* Race dashboard HUD */}
        <div className="w-full px-3 flex flex-row items-center justify-between mt-4 z-30">
          {/* F1 HUD Left */}
          <div className="font-mono flex flex-col gap-2 items-start bg-gradient-to-br from-[#18191d]/80 to-[#242834]/60 px-8 py-4 rounded-3xl border-[1.7px] border-[#ffd70044] backdrop-blur-sm shadow-lg">
            <div className="tracking-wide text-[#ffd700] text-[18px] font-bold">
              EPIC LUXE RACEDAY
            </div>
            <div className="flex items-center text-[12.5px] gap-5 text-[#bfa980] font-bold">
              <span>
                Lap: <span className="text-[#ffd700]">1 / 1</span>
              </span>
              <span>
                Car: <span className="text-[#ff0078]">#1</span>
              </span>
              <span>
                Turbo: <span className="text-[#41ff2e]">{progress < 100 ? 'ARMED' : 'USED'}</span>
              </span>
            </div>
          </div>
          {/* F1 HUD Center */}
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-3xl text-[#ffd700] drop-shadow">PREMIUM GRID LAUNCH</div>
            <div className="tracking-wide text-[#7afaff] text-sm mt-1">Your luxury journey blast-off</div>
          </div>
          {/* F1 HUD Right */}
          <div className="font-mono flex flex-col gap-2 items-end bg-gradient-to-br from-[#18191d]/80 to-[#242834]/60 px-7 py-4 rounded-3xl border-[1.7px] border-[#ffd70044] backdrop-blur-sm shadow-lg">
            <div className="tracking-wide text-[#ffd700] text-[15.6px] font-bold">
              DESTINATION:
              <span className="ml-2 text-[#7afaff] font-semibold">
                EPIC LUXE
              </span>
            </div>
            <div className="flex items-center text-xs gap-6 text-[#bfa980] font-bold">
              <span>
                ETA: <span className="text-[#ffd700]">00:00:{String(progress % 60).padStart(2, '0')}</span>
              </span>
              <span>
                Weather: <span className="text-[#41ff2e]">Great</span>
              </span>
            </div>
          </div>
        </div>

        {/* Advanced Progress Bar as track */}
        <div className="w-full px-6 flex flex-col items-center">
          <div className="max-w-2xl mx-auto mt-8 flex items-center w-full">
            <div className="w-full bg-gradient-to-r from-[#ffd70022] to-[#7afaff22] border-[2.3px] border-[#ffd70030] rounded-full overflow-hidden shadow-lg relative h-7">
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    'linear-gradient(90deg, #ffd700 27%, #7afaff 69%, #bfa980 100%)',
                  boxShadow: '0 0 38px 8px #ffd70088',
                  transition: 'width 0.29s cubic-bezier(.18,.78,.48,.91)',
                }}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ffd700] font-bold text-[15.9px]">
                {progress < 100 ? `Grid: ${Math.floor(progress / 10) + 1}` : 'GO!'}
              </div>
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#41ff2e] font-black text-[19px]">
                {progress}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fireworks, confetti, and animated overlays (celebration) */}
      {showFireworks && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          {fireworks.map((fw, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${fw.x}vw`, top: `${fw.y}vh`, width: 28, height: 28,
                animation: `popfire 1.2s linear ${fw.delay}s both`,
                zIndex: 999,
              }}
            >
              {[...Array(5)].map((_, j) => (
                <span
                  key={j}
                  style={{
                    display: 'block',
                    position: 'absolute',
                    left: 14, top: 14, width: 7, height: 7,
                    borderRadius: 50,
                    background: `hsl(${fw.hue + j * 60}, 90%, 60%)`,
                    boxShadow: '0 1.7px 20px #ffd70055',
                    transform: `rotate(${(360 / 5) * j}deg) translateY(-15px)`,
                    opacity: 0.88,
                    filter: `blur(${Math.random() * 1.4 + 0.9}px)`,
                  }}
                />
              ))}
            </div>
          ))}
          <style jsx>{`
            @keyframes popfire {
              0% {opacity:1; transform: scale(0.6);}
              64%{opacity:1; transform: scale(1.18);}
              90% { opacity:0.82;}
              100% {opacity:0;}
            }
          `}</style>
        </div>
      )}

      
    </div>
  );
};

export default F1GrandPrixLoader;
