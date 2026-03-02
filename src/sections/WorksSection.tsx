import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/FadeUp";

interface WorksSectionProps {
  className?: string;
}

const WorksSection = ({ className = "" }: WorksSectionProps) => {
  const works = [
    {
      image: "/work1.webp",
      title: "Sanoat ombori",
      description: "Andijon viloyati, 2024",
    },
    { image: "/work2.webp", title: "Avtosalon", description: "Toshkent, 2024" },
    {
      image: "/work3.webp",
      title: "Sport kompleksi",
      description: "Farg'ona, 2023",
    },
    {
      image: "/work4.webp",
      title: "Modul ofis",
      description: "Namangan, 2023",
    },
    {
      image: "/work5.webp",
      title: "Ishlab chiqarish sexi",
      description: "Andijon, 2023",
    },
    {
      image: "/work6.webp",
      title: "Issiqxona kompleksi",
      description: "Sirdaryo, 2022",
    },
  ];

  return (
    <section
      id="works"
      className={`relative bg-[#0B0C0F] py-20 lg:py-28 ${className}`}
    >
      <div className="relative z-10 px-6 lg:px-[8vw]">
        {/* Heading Block */}
        <div className="mb-12 lg:mb-16">
          <FadeUp delay={0}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FA] uppercase tracking-tight mb-4">
              BAJARILGAN ISHLAR
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="accent-line w-16 mb-6" />
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base lg:text-lg text-[#A6AFBF] max-w-[600px]">
              Bizning loyihalarimiz O'zbekistonning turli hududlarida
              muvaffaqiyatli amalga oshirildi.
            </p>
          </FadeUp>
        </div>

        {/* Works Grid — row-based stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map(({ image, title, description }, i) => (
            <FadeUp
              key={title}
              delay={(i % 3) * 0.15}
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
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
