import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SpaceFrameSectionProps {
  className?: string;
}

const SpaceFrameSection = ({ className = '' }: SpaceFrameSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const rightLineRef = useRef<HTMLParagraphElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
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
        { scale: 1.07, y: '6vh' },
        { scale: 1, y: 0, ease: 'none' },
        0
      );

      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        scrollTl.fromTo(
          words,
          { y: 28, opacity: 0 },
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
        rightLineRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        specsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30%-70%): Static

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
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
        rightLineRef.current,
        { x: 0, opacity: 1 },
        { x: '8vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        specsRef.current,
        { x: 0, opacity: 1 },
        { x: '-8vw', opacity: 0, ease: 'power2.in' },
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
        { scale: 1.06, y: '-5vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/spaceframe_bg.jpg"
          alt="Space frame structure"
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
        <div className="max-w-[46vw] lg:max-w-[620px]">
          <h2
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]"
          >
            <span className="word inline-block">KOSMIK</span>{' '}
            <span className="word inline-block">KARKASLAR</span>
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
            className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-[36vw] lg:max-w-[500px]"
          >
            Katta ochiqli binolar uchun optimal. Kam materiallar — maksimal mustahkamlik.
          </p>
        </div>

        {/* Specs List */}
        <div
          ref={specsRef}
          className="mt-10 space-y-3"
        >
          {['Kislovodsk tipi', 'Yengil vazn', 'Yuqori yuk ko‘rsatkichi'].map((spec) => (
            <div key={spec} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#F2B33D]" />
              <span className="font-mono text-sm text-[#A6AFBF] tracking-wide">{spec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Supporting Line */}
      <div className="hidden lg:block absolute right-[7vw] top-[44vh] w-[26vw]">
        <p
          ref={rightLineRef}
          className="text-right text-lg text-[#F4F6FA] font-medium"
        >
          Har qanday maydonda tez va yengil yechim.
        </p>
      </div>
    </section>
  );
};

export default SpaceFrameSection;
