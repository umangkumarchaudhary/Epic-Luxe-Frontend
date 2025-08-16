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
    title: "Acquire Excellence",
    description: "Discover meticulously curated luxury vehicles. Each model represents the pinnacle of automotive craftsmanship.",
    badges: [
      { icon: "shield-check", text: "Certified Pre-Owned" },
      { icon: "truck", text: "White Glove Delivery" }
    ],
    cta: { text: "Explore Collection", href: "/reassured/buy-used-cars" }
  },
  sellSection: {
    title: "Exclusive Consignment", 
    description: "Transform your prized vehicle into opportunity. Our premium marketplace connects discerning sellers with qualified collectors.",
    badges: [
      { icon: "trending-up", text: "Market Valuation" },
      { icon: "lock", text: "Secure Transaction" }
    ],
    cta: { text: "Begin Consignment", href: "/reassured/Services/sell-your-car" }
  },
  backgroundImages: {
    images: [
      "/assets/images/reassuredherobg.png",
      "/assets/images/reassuredherobg2.png"
    ],
    animationType: "slideshow"
  }
}