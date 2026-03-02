import FadeUp from "@/components/FadeUp";

interface EngineeringSectionProps {
  className?: string;
}

const EngineeringSection = ({ className = "" }: EngineeringSectionProps) => {
  return (
    <section className={`section-pinned ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/engineering_bg.webp"
          alt="Engineering workspace"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/55" />
      </div>

      {/* Diagonal Mask */}
      <div className="absolute inset-0 bg-[#14171C]/70 diagonal-mask" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[8vw]">
        <div className="max-w-[40vw] lg:max-w-[520px]">
          <FadeUp delay={0}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]">
              MUHANDISLIK
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="accent-line w-20 mt-4 mb-6" />
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-[34vw] lg:max-w-[460px]">
              Hisoblash, 3D-modeling, detallashtirish — bitta markazda.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Right Side Stat */}
      <div className="hidden lg:block absolute right-[8vw] top-1/2 -translate-y-1/2 w-[26vw]">
        <FadeUp delay={0.3}>
          <p className="text-right font-mono text-sm text-[#F2B33D] tracking-[0.12em]">
            ISO 9001 • SNiP/MMK standartlari
          </p>
        </FadeUp>
      </div>
    </section>
  );
};

export default EngineeringSection;
