import HeaderServer from "./components/Header/HeaderServer";
import HeroServer from "./components/Hero/HeroServer1";
import HeroIntegrated from "./components/Hero/HeroIntegrated";
import Services from "./components/Services/Services";
import BrowseBySection from "./components/BrowseBy.tsx/BrowseBy";
import WhyChooseUsSection from "./components/WhyChooseUs/WhyChooseUsSection";
import Footer from "./components/Footer/FooterServer";


export default function HomePage(){
    return(
        <main>
        <HeaderServer />
        <HeroServer/>
        <HeroIntegrated/>
        <Services/>
        <BrowseBySection/>
        <WhyChooseUsSection/>
        <Footer/>
        </main>
    )
}