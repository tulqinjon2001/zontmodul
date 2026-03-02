import { lazy, Suspense, useEffect } from 'react';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import './App.css';

// Below-fold sections lazily loaded
const SpaceFrameSection   = lazy(() => import('./sections/SpaceFrameSection'));
const EngineeringSection  = lazy(() => import('./sections/EngineeringSection'));
const ManufacturingSection = lazy(() => import('./sections/ManufacturingSection'));
const QualitySection      = lazy(() => import('./sections/QualitySection'));
const ServicesSection     = lazy(() => import('./sections/ServicesSection'));
const WorksSection        = lazy(() => import('./sections/WorksSection'));
const KatalogSection      = lazy(() => import('./sections/KatalogSection'));
const ContactSection      = lazy(() => import('./sections/ContactSection'));
const Footer              = lazy(() => import('./sections/Footer'));

function App() {
  // Prefetch below-fold chunks after hero is interactive
  useEffect(() => {
    const timer = setTimeout(() => {
      import('./sections/SpaceFrameSection');
      import('./sections/ServicesSection');
      import('./sections/ContactSection');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-[#0B0C0F]">
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative">
        {/* Hero — immediately loaded */}
        <HeroSection />

        {/* Rest — lazy loaded */}
        <Suspense fallback={null}>
          <SpaceFrameSection />
          <EngineeringSection />
          <ManufacturingSection />
          <QualitySection />
          <ServicesSection />
          <WorksSection />
          <KatalogSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
