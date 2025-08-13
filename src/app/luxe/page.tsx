
import Hero from "@/app/components/Hero"
import Header from "@/app/components/Header"
import FeaturedInventory from "@/app/components/FeaturedInventory"
import Services from "@/app/components/Services"

import WhyChooseUsSection from "@/app/components/WhyChooseUsSection"
import Footer from "@/app/components/Footer"
import BrowseSection from "../components/BrowseBy"
import TestimonialsCarousel from "../components/Testimonials"
import HomeAboutContact from "../components/HomeAboutContact"




export default function HomePage(){
  return (
    <main>
      <Hero/>
      <Header/>
    
      <FeaturedInventory/>
      
      <Services/>
      <BrowseSection/>
      
      <WhyChooseUsSection/>
      <TestimonialsCarousel/>
      <HomeAboutContact/>
      <Footer/>
    
      
    </main>
  )
}