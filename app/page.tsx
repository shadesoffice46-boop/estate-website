import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { StatsStrip } from "@/components/StatsStrip";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Agents } from "@/components/Agents";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SearchBar />
        <FeaturedProperties />
        <StatsStrip />
        <About />
        <Services />
        <Agents />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
