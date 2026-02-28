import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import SpaceFrameSection from './sections/SpaceFrameSection';
import ModularSection from './sections/ModularSection';
import EngineeringSection from './sections/EngineeringSection';
import ManufacturingSection from './sections/ManufacturingSection';
import QualitySection from './sections/QualitySection';
import ServicesSection from './sections/ServicesSection';
import WorksSection from './sections/WorksSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#0B0C0F]">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Pinned Sections */}
      <main className="relative">
        <HeroSection className="z-10" />
        <SpaceFrameSection className="z-20" />
        <ModularSection className="z-30" />
        <EngineeringSection className="z-40" />
        <ManufacturingSection className="z-50" />
        <QualitySection className="z-[60]" />
        
        {/* Flowing Sections */}
        <ServicesSection className="z-[70]" />
        <WorksSection className="z-[80]" />
        <ContactSection className="z-[90]" />
        <Footer className="z-[100]" />
      </main>
    </div>
  );
}

export default App;
