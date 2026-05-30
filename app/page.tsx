import Navbar from "@/components/malibu/Navbar";
import Hero from "@/components/malibu/Hero";
import MarqueeBanner from "@/components/malibu/MarqueeBanner";
import StorySection from "@/components/malibu/StorySection";
import ProductsSection from "@/components/malibu/ProductsSection";
import LookbookSection from "@/components/malibu/LookbookSection";
import CountdownSection from "@/components/malibu/CountdownSection";
import Newsletter from "@/components/malibu/Newsletter";
import Footer from "@/components/malibu/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBanner />
        <StorySection />
        <ProductsSection />
        <LookbookSection />
        <CountdownSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
