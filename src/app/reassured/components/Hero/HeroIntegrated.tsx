// HeroServer.tsx - Mercedes-Benz Premium Level
import { Metadata } from 'next'
import HeroClient from './HeroClient'

// Server-side metadata
export const metadata: Metadata = {
  title: 'Premium Luxury Cars - Buy & Sell | Mercedes-Inspired Platform',
  description: 'Discover meticulously curated luxury vehicles and exclusive consignment services. Premium automotive marketplace for discerning collectors.',
  keywords: 'luxury cars, premium vehicles, Mercedes, buy cars, sell cars, automotive marketplace',
  openGraph: {
    title: 'Premium Luxury Cars - Buy & Sell',
    description: 'Exclusive automotive marketplace for luxury vehicle enthusiasts',
    type: 'website',
  },
}

// Type definitions shared between server and client
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

export interface HeroData {
  buySection: SectionData
  sellSection: SectionData
}

// Server-side data fetching function
async function getHeroData(): Promise<HeroData> {
  return {
    buySection: {
      title: "Acquire Excellence",
      description: "Discover meticulously curated luxury vehicles. Each model represents the pinnacle of automotive craftsmanship and engineering precision.",
      badges: [
        {
          icon: "shield-check",
          text: "Certified Pre-Owned"
        },
        {
          icon: "truck",
          text: "White Glove Delivery"
        }
      ],
      cta: {
        text: "Explore Collection",
        href: "/buy"
      }
    },
    sellSection: {
      title: "Exclusive Consignment",
      description: "Transform your prized vehicle into opportunity. Our premium marketplace connects discerning sellers with qualified collectors.",
      badges: [
        {
          icon: "trending-up",
          text: "Market Valuation"
        },
        {
          icon: "lock",
          text: "Secure Transaction"
        }
      ],
      cta: {
        text: "Begin Consignment",
        href: "/sell"
      }
    }
  }
}

// Pure Server Component - NO STYLING AT ALL
export default async function HeroServer() {
  const heroData = await getHeroData()

  return (
    <main role="main">
      <h1 className="sr-only">Premium Luxury Car Marketplace</h1>
      <HeroClient data={heroData} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Premium Luxury Cars",
            "description": "Exclusive automotive marketplace for luxury vehicle enthusiasts",
            "url": "https://your-domain.com",
            "potentialAction": [
              {
                "@type": "BuyAction",
                "target": "https://your-domain.com/buy",
                "name": "Buy Luxury Cars"
              },
              {
                "@type": "SellAction", 
                "target": "https://your-domain.com/sell",
                "name": "Sell Your Car"
              }
            ]
          })
        }}
      />
    </main>
  )
}