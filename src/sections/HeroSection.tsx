import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rightInfoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on page load
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background entrance
      loadTl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9 },
        0
      );

      // Diagonal mask entrance
      loadTl.fromTo(
        maskRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.1
      );

      // Headline word reveal
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        loadTl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.03 },
          0.2
        );
      }

      // Accent line
      loadTl.fromTo(
        accentLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5 },
        0.5
      );

      // Subheadline
      loadTl.fromTo(
        subheadlineRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.4
      );

      // CTA buttons
      loadTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.55
      );

      // Right info
      loadTl.fromTo(
        rightInfoRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        0.5
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, rightInfoRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(maskRef.current, { opacity: 1, x: 0 });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold (already visible from load animation)
      // SETTLE (30%-70%): Static

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        maskRef.current,
        { x: 0, opacity: 0.72 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightInfoRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_bg.jpg"
          alt="Industrial steel structure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/55" />
      </div>

      {/* Diagonal Mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 bg-[#14171C]/72 diagonal-mask"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[8vw]">
        {/* Headline Block */}
        <div className="max-w-[44vw] lg:max-w-[600px]">
          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]"
          >
            <span className="word inline-block">MUSTAHKAM</span>{' '}
            <span className="word inline-block">TUZILMALAR</span>
          </h1>
          
          {/* Accent Line */}
          <div
            ref={accentLineRef}
            className="accent-line w-24 mt-4 mb-6"
            style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
          />

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-[34vw] lg:max-w-[480px]"
            style={{ opacity: 0 }}
          >
            ZONT MODUL — sanoat va tijorat obyektlari uchun metall konstruksiyalar, 
            modul binolar va kosmik karkaslar.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center gap-4 mt-10"
          style={{ opacity: 0 }}
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-primary px-6 py-3.5 rounded-sm font-medium flex items-center gap-2"
          >
            <Phone size={18} />
            Zayavka qoldirish
          </button>
          <button
            onClick={() => scrollToSection('works')}
            className="btn-secondary px-6 py-3.5 rounded-sm font-medium flex items-center gap-2"
          >
            Ishlar bilan tanishish
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Right Side Info Strip */}
      <div
        ref={rightInfoRef}
        className="hidden lg:block absolute right-[6vw] top-[30vh] w-[22vw]"
        style={{ opacity: 0 }}
      >
        <div className="space-y-6">
          <div className="text-right">
            <p className="font-mono text-xs text-[#F2B33D] tracking-[0.12em] uppercase mb-1">
              Ishlab chiqarish
            </p>
            <p className="text-sm text-[#A6AFBF]">
              Zamonaviy texnologiyalar
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-[#F2B33D] tracking-[0.12em] uppercase mb-1">
              Yetkazib berish
            </p>
            <p className="text-sm text-[#A6AFBF]">
              O‘zbekiston bo‘ylab
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-[#F2B33D] tracking-[0.12em] uppercase mb-1">
              O‘rnatish
            </p>
            <p className="text-sm text-[#A6AFBF]">
              Professional montaj
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
