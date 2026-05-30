import Navbar from "@/components/malibu/Navbar";
import SmoothScrollProvider from "@/components/malibu/SmoothScrollProvider";
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
      {/*
        Navbar is OUTSIDE the smooth wrapper.
        ScrollSmoother applies transforms to #smooth-content, which breaks
        `position: fixed` on children — keeping Navbar as a sibling avoids this.
      */}
      <Navbar />

      <SmoothScrollProvider>
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
      </SmoothScrollProvider>
    </>
  );
}
