// app/reassured/buy-used-cars/page.tsx
import Header from "@/app/components/Header";
import Hero from "./buyComponents/Hero/Slider";
import Footer from "@/app/components/Footer";
import VehiclesPage from "./buyComponents/VehiclePage/VehiclePageServer";
import Faq from "./buyComponents/FAQ/faq";

export const metadata = {
  title: "Buy Certified Used Cars in India | Pre-Owned Luxury & Premium Vehicles",
  description:
    "Browse our certified used cars including Mercedes-Benz, BMW, Audi, and premium SUVs. All vehicles undergo a 360° inspection and come with warranty & finance options.",
  keywords:
    "buy used cars India, pre-owned Mercedes-Benz, certified BMW, second hand Audi, used luxury cars, premium car finance, used SUV for sale, car loan offers, luxury cars with warranty",
};

export default function Page() {
  return (
    <>
      <Header />
      <Hero />

      {/* SEO Rich Intro Section */}
      <section className="sr-only">
        <h1>Buy Certified Used Cars in India – Luxury & Premium Vehicles</h1>
        <p>
          Explore our wide range of certified pre-owned cars, including
          Mercedes-Benz, BMW, Audi, Jaguar, Land Rover, Lexus, Porsche, and
          Volvo. Each vehicle is inspected on over 360 points, ensuring you get
          unmatched quality and performance. Choose from premium sedans, SUVs,
          and sports cars with flexible financing and nationwide delivery.
        </p>
        <h2>Top Luxury Brands Available</h2>
        <ul>
          <li>Mercedes-Benz – E-Class, C-Class, S-Class, GLE, GLS</li>
          <li>BMW – 3 Series, 5 Series, 7 Series, X5, X7</li>
          <li>Audi – A4, A6, Q5, Q7, Q8</li>
          <li>Porsche – Macan, Cayenne, 911</li>
        </ul>
        <h2>Why Choose Us Over Spinny & Cars24?</h2>
        <ul>
          <li>Specialized in luxury & premium vehicles only</li>
          <li>Certified inspections and service history verification</li>
          <li>Premium concierge service for sourcing rare cars</li>
          <li>Exclusive financing offers from top banks</li>
        </ul>
      </section>

      <VehiclesPage />

      <Faq />

      {/* Additional keyword-rich content below */}
      <section className="sr-only">
        <h2>Popular Searches</h2>
        <ul>
          <li>Buy used luxury cars in Hyderabad</li>
          <li>Pre-owned BMW 5 Series in Pune</li>
          <li>Certified Audi Q7 for sale in Chennai</li>
          <li>Used SUVs under ₹50 lakh</li>
        </ul>
      </section>

      <Footer />
    </>
  );
}
