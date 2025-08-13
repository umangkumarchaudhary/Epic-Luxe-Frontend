'use client';

import React, { useState, useEffect } from 'react';
import { Car, Gauge } from 'lucide-react';

// Cinematic 3D Highway Loader
const CinematicHighwayLoader = () => {
  const [cameraAngle, setCameraAngle] = useState(0);
  const [weatherEffect, setWeatherEffect] = useState<'clear' | 'rain' | 'night'>('clear');

  useEffect(() => {
    // Camera rotates smoothly
    const angleInterval = setInterval(() => {
      setCameraAngle(prev => (prev + 1) % 360);
    }, 100);

    // Weather animation toggles every few seconds
    const weatherInterval = setInterval(() => {
      const effects: Array<'clear' | 'rain' | 'night'> = ['clear', 'rain', 'night'];
      setWeatherEffect(effects[Math.floor(Math.random() * effects.length)]);
    }, 4000);

    return () => {
      clearInterval(angleInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  // Simulated speed and timer, using cameraAngle for a dynamic feel
  const currentSpeed = Math.floor(Math.sin(cameraAngle * 0.1) * 30 + 120);
  const eta = String(Math.floor(Math.abs(Math.sin(cameraAngle * 0.05) * 10 + 15))).padStart(2, '0');
  const progressSegments = Math.floor((cameraAngle % 360) / 18);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center overflow-hidden relative">
      {/* Weather Effects Overlay */}
      <div className={`weather-overlay ${weatherEffect}`}>
        {weatherEffect === 'rain' && (
          <div className="rain-container">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="raindrop"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3D Highway Scene */}
      <div
        className="highway-scene"
        style={{ transform: `perspective(1000px) rotateY(${cameraAngle * 0.1}deg)` }}
      >
        {/* Highway Road */}
        <div className="highway-road">
          <div className="road-surface"></div>
          <div className="lane-markers">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="lane-marker" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <div className="road-edges">
            <div className="road-edge left"></div>
            <div className="road-edge right"></div>
          </div>
        </div>

        {/* Moving Cars */}
        <div className="traffic-system">
          {/* Hero Car */}
          <div className="hero-car">
            <Car className="w-12 h-12 text-[#d4af37]" />
            <div className="car-effects">
              <div className="engine-glow"></div>
              <div className="speed-trails"></div>
              <div className="tire-smoke"></div>
            </div>
          </div>
          {/* 6 Traffic Cars */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`traffic-car traffic-car-${i + 1}`}
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <Car className="w-8 h-8 text-slate-400" />
            </div>
          ))}
        </div>

        {/* Street Lights & Skyline */}
        <div className="environment-details">
          {/* Street Lights */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="street-light"
              style={{ left: `${10 + i * 12}%`, animationDelay: `${i * 0.3}s` }}
            >
              <div className="light-pole"></div>
              <div className="light-source"></div>
              <div className="light-beam"></div>
            </div>
          ))}
          {/* City Skyline */}
          <div className="city-skyline">
            {[...Array(12)].map((_, i) => {
              const hasLight = Math.random() > 0.7;
              const buildingHeight = `${60 + Math.random() * 100}px`;
              return (
                <div
                  key={i}
                  className="building"
                  style={{
                    height: buildingHeight,
                    left: `${i * 8}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  {hasLight && <div className="building-light"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cinematic HUD */}
      <div className="cinematic-hud pointer-events-none">
        <div className="hud-corners">
          <div className="corner top-left" />
          <div className="corner top-right" />
          <div className="corner bottom-left" />
          <div className="corner bottom-right" />
        </div>
        <div className="speed-dashboard">
          <div className="speedometer">
            <Gauge className="w-8 h-8 text-[#d4af37]" />
            <div className="speed-reading">
              <span className="speed-value">{currentSpeed}</span>
              <span className="speed-unit">KPH</span>
            </div>
          </div>
          <div className="journey-info">
            <div className="info-line">
              <span className="label">DESTINATION:</span>
              <span className="value">LUXURY SHOWROOM</span>
            </div>
            <div className="info-line">
              <span className="label">ETA:</span>
              <span className="value">00:00:{eta}</span>
            </div>
            <div className="info-line">
              <span className="label">WEATHER:</span>
              <span className="value">{weatherEffect.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="loading-progress">
          <div className="progress-label">LOADING PREMIUM COLLECTION</div>
          <div className="progress-bar-advanced">
            <div className="progress-segments">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="progress-segment"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    backgroundColor: i < progressSegments ? '#d4af37' : 'rgba(255,255,255,0.12)',
                  }}
                />
              ))}
            </div>
            <div className="progress-glow"></div>
          </div>
        </div>
      </div>

      {/* Cinematic/3D CSS */}
      <style jsx>{`
        .weather-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: all 1s ease;
          z-index: 30;
        }

        .weather-overlay.rain {
          background: linear-gradient(180deg, rgba(30, 58, 138, 0.14), rgba(15, 23, 42, 0.20));
        }

        .weather-overlay.night {
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.3), rgba(2, 6, 23, 0.5));
        }

        .rain-container {
          position: absolute;
          inset: 0;
        }
        .raindrop {
          position: absolute;
          width: 2px;
          height: 20px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.7), transparent);
          animation: rainFall linear infinite;
        }
        @keyframes rainFall {
          to { transform: translateY(100vh); }
        }

        .highway-scene {
          position: relative;
          width: 100vw;
          height: 100vh;
          transform-style: preserve-3d;
          z-index: 5;
        }
        .highway-road {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          transform: perspective(500px) rotateX(70deg);
          transform-origin: bottom;
        }
        .road-surface {
          position: absolute;
          inset: 0;
          background: linear-gradient(#1e293b 70%, #0f172a 100%);
          border-radius: 0 0 25px 25px;
        }
        .lane-markers {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
        }
        .lane-marker {
          position: absolute;
          width: 60px;
          height: 4px;
          background: #facc15;
          left: 50%;
          transform: translateX(-50%);
          animation: markerMove 1.2s linear infinite;
        }
        .lane-marker:nth-child(odd) { left: 33%; }
        .lane-marker:nth-child(even) { left: 66%; }
        @keyframes markerMove {
          from { top: 120%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          to { top: -10%; opacity: 0; }
        }
        .road-edges {
          position: absolute;
          inset: 0;
        }
        .road-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 8px;
          background: linear-gradient(#facc15, #eab308);
          animation: edgeGlow 2s ease-in-out infinite alternate;
        }
        .road-edge.left { left: 10%; }
        .road-edge.right { right: 10%; }
        @keyframes edgeGlow {
          from { box-shadow: 0 0 10px #facc15; }
          to { box-shadow: 0 0 30px #facc15, 0 0 60px #facc15; }
        }

        .traffic-system {
          position: absolute;
          inset: 0;
          z-index: 12;
        }
        .hero-car {
          position: absolute;
          bottom: 45%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          animation: heroDrive 5s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        @keyframes heroDrive {
          0%,100% { filter: drop-shadow(0 4px 22px #d4af3770); }
          50% { filter: drop-shadow(0 10px 45px #d4af37); }
        }
        .car-effects {
          position: absolute; left: 0; right: 0; bottom: -4px;
          pointer-events: none;
        }
        .engine-glow {
          position: absolute; left: 50%; transform: translateX(-50%);
          bottom: 2px; width: 48px; height: 18px;
          background: radial-gradient(ellipse, #ffd70099 55%, transparent 80%);
          filter: blur(4px);
        }
        .speed-trails {
          position: absolute; left: 50%; bottom: 3px;
          width: 30px; height: 28px;
          background: linear-gradient(to bottom, #d4af3750, transparent);
          transform: translateX(-50%);
          filter: blur(1.5px);
        }
        .tire-smoke {
          position: absolute;
          left: 25%; right: 25%; bottom: -4px;
          height: 14px;
          background: radial-gradient(#fff5 40%, transparent 85%);
          border-radius: 100%;
          filter: blur(3px);
        }
        .traffic-car {
          position: absolute; bottom: 52%; z-index: 10;
          animation: trafficDrive 6s linear infinite;
        }
        .traffic-car-1 { left: 26%; animation-duration: 5.8s; }
        .traffic-car-2 { left: 41%; animation-duration: 7s; }
        .traffic-car-3 { left: 56%; animation-duration: 6.2s; }
        .traffic-car-4 { left: 58%; bottom: 60%; animation-duration: 5.3s;}
        .traffic-car-5 { left: 64%; bottom: 50%; animation-duration: 7.4s;}
        .traffic-car-6 { left: 72%; bottom: 55%; animation-duration: 6.8s;}
        @keyframes trafficDrive {
          0% { bottom: 85%; opacity: 0.3; }
          15%{ opacity: 0.8;}
          50% { opacity:1;}
          85%{opacity:0.8;}
          100% { bottom: 52%; opacity: 0.3;}
        }

        .environment-details {
          pointer-events: none;
        }
        .street-light {
          position: absolute; bottom: 40%; width: 16px; height: 70px;
          z-index: 2;
          animation: lightFlicker 4s infinite;
        }
        @keyframes lightFlicker {
          0%,100%{ opacity:1;}
          30%,90%{ opacity:0.73;}
          50%{opacity:0.85;}
        }
        .light-pole {
          position: absolute; bottom: 0; left: 44%; width: 4px; height: 54px;
          background: linear-gradient(to top, #d1d5db88, #333, #000 90%);
          border-radius: 1px;
        }
        .light-source {
          position: absolute; top: 0; left: 35%;
          width: 12px; height: 12px; border-radius: 50%;
          background: radial-gradient(circle, #fff8 70%, #d4af37 95%, transparent 100%);
          box-shadow: 0 0 32px 8px #facc15b0;
        }
        .light-beam {
          position: absolute; left: 0; right:0; top: 8px;
          height: 26px;
          background: linear-gradient(180deg,#ffd7002c 40%,transparent 100%);
          border-radius: 20px;
        }
        .city-skyline {
          position: absolute;
          bottom: 8%; left: 0; right: 0; height: 160px;
          pointer-events: none;
        }
        .building {
          position: absolute; bottom: 0; width: 28px;
          background: linear-gradient(180deg, #374151c0 5%, #111322 100%);
          border-radius: 4px 4px 3px 3px;
          box-shadow: 0 1px 20px #0004;
        }
        .building-light {
          position: absolute;
          top: 10px; left: 6px; width: 8px; height: 12px;
          border-radius: 2px;
          background: linear-gradient(180deg, #ffd700, #fffbe6 75%, #bfa980);
          box-shadow: 0 0 32px #ffd700a0;
          animation: buildingLight 2s linear infinite alternate;
        }
        @keyframes buildingLight {
          0%,100%{ opacity:.95;}
          48%{opacity:1;}
          50%{opacity:0.65;}
          65%{ opacity:0.9;}
          68%{opacity:0.6;}
        }
        /* HUD STYLES */
        .cinematic-hud {
          position: fixed;
          inset: 0;
          z-index: 40;
          pointer-events: none;
        }
        .hud-corners .corner{
          position: absolute;
          border:2px solid #d4af37;
          width:30px; height:30px;
          opacity:0.7;
        }
        .corner.top-left{ top:40px; left:40px; border-right:0; border-bottom:0;}
        .corner.top-right{ top:40px; right:40px; border-left:0;border-bottom:0;}
        .corner.bottom-left{ bottom:40px; left:40px; border-right:0; border-top:0;}
        .corner.bottom-right{ bottom:40px; right:40px; border-left:0;border-top:0;}
        .speed-dashboard {
          position: absolute; top: 70px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center;
          gap: 16px;
          background: rgba(30,41,59,0.45);
          backdrop-filter: blur(10px);
          padding: 18px 36px;
          border-radius: 36px;
          border:1.6px solid #d4af3740;
          box-shadow: 0 2px 24px #d4af371a;
        }
        .speedometer {
          display:flex; align-items: flex-end; gap:10px;
        }
        .speed-reading {
          display: flex; align-items: baseline; gap: 7px;
        }
        .speed-value {
          font-size: 2.3rem; font-weight: 700; color: #d4af37; font-family: 'Courier New', monospace;
          text-shadow: 0 2px 16px #d4af37b5;
          letter-spacing:2.5px;
        }
        .speed-unit {
          font-size: 1.1rem; color: #ecebe7; font-weight: 500;
        }
        .journey-info {
          margin-top: 4px; text-align: center;
        }
        .info-line {
          font-family: 'Manrope', 'Courier New', monospace; font-size: 1.01rem;
        }
        .info-line .label {
          color: #bfa980; letter-spacing: 1px; font-weight: 600; margin-right: 5px;
        }
        .info-line .value {
          color: #fffbe7; font-weight: 600;
        }
        .loading-progress {
          position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%);
          width: 440px;
          max-width: 92vw;
          text-align: center;
        }
        .progress-label {
          font-size: 1rem; color: #cecece; letter-spacing: 2px; margin-bottom: 7px; font-weight: 600;
        }
        .progress-bar-advanced {
          background: rgba(255,255,255,0.06); border-radius: 12px;
          overflow: hidden; position: relative; height: 20px;
          margin: 0 auto; box-shadow: 0 3px 17px #d4af3788;
        }
        .progress-segments {
          position: absolute; left:0; right:0; top:0; bottom:0; display:flex; gap:1.2px;
          z-index: 2;
        }
        .progress-segment {
          flex: 1; border-radius: 9px; height: 100%;
          background: #b1b1b140;
          box-shadow: 0 1px 10px #d4af3722;
          animation: progressGlow 2s ease-in-out infinite;
        }
        @keyframes progressGlow {
          0%,100%{ opacity:0.9;}
          50%{ opacity:.65;}
        }
        .progress-glow {
          position: absolute; left:0; right:0; top:0; bottom:0;
          pointer-events: none;
          background: linear-gradient(90deg, transparent 60%, #d4af3740 85%, transparent 100%);
          mix-blend-mode: screen;
          filter: blur(3px);
          opacity: 0.5;
          z-index:1;
          animation: progressSweep 2.8s ease-in-out infinite;
        }
        @keyframes progressSweep {
          0%{background-position: left;}
          100%{background-position: right;}
        }
        @media (max-width:640px){
          .speed-dashboard{ padding: 12px 6vw; }
          .loading-progress{ width:96vw; min-width:180px;}
        }
      `}</style>
    </div>
  );
};

export default CinematicHighwayLoader;
