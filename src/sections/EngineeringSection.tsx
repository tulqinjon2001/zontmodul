import { useTranslation } from "react-i18next";

interface EngineeringSectionProps {
  className?: string;
}

const EngineeringSection = ({ className = "" }: EngineeringSectionProps) => {
  const { t } = useTranslation();
  return (
    <section className={`section-pinned ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/engineering_bg.jpg"
          alt="Engineering workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/55" />
      </div>

      {/* Diagonal Mask */}
      <div className="absolute inset-0 bg-[#14171C]/20" />

      {/* Content */}
      <div className="section-content relative z-10 h-full flex flex-col justify-center px-6 lg:px-[8vw]">
        {/* Headline Block */}
        <div className="max-w-[40vw] lg:max-w-[520px]">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]">
            {t("engineering.title")}
          </h2>

          {/* Accent Line */}
          <div className="accent-line w-20 mt-4 mb-6" />

          {/* Body */}
          <p className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-[34vw] lg:max-w-[460px]">
            {t("engineering.desc")}
          </p>
        </div>
      </div>

      {/* Right Side Stat */}
      <div className="hidden lg:block absolute right-[7vw] top-[44vh] w-[26vw]">
        <p className="text-right font-mono text-sm text-[#F2B33D] tracking-[0.12em]">
          {t("engineering.standards")}
        </p>
      </div>
    </section>
  );
};

export default EngineeringSection;
