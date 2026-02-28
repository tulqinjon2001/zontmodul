import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Truck, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ModularSectionProps {
  className?: string;
}

const ModularSection = ({ className = '' }: ModularSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const featureCardRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        maskRef.current,
        { x: '-70vw', opacity: 0 },
        { x: 0, opacity: 0.72, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08, y: '8vh' },
        { scale: 1, y: 0, ease: 'none' },
        0
      );

      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        scrollTl.fromTo(
          words,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        );
      }

      scrollTl.fromTo(
        accentLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        featureCardRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // SETTLE (30%-70%): Static

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        accentLineRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        featureCardRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.73
      );

      scrollTl.fromTo(
        maskRef.current,
        { x: 0, opacity: 0.72 },
        { x: '-45vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Zap, text: 'Tez montaj' },
    { icon: Truck, text: 'Transport oson' },
    { icon: RefreshCw, text: 'Qayta ishlatish mumkin' },
  ];

  return (
    <section
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/modular_bg.jpg"
          alt="Modular buildings"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/50" />
      </div>

      {/* Diagonal Mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 bg-[#14171C]/70 diagonal-mask"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[8vw]">
        {/* Headline Block */}
        <div className="max-w-[44vw] lg:max-w-[580px]">
          <h2
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]"
          >
            <span className="word inline-block">MODUL</span>{' '}
            <span className="word inline-block">BINOLAR</span>
          </h2>
          
          {/* Accent Line */}
          <div
            ref={accentLineRef}
            className="accent-line w-20 mt-4 mb-6"
            style={{ transformOrigin: 'left' }}
          />

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-[34vw] lg:max-w-[460px]"
          >
            Loyihadan ishga tushirishgacha — qisqa muddat.
          </p>
        </div>
      </div>

      {/* Feature Card */}
      <div
        ref={featureCardRef}
        className="hidden lg:block absolute right-[6vw] top-[26vh] w-[24vw] max-w-[320px]"
      >
        <div className="bg-[#0B0C0F]/55 border border-[#A6AFBF]/25 p-6">
          <div className="accent-line w-12 mb-6" />
          <div className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon size={18} className="text-[#F2B33D]" />
                <span className="font-mono text-sm text-[#F4F6FA] tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModularSection;
