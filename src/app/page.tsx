import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalSpotlight } from "@/components/ui/GlobalSpotlight";

import { Hero } from "@/components/sections/Hero";
import { Innovation } from "@/components/sections/Innovation";
import { Research } from "@/components/sections/Research";
import { Technology } from "@/components/sections/Technology";
import { Capabilities } from "@/components/sections/Capabilities";
import { Impact } from "@/components/sections/Impact";
import { FinalCTA } from "@/components/sections/FinalCTA";

const Home = () => {
  return (
    <main className="min-h-screen bg-(--cellyra-bg) text-(--cellyra-text) transition-colors duration-500 relative">
      <GlobalSpotlight />
      <Navbar />
      <Hero />
      <Innovation />
      <Research />
      <Technology />
      <Capabilities />
      <Impact />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Home;
