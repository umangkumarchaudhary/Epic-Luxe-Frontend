// Optimized HeroServer2.tsx - Clean server component
import { Metadata } from 'next'
import HeroClient from './HeroClient'
import { HeroData, defaultHeroData } from './types'

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

// Server-side data fetching function
async function getHeroData(): Promise<HeroData> {
  // In real app, this would be an API call or database query
  // For now, return default data
  return defaultHeroData
}

// Clean server component with SEO optimization
export default async function HeroIntegrated() {
  const heroData = await getHeroData()

  console.log('Hero section rendered on server at:', new Date().toISOString())

  return (
    <main role="main" style={{ width: '100%', background: '#FFFFFF' }}>
      {/* SEO-friendly hidden title */}
      <h1 style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
      }}>
        Premium Luxury Car Marketplace
      </h1>
      
      <HeroClient data={heroData} />
      
      {/* Structured data for SEO */}
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