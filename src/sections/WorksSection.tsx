import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WorksSectionProps {
  className?: string;
}

const WorksSection = ({ className = '' }: WorksSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Grid items animation
      const items = gridRef.current?.querySelectorAll('.work-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              end: 'top 35%',
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const works = [
    {
      image: '/work1.jpg',
      title: 'Sanoat ombori',
      description: 'Andijon viloyati, 2024',
    },
    {
      image: '/work2.jpg',
      title: 'Avtosalon',
      description: 'Toshkent, 2024',
    },
    {
      image: '/work3.jpg',
      title: 'Sport kompleksi',
      description: 'Farg‘ona, 2023',
    },
    {
      image: '/work4.jpg',
      title: 'Modul ofis',
      description: 'Namangan, 2023',
    },
    {
      image: '/work5.jpg',
      title: 'Ishlab chiqarish sexi',
      description: 'Andijon, 2023',
    },
    {
      image: '/work6.jpg',
      title: 'Issiqxona kompleksi',
      description: 'Sirdaryo, 2022',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="works"
      className={`relative bg-[#0B0C0F] py-20 lg:py-28 ${className}`}
    >
      <div className="relative z-10 px-6 lg:px-[8vw]">
        {/* Heading Block */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FA] uppercase tracking-tight mb-4">
            BAJARILGAN ISHLAR
          </h2>
          <div className="accent-line w-16 mb-6" />
          <p className="text-base lg:text-lg text-[#A6AFBF] max-w-[600px]">
                Bizning loyihalarimiz O‘zbekistonning turli hududlarida muvaffaqiyatli amalga oshirildi.
          </p>
        </div>

        {/* Works Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {works.map(({ image, title, description }) => (
            <div
              key={title}
              className="work-item group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="work-card-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#F4F6FA] mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-[#A6AFBF]">{description}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#F2B33D] rounded-sm flex items-center justify-center flex-shrink-0 ml-4">
                    <ArrowUpRight size={20} className="text-[#0B0C0F]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
