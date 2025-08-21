// Shared types for Hero components
export interface BadgeData {
  icon: string
  text: string
}

export interface CTAData {
  text: string
  href: string
}

export interface SectionData {
  title: string
  description: string
  badges: BadgeData[]
  cta: CTAData
}

export interface BackgroundData {
  images: string[]
  mobileImages?: string[] // Mobile background images (optional)
  animationType: 'slideshow' | 'parallax' | 'float'
}

export interface HeroData {
  buySection: SectionData
  sellSection: SectionData
  backgroundImages: BackgroundData
}

export interface HeroClientProps {
  data: HeroData
}

// Default hero data for fallback
export const defaultHeroData: HeroData = {
  buySection: {
    title: "Buy Cars",
    description: "Premium pre-owned vehicles from Epic Reassured",
    badges: [
      { icon: "shield-check", text: "Certified Quality" },
      { icon: "truck", text: "Home Delivery" }
    ],
    cta: { text: "Browse Collection", href: "/reassured/buy-used-cars" }
  },
  sellSection: {
    title: "Sell Now", 
    description: "Get the best value for your vehicle with Epic Reassured",
    badges: [
      { icon: "trending-up", text: "Best Price Guaranteed" },
      { icon: "lock", text: "Instant Valuation" }
    ],
    cta: { text: "Get Valuation", href: "/reassured/Services/sell-your-car" }
  },
  backgroundImages: {
    images: [
      "/assets/images/reassuredherobg.png",
      "/assets/images/reassuredherobg2.png"
    ],
    mobileImages: [
      "/assets/images/reassuredherobg-mobile.png",
      "/assets/images/reassuredherobg2-mobile.png"
    ],
    animationType: "slideshow"
  }
}