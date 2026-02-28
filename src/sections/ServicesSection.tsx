import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardList, Factory, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection = ({ className = '' }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1,
          },
        }
      );

      // Cards animation with stagger
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: ClipboardList,
      title: 'Loyiha va hisoblash',
      description: 'Texnik vazifa, 3D-model, detallashtirish.',
    },
    {
      icon: Factory,
      title: 'Ishlab chiqarish',
      description: 'Metall konstruksiyalar, kosmik karkaslar, modul binolar.',
    },
    {
      icon: Truck,
      title: 'Yetkazib berish va o\'rnatish',
      description: 'O\'zbekiston bo\'ylab yetkazib berish va montaj.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`relative bg-[#14171C] py-20 lg:py-28 ${className}`}
    >
      {/* Topographic pattern background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M0 50 Q25 30 50 50 T100 50"
                fill="none"
                stroke="#F4F6FA"
                strokeWidth="0.5"
              />
              <path
                d="M0 70 Q25 50 50 70 T100 70"
                fill="none"
                stroke="#F4F6FA"
                strokeWidth="0.5"
              />
              <path
                d="M0 30 Q25 10 50 30 T100 30"
                fill="none"
                stroke="#F4F6FA"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      <div className="relative z-10 px-6 lg:px-[8vw]">
        {/* Heading Block */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FA] uppercase tracking-tight mb-4">
            XIZMATLAR
          </h2>
          <div className="accent-line w-16 mb-6" />
          <p className="text-base lg:text-lg text-[#A6AFBF] max-w-[600px]">
            Loyiha, ishlab chiqarish, yetkazib berish va o‘rnatish — to‘liq siklda xizmat.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="service-card p-6 lg:p-8 rounded-sm"
            >
              <div className="accent-line w-10 mb-6" />
              <Icon size={32} className="text-[#F2B33D] mb-4" />
              <h3 className="font-display text-xl font-semibold text-[#F4F6FA] mb-3">
                {title}
              </h3>
              <p className="text-sm text-[#A6AFBF] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
