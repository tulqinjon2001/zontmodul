import { ClipboardList, Factory, Truck } from "lucide-react";
import FadeUp from "@/components/FadeUp";

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection = ({ className = "" }: ServicesSectionProps) => {
  const services = [
    {
      icon: ClipboardList,
      title: "Loyiha va hisoblash",
      description: "Texnik vazifa, 3D-model, detallashtirish.",
    },
    {
      icon: Factory,
      title: "Ishlab chiqarish",
      description: "Metall konstruksiyalar, kosmik karkaslar, modul binolar.",
    },
    {
      icon: Truck,
      title: "Yetkazib berish va o'rnatish",
      description: "O'zbekiston bo'ylab yetkazib berish va montaj.",
    },
  ];

  return (
    <section
      id="services"
      className={`relative bg-[#14171C] py-20 lg:py-28 ${className}`}
    >
      {/* Topographic pattern background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="topo"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
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
        <div className="mb-12 lg:mb-16">
          <FadeUp delay={0}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FA] uppercase tracking-tight mb-4">
              XIZMATLAR
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="accent-line w-16 mb-6" />
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base lg:text-lg text-[#A6AFBF] max-w-[600px]">
              Loyiha, ishlab chiqarish, yetkazib berish va o'rnatish — to'liq
              siklda xizmat.
            </p>
          </FadeUp>
        </div>

        {/* Service Cards — stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description }, i) => (
            <FadeUp
              key={title}
              delay={i * 0.15}
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
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
