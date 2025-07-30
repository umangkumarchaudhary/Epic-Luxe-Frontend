
import Hero from "@/components/Hero"
import Header from "@/components/Header"
import FeaturedInventory from "@/components/FeaturedInventory"
import Services from "@/components/Services"

import WhyChooseUsSection from "@/components/WhyChooseUsSection"
import Footer from "@/components/Footer"




export default function HomePage(){
  return (
    <main>
      <Hero/>
      <Header/>
      <FeaturedInventory/>
      
      <Services/>
      
      <WhyChooseUsSection/>
      <Footer/>
    
      
    </main>
  )
}