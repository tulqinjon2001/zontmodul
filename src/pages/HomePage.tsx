import { lazy, Suspense, useEffect } from 'react';
import Navbar from '../sections/Navbar';
import HeroSection from '../sections/HeroSection';

const SpaceFrameSection    = lazy(() => import('../sections/SpaceFrameSection'));
const EngineeringSection   = lazy(() => import('../sections/EngineeringSection'));
const ManufacturingSection = lazy(() => import('../sections/ManufacturingSection'));
const QualitySection       = lazy(() => import('../sections/QualitySection'));
const ServicesSection      = lazy(() => import('../sections/ServicesSection'));
const WorksSection         = lazy(() => import('../sections/WorksSection'));
const KatalogSection       = lazy(() => import('../sections/KatalogSection'));
const ContactSection       = lazy(() => import('../sections/ContactSection'));
const Footer               = lazy(() => import('../sections/Footer'));

const HomePage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      import('../sections/SpaceFrameSection');
      import('../sections/ServicesSection');
      import('../sections/ContactSection');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-[#0B0C0F]">
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative">
        <HeroSection />
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
};

export default HomePage;
