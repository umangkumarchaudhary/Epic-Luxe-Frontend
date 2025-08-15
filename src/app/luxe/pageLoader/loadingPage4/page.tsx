
'use client';
import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';

// Option 1: Hyper-Realistic 3D Car Transformation
const HyperRealistic3DLoader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('materializing'); // 'materializing', 'assembling', 'polishing', 'complete'
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress <= 25) setPhase('materializing');
        else if (newProgress <= 50) setPhase('assembling');
        else if (newProgress <= 75) setPhase('polishing');
        else if (newProgress <= 100) setPhase('complete');
        
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 80);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center overflow-hidden relative">
      {/* Particle System Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full animate-ping opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Holographic Ground Grid */}
      <div className="absolute bottom-0 left-0 right-0 h-96 overflow-hidden">
        <div className="holographic-grid">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-line-horizontal" style={{ bottom: `${i * 20}px` }} />
          ))}
          {[...Array(40)].map((_, i) => (
            <div key={i} className="grid-line-vertical" style={{ left: `${i * 30}px` }} />
          ))}
        </div>
      </div>

      {/* Main Car Assembly Animation */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Car Container with Advanced 3D Effects */}
        <div className="car-assembly-container mb-8">
          <div className={`car-wireframe ${phase}`}>
            {/* Wireframe Effect */}
            <div className="wireframe-lines">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`wire-segment wire-${i + 1}`} />
              ))}
            </div>
            
            {/* Assembled Car */}
            <div className="assembled-car">
              <Car className="w-24 h-24 text-[#d4af37] filter drop-shadow-2xl" />
              
              {/* Dynamic Lighting Effects */}
              <div className="car-lighting">
                <div className="headlight-left"></div>
                <div className="headlight-right"></div>
                <div className="underglow"></div>
              </div>
              
              {/* Holographic Scan Lines */}
              <div className="scan-lines">
                <div className="scan-line scan-1"></div>
                <div className="scan-line scan-2"></div>
                <div className="scan-line scan-3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced HUD Interface */}
        <div className="hud-interface">
          <div className="hud-title">
            <span className="glitch-text" data-text="LUXURY AUTOMOTIVE MATRIX">
              LUXURY AUTOMOTIVE MATRIX
            </span>
          </div>
          
          {/* Progress Ring with Multiple Layers */}
          <div className="progress-ring-container">
            <svg className="progress-ring" width="120" height="120">
              <circle className="progress-ring-background" cx="60" cy="60" r="50" />
              <circle 
                className="progress-ring-fill" 
                cx="60" 
                cy="60" 
                r="50"
                style={{ strokeDashoffset: `${314 - (314 * progress) / 100}` }}
              />
              <circle className="progress-ring-glow" cx="60" cy="60" r="45" />
            </svg>
            <div className="progress-center">
              <span className="progress-text">{progress}%</span>
              <div className="phase-indicator">{phase.toUpperCase()}</div>
            </div>
          </div>
          
          {/* System Status Indicators */}
          <div className="system-status">
            <div className={`status-item ${progress > 20 ? 'active' : ''}`}>
              <div className="status-dot"></div>
              <span>CHASSIS_INITIALIZED</span>
            </div>
            <div className={`status-item ${progress > 40 ? 'active' : ''}`}>
              <div className="status-dot"></div>
              <span>ENGINE_CALIBRATED</span>
            </div>
            <div className={`status-item ${progress > 60 ? 'active' : ''}`}>
              <div className="status-dot"></div>
              <span>LUXURY_FEATURES_ENABLED</span>
            </div>
            <div className={`status-item ${progress > 80 ? 'active' : ''}`}>
              <div className="status-dot"></div>
              <span>PREMIUM_READY</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .holographic-grid {
          position: absolute;
          inset: 0;
          perspective: 1000px;
          transform: rotateX(75deg);
        }
        
        .grid-line-horizontal {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
          animation: gridPulse 3s ease-in-out infinite;
        }
        
        .grid-line-vertical {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.2), transparent);
          animation: gridPulse 3s ease-in-out infinite;
        }
        
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .car-assembly-container {
          position: relative;
          width: 200px;
          height: 200px;
          perspective: 1000px;
        }
        
        .car-wireframe {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotate3D 8s linear infinite;
        }
        
        @keyframes rotate3D {
          from { transform: rotateY(0deg) rotateX(10deg); }
          to { transform: rotateY(360deg) rotateX(10deg); }
        }
        
        .wireframe-lines {
          position: absolute;
          inset: 0;
        }
        
        .wire-segment {
          position: absolute;
          background: linear-gradient(45deg, transparent, #d4af37, transparent);
          opacity: 0;
          animation: wireframeBuild 4s ease-in-out infinite;
        }
        
        .wire-1 { top: 20%; left: 10%; width: 80%; height: 2px; animation-delay: 0s; }
        .wire-2 { top: 40%; left: 5%; width: 90%; height: 2px; animation-delay: 0.2s; }
        .wire-3 { top: 60%; left: 10%; width: 80%; height: 2px; animation-delay: 0.4s; }
        .wire-4 { top: 80%; left: 15%; width: 70%; height: 2px; animation-delay: 0.6s; }
        .wire-5 { left: 20%; top: 10%; width: 2px; height: 80%; animation-delay: 0.8s; }
        .wire-6 { right: 20%; top: 10%; width: 2px; height: 80%; animation-delay: 1s; }
        .wire-7 { left: 50%; top: 5%; width: 2px; height: 90%; animation-delay: 1.2s; }
        .wire-8 { left: 35%; top: 30%; width: 30%; height: 2px; transform: rotate(45deg); animation-delay: 1.4s; }
        
        @keyframes wireframeBuild {
          0%, 20% { opacity: 0; transform: scale(0.5); }
          30%, 70% { opacity: 1; transform: scale(1); }
          80%, 100% { opacity: 0.3; transform: scale(1.1); }
        }
        
        .assembled-car {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: carMaterialize 4s ease-in-out 2s infinite;
        }
        
        @keyframes carMaterialize {
          0%, 30% { opacity: 0; transform: scale(0.8) rotateY(0deg); }
          50%, 80% { opacity: 1; transform: scale(1) rotateY(180deg); }
          100% { opacity: 0.8; transform: scale(1.05) rotateY(360deg); }
        }
        
        .car-lighting {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .headlight-left, .headlight-right {
          position: absolute;
          top: 45%;
          width: 20px;
          height: 8px;
          background: radial-gradient(ellipse, rgba(255, 255, 255, 0.9), transparent);
          border-radius: 50%;
          animation: headlightFlicker 2s ease-in-out infinite;
        }
        
        .headlight-left { left: 15%; }
        .headlight-right { right: 15%; }
        
        @keyframes headlightFlicker {
          0%, 100% { opacity: 0.7; box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
          50% { opacity: 1; box-shadow: 0 0 40px rgba(255, 255, 255, 0.8); }
        }
        
        .underglow {
          position: absolute;
          bottom: -10px;
          left: 20%;
          right: 20%;
          height: 20px;
          background: radial-gradient(ellipse, rgba(212, 175, 55, 0.6), transparent);
          border-radius: 50%;
          animation: underglowPulse 3s ease-in-out infinite;
        }
        
        @keyframes underglowPulse {
          0%, 100% { transform: scaleX(1); opacity: 0.4; }
          50% { transform: scaleX(1.5); opacity: 0.8; }
        }
        
        .scan-lines {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent);
          animation: scanMove 2s linear infinite;
        }
        
        .scan-1 { animation-delay: 0s; }
        .scan-2 { animation-delay: 0.7s; }
        .scan-3 { animation-delay: 1.4s; }
        
        @keyframes scanMove {
          0% { top: -10px; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        
        .hud-interface {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        
        .hud-title {
          font-family: 'Courier New', monospace;
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 2px;
        }
        
        .glitch-text {
          position: relative;
          color: #d4af37;
          animation: glitch 2s linear infinite;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          animation: glitchTop 1s linear infinite;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
          color: #ff0040;
        }
        
        .glitch-text::after {
          animation: glitchBottom 1.5s linear infinite;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
          color: #00ffff;
        }
        
        @keyframes glitch {
          0%, 100% { text-shadow: 0.05em 0 0 #ff0040, -0.05em -0.025em 0 #00ffff, 0.025em 0.05em 0 #ffff00; }
          15% { text-shadow: 0.05em 0 0 #ff0040, -0.05em -0.025em 0 #00ffff, 0.025em 0.05em 0 #ffff00; }
          16% { text-shadow: -0.05em -0.025em 0 #ff0040, 0.025em 0.025em 0 #00ffff, -0.05em -0.05em 0 #ffff00; }
          49% { text-shadow: -0.05em -0.025em 0 #ff0040, 0.025em 0.025em 0 #00ffff, -0.05em -0.05em 0 #ffff00; }
          50% { text-shadow: 0.025em 0.05em 0 #ff0040, 0.05em 0 0 #00ffff, 0 -0.05em 0 #ffff00; }
          99% { text-shadow: 0.025em 0.05em 0 #ff0040, 0.05em 0 0 #00ffff, 0 -0.05em 0 #ffff00; }
        }
        
        @keyframes glitchTop {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitchBottom {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, 2px); }
          80% { transform: translate(-2px, -2px); }
        }
        
        .progress-ring-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .progress-ring {
          transform: rotate(-90deg);
        }
        
        .progress-ring-background {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 4;
        }
        
        .progress-ring-fill {
          fill: none;
          stroke: #d4af37;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-dasharray: 314;
          transition: stroke-dashoffset 0.5s ease;
          filter: drop-shadow(0 0 10px #d4af37);
        }
        
        .progress-ring-glow {
          fill: none;
          stroke: rgba(212, 175, 55, 0.3);
          stroke-width: 8;
          animation: ringGlow 2s ease-in-out infinite;
        }
        
        @keyframes ringGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        .progress-center {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .progress-text {
          font-size: 24px;
          font-weight: bold;
          color: #d4af37;
          font-family: 'Courier New', monospace;
        }
        
        .phase-indicator {
          font-size: 10px;
          color: rgba(212, 175, 55, 0.8);
          font-family: 'Courier New', monospace;
          letter-spacing: 1px;
          margin-top: 4px;
        }
        
        .system-status {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
        }
        
        .status-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.5s ease;
        }
        
        .status-item.active {
          color: #d4af37;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.5s ease;
        }
        
        .status-item.active .status-dot {
          background: #d4af37;
          box-shadow: 0 0 12px #d4af37;
          animation: statusPulse 1s ease-in-out infinite;
        }
        
        @keyframes statusPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default HyperRealistic3DLoader;