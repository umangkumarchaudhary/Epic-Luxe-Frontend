// Optimized HeroIntegrated.tsx - Clean and efficient
import HeroClient from './HeroClient'
import { HeroData, defaultHeroData } from './types'

// Simplified server-side data fetching
async function getHeroData(): Promise<HeroData> {
  // In production, this would fetch from your CMS, database, or API
  // For now, return the default data configuration
  return defaultHeroData
}

// Clean, pure server component with minimal overhead
export default async function HeroServer() {
  const heroData = await getHeroData()

  console.log('Hero section rendered on server at:', new Date().toISOString())

  return <HeroClient data={heroData} />
}