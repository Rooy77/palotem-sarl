import AboutPage from "@/components/AboutSection";
import ServicesPage from "@/components/ServicesSection";
import HeroSlider from "@/components/HeroSlider";
import ContactPage from "@/components/ContactSection";
import Partener from "@/components/PartnersSection";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <AboutPage />
      <ServicesPage />
      <Partener />
      <ContactPage />
      {/* D'autres sections ici comme About, Services... */}
    </main>
  );
}
