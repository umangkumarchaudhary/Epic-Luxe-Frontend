'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { HeroClientProps, BadgeData, SectionData } from './types'

// Optimized icon components
const iconComponents = {
  'shield-check': () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12l2 2 4-4" />
      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
      <path d="M3 12v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6" />
    </svg>
  ),
  'truck': () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="16" height="13" x="6" y="4" rx="2" />
      <path d="m22 7-2-2v4l2-2Z" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="15" cy="20" r="1" />
    </svg>
  ),
  'trending-up': () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
      <polyline points="16,7 22,7 22,13" />
    </svg>
  ),
  'lock': () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
} as const

// Optimized styles with CSS-in-JS approach
const getStyles = () => `
  * { box-sizing: border-box; }
  
  .hero-container {
    width: 100%;
    position: relative;
    padding: 3rem 2rem;
    overflow: hidden;
    background: linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 50%, #F8F8F8 100%);
  }
  
  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    overflow: hidden;
  }
  
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: opacity 2s ease-in-out;
    transform-origin: center center;
  }
  
  .background-image.active {
    opacity: 0.15;
    animation: slowZoom 20s ease-in-out infinite alternate;
  }
  
  .background-image.inactive { opacity: 0; }
  
  @keyframes slowZoom {
    0% { transform: scale(1) translateX(0) translateY(0); }
    25% { transform: scale(1.05) translateX(-2%) translateY(-1%); }
    50% { transform: scale(1.08) translateX(1%) translateY(-2%); }
    75% { transform: scale(1.06) translateX(-1%) translateY(1%); }
    100% { transform: scale(1.1) translateX(2%) translateY(-1%); }
  }
  
  .hero-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.01) 0%, transparent 50%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.7) 100%);
    pointer-events: none;
    z-index: 1;
  }
  
  .hero-grid {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    min-height: 320px;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  
  .hero-grid::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: -1rem;
    right: -1rem;
    bottom: -1rem;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.5;
    z-index: -1;
    border-radius: 12px;
  }
  
  .hero-grid::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, 
      rgba(0, 0, 0, 0.08) 0%, 
      rgba(0, 0, 0, 0.04) 25%,
      rgba(0, 0, 0, 0.02) 50%,
      rgba(0, 0, 0, 0.04) 75%,
      rgba(0, 0, 0, 0.08) 100%
    );
    border-radius: 16px;
    z-index: -2;
  }
  
  .hero-section {
    position: relative;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    cursor: pointer;
    overflow: hidden;
    background: #FFFFFF;
    border-radius: 12px;
    border: 2px solid rgba(0, 0, 0, 0.06);
    box-shadow: 
      0 4px 20px rgba(0, 0, 0, 0.04),
      0 1px 3px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  
  .hero-section::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
    opacity: 0;
  }
  
  .hero-section::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(135deg, 
      rgba(0, 0, 0, 0.08) 0%, 
      rgba(0, 0, 0, 0.04) 25%,
      rgba(0, 0, 0, 0.02) 50%,
      rgba(0, 0, 0, 0.04) 75%,
      rgba(0, 0, 0, 0.08) 100%
    );
    border-radius: 16px;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: -1;
    pointer-events: none;
  }
  
  .hero-section.hovered::before {
    opacity: 1;
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  .hero-section.hovered::after { opacity: 1; }
  
  .hero-section.hovered {
    transform: translateY(-6px) scale(1.02);
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 
      0 32px 80px rgba(0, 0, 0, 0.12),
      0 12px 32px rgba(0, 0, 0, 0.08),
      0 4px 12px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -1px 0 rgba(0, 0, 0, 0.02);
  }
  
  .buy-section {
    background: linear-gradient(135deg, #FFFFFF 0%, rgba(0, 0, 0, 0.008) 50%, rgba(0, 0, 0, 0.015) 100%);
  }
  
  .buy-section::before {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(59, 130, 246, 0.005) 50%, transparent 100%) !important;
  }
  
  .sell-section {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.015) 0%, rgba(0, 0, 0, 0.008) 50%, #FFFFFF 100%);
  }
  
  .sell-section::before {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(16, 185, 129, 0.005) 50%, transparent 100%) !important;
  }
  
  .section-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 400px;
    gap: 0.5rem;
  }
  
  .header-row {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .section-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    margin-top: 0.25rem;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .hero-section.hovered .section-icon {
    background: rgba(0, 0, 0, 0.08);
    transform: scale(1.05) rotate(1deg);
  }
  
  .section-icon svg {
    color: #000000;
    width: 22px;
    height: 22px;
  }
  
  .header-content {
    flex: 1;
    min-width: 0;
  }
  
  .section-title {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.05;
    color: #000000;
    margin: 0 0 0.25rem 0;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    font-family: 'Manrope', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .hero-section.hovered .section-title {
    transform: translateX(3px);
    letter-spacing: -0.03em;
  }
  
  .section-description {
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.72);
    margin: 0;
    max-width: 320px;
    transition: all 0.3s ease;
    font-family: 'Manrope', sans-serif;
  }
  
  .hero-section.hovered .section-description {
    color: rgba(0, 0, 0, 0.85);
  }
  
  .badges-row {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin: 0.5rem 0 0.75rem 0;
  }
  
  .trust-badge {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    color: rgba(0, 0, 0, 0.8);
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0;
    transform: translateY(10px);
    animation: slideInBadge 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    transition: all 0.3s ease;
    font-family: 'Manrope', sans-serif;
  }
  
  .hero-section.hovered .trust-badge {
    color: rgba(0, 0, 0, 0.95);
    transform: translateY(0);
  }
  
  @keyframes slideInBadge {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .trust-badge svg {
    color: #000000;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    width: 18px;
    height: 18px;
  }
  
  .hero-section.hovered .trust-badge svg {
    transform: scale(1.1);
  }
  
  .cta-container {
    margin-top: 0px;
    padding-top: 0.25rem;
  }
  
  .cta-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 2rem;
    background: #000000;
    color: #FFFFFF;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9375rem;
    letter-spacing: 0.005em;
    border: 2px solid #000000;
    border-radius: 0;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
    align-self: flex-start;
    min-width: 180px;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-family: 'Manrope', sans-serif;
  }
  
  .cta-button span {
    position: relative;
    z-index: 2;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .button-hover-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%);
    transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }
  
  .cta-button:hover {
    color: #000000;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 12px 32px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #000000;
  }
  
  .cta-button:hover .button-hover-effect { left: 0; }
  .cta-button:hover span {
    transform: translateX(3px);
    font-weight: 700;
  }
  .cta-button:active { transform: translateY(-1px) scale(1.01); }
  
  .corner-bracket {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 0, 0, 0.08);
    transition: all 0.4s ease;
    z-index: 10;
  }
  
  .corner-tl { top: 12px; left: 12px; border-right: none; border-bottom: none; border-radius: 4px 0 0 0; }
  .corner-tr { top: 12px; right: 12px; border-left: none; border-bottom: none; border-radius: 0 4px 0 0; }
  .corner-bl { bottom: 12px; left: 12px; border-right: none; border-top: none; border-radius: 0 0 0 4px; }
  .corner-br { bottom: 12px; right: 12px; border-left: none; border-top: none; border-radius: 0 0 4px 0; }
  
  .hero-loading {
    height: calc(50vh - 70px);
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Manrope', sans-serif;
    color: #000000;
    gap: 1.5rem;
    background: #FFFFFF;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top: 3px solid #000000;
    border-radius: 50%;
    animation: spin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  }
  
  .loading-text {
    font-size: 1.125rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Mobile Responsive */
  @media (max-width: 768px) {
    .hero-container { padding: 2rem 1rem; }
    .background-image.active {
      opacity: 0.08;
      animation: mobileSlowZoom 25s ease-in-out infinite alternate;
    }
    @keyframes mobileSlowZoom {
      0% { transform: scale(1.02) translateX(0) translateY(0); }
      50% { transform: scale(1.05) translateX(-1%) translateY(-1%); }
      100% { transform: scale(1.08) translateX(1%) translateY(-1%); }
    }
    .hero-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .hero-grid::before { background-size: 15px 15px; }
    .hero-section { padding: 2rem 1.5rem; border-radius: 10px; }
    .hero-section::before { top: 6px; left: 6px; right: 6px; bottom: 6px; border-radius: 6px; }
    .hero-section::after { top: -3px; left: -3px; right: -3px; bottom: -3px; border-radius: 13px; }
    .header-row { margin-bottom: 1rem; }
    .section-icon { width: 40px; height: 40px; margin-top: 0.25rem; }
    .section-icon svg { width: 24px; height: 24px; }
    .section-title { font-size: clamp(1.5rem, 6vw, 2.25rem); margin-bottom: 0.75rem; }
    .section-description { font-size: 1rem; line-height: 1.6; margin-bottom: 0.5rem; }
    .badges-row { gap: 1.5rem; margin: 1rem 0 1.5rem 0; justify-content: space-between; }
    .trust-badge { font-size: 0.875rem; gap: 0.5rem; }
    .trust-badge svg { width: 18px; height: 18px; }
    .cta-container { margin-top: 0.5rem; padding-top: 0.5rem; }
    .cta-button { width: 100%; padding: 1rem 2rem; font-size: 0.9375rem; min-width: auto; }
    .section-content { gap: 1rem; max-width: none; }
    .hero-loading { height: 60vh; min-height: 300px; }
  }
  
  @media (max-width: 480px) {
    .hero-section { padding: 2rem 1rem 1.5rem 1rem; }
    .section-title { font-size: clamp(1.375rem, 7vw, 2rem); }
    .section-description { font-size: 0.9375rem; }
    .badges-row { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
    .trust-badge { font-size: 0.8125rem; }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .hero-section, .section-title, .trust-badge, .cta-button, .button-hover-effect, .loading-spinner, .section-icon, .background-image {
      transition: none;
      animation: none;
    }
    .background-image.active { opacity: 0.1; transform: none; }
    .trust-badge { opacity: 1; transform: translateY(0); }
    .hero-section.hovered { transform: none; }
  }
  
  /* High contrast mode */
  @media (prefers-contrast: high) {
    .hero-grid::before { background: rgba(0, 0, 0, 0.3); }
    .section-description { color: rgba(0, 0, 0, 0.9); }
    .trust-badge { color: #000000; }
    .section-icon { background: rgba(0, 0, 0, 0.1); }
  }
  
  /* Ultra-wide screens */
  @media (min-width: 1400px) {
    .hero-section { padding: 5rem 4rem 4rem 4rem; }
    .section-content { max-width: 480px; }
  }
`

export default function HeroClient({ data }: HeroClientProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<'buy' | 'sell' | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Optimized scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    setMounted(true)
    
    // Setup background slideshow
    const imageInterval = data.backgroundImages?.images?.length ? setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % data.backgroundImages.images.length
      )
    }, 6000) : null

    // Add Google Fonts and styles
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap'
    document.head.appendChild(link)
    
    const style = document.createElement('style')
    style.textContent = getStyles()
    document.head.appendChild(style)
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      if (imageInterval) clearInterval(imageInterval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [data.backgroundImages?.images?.length, handleScroll])

  // Memoized render functions
  const renderBadge = useCallback((badge: BadgeData, index: number) => {
    const IconComponent = iconComponents[badge.icon as keyof typeof iconComponents]
    
    return (
      <div 
        key={index}
        className="trust-badge"
        style={{ animationDelay: `${index * 0.15}s` }}
      >
        {IconComponent && <IconComponent />}
        <span>{badge.text}</span>
      </div>
    )
  }, [])

  const getSectionIcon = useCallback((type: 'buy' | 'sell') => {
    return type === 'buy' ? iconComponents['shield-check']() : iconComponents['trending-up']()
  }, [])

  const renderAnimatedBackground = useMemo(() => {
    if (!data.backgroundImages?.images?.length) return null
    
    return (
      <div className="hero-background">
        {data.backgroundImages.images.map((image, index) => (
          <div
            key={index}
            className={`background-image ${index === currentImageIndex ? 'active' : 'inactive'}`}
            style={{
              backgroundImage: `url(${image})`,
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
        ))}
      </div>
    )
  }, [data.backgroundImages?.images, currentImageIndex, scrollY])

  const renderSection = useCallback((sectionData: SectionData, type: 'buy' | 'sell') => (
    <section
      className={`hero-section ${type}-section ${hoveredSection === type ? 'hovered' : ''}`}
      onMouseEnter={() => setHoveredSection(type)}
      onMouseLeave={() => setHoveredSection(null)}
      aria-labelledby={`${type}-title`}
      role="region"
    >
      {/* Corner brackets */}
      <div className={`corner-bracket corner-tl ${hoveredSection === type ? 'opacity-100' : 'opacity-50'}`} />
      <div className={`corner-bracket corner-tr ${hoveredSection === type ? 'opacity-100' : 'opacity-50'}`} />
      <div className={`corner-bracket corner-bl ${hoveredSection === type ? 'opacity-100' : 'opacity-50'}`} />
      <div className={`corner-bracket corner-br ${hoveredSection === type ? 'opacity-100' : 'opacity-50'}`} />
      
      <div className="section-content">
        <div className="header-row">
          <div className="section-icon">
            {getSectionIcon(type)}
          </div>
          <div className="header-content">
            <h2 id={`${type}-title`} className="section-title">
              {sectionData.title}
            </h2>
            <p className="section-description">
              {sectionData.description}
            </p>
          </div>
        </div>
        
        <div className="badges-row" role="list" aria-label="Trust indicators">
          {sectionData.badges.map((badge, index) => renderBadge(badge, index))}
        </div>
        
        <div className="cta-container">
          <a
            href={sectionData.cta.href}
            className="cta-button"
            aria-label={`${sectionData.cta.text} - ${sectionData.title}`}
          >
            <span>{sectionData.cta.text}</span>
            <div className="button-hover-effect"></div>
          </a>
        </div>
      </div>
    </section>
  ), [hoveredSection, renderBadge, getSectionIcon])

  if (!mounted) {
    return (
      <div className="hero-loading">
        <div className="loading-spinner"></div>
        <span className="loading-text">Loading Premium Experience...</span>
      </div>
    )
  }

  return (
    <div className="hero-container">
      {renderAnimatedBackground}
      <div className="hero-grid">
        {renderSection(data.buySection, 'buy')}
        {renderSection(data.sellSection, 'sell')}
      </div>
    </div>
  )
}