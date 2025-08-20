import Header from "@/app/components/Header";
import Hero from "./Hero";
import Footer from "@/app/components/Footer";

import VehiclesPage from "./VehiclePage";
import Faq from "./Faq"




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
