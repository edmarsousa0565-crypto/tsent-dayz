import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedRelease from '@/components/FeaturedRelease';
import CatalogueSection from '@/components/CatalogueSection';
import StackedCards from '@/components/StackedCards';
import ArtistsRoster from '@/components/ArtistsRoster';
import CypherGallery from '@/components/CypherGallery';
import DemoSubmit from '@/components/DemoSubmit';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <FeaturedRelease />
      <CatalogueSection />
      <StackedCards />
      <ArtistsRoster />
      <CypherGallery />
      <DemoSubmit />
      <FooterSection />
    </main>
  );
}
