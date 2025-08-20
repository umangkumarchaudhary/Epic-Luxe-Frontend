import Header from "@/app/components/Header";
import Hero from "./components/Hero";
import Footer from "@/app/components/Footer";

import VehiclesPage from "./components/VehiclePage";
import Faq from "./components/Faq";




export default function Page() {
  return (
    <>
      <Header />
      <Hero />
 
      <VehiclesPage />
      <Faq /> 
      
      <Footer />
      
      
    </>
  );
}
