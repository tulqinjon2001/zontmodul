import { Zap, Truck, RefreshCw } from "lucide-react";
import FadeUp from "@/components/FadeUp";

interface ModularSectionProps {
  className?: string;
}

const ModularSection = ({ className = "" }: ModularSectionProps) => {
  const features = [
    { icon: Zap, text: "Tez montaj" },
    { icon: Truck, text: "Transport oson" },
    { icon: RefreshCw, text: "Qayta ishlatish mumkin" },
  ];

  return (
    <section className={`section-pinned ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/modular_bg.jpg"
          alt="Modular buildings"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/50" />
      </div>

      {/* Diagonal Mask */}
      <div className="absolute inset-0 bg-[#14171C]/20" />

      {/* Content */}
      <div className="section-content relative z-10 h-full flex flex-col justify-center px-6 lg:px-[8vw]">
        <div className="max-w-[44vw] lg:max-w-[580px]">
          <FadeUp delay={0}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]">
              MODUL BINOLAR
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="accent-line w-20 mt-4 mb-6" />
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-[34vw] lg:max-w-[460px]">
              Loyihadan ishga tushirishgacha — qisqa muddat.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Feature Card */}
      <div className="hidden lg:block absolute right-[6vw] top-[26vh] w-[24vw] max-w-[320px]">
        <FadeUp delay={0.3}>
          <div className="bg-[#0B0C0F]/55 border border-[#A6AFBF]/25 p-6">
            <div className="accent-line w-12 mb-6" />
            <div className="space-y-4">
              {features.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={18} className="text-[#F2B33D]" />
                  <span className="font-mono text-sm text-[#F4F6FA] tracking-wide">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default ModularSection;
