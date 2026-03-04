import FadeUp from "@/components/FadeUp";
import { useTranslation } from "react-i18next";

interface QualitySectionProps {
  className?: string;
}

const QualitySection = ({ className = "" }: QualitySectionProps) => {
  const { t } = useTranslation();
  return (
    <section className={`section-pinned ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/quality_bg.jpg"
          alt="Quality control"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/55" />
      </div>

      {/* Diagonal Mask */}
      <div className="absolute inset-0 bg-[#14171C]/20" />

      {/* Content */}
      <div className="section-content relative z-10 h-full flex flex-col justify-center px-6 lg:px-[8vw]">
        <div className="max-w-[32vw] lg:max-w-[400px]">
          <FadeUp delay={0}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]">
              {t("quality.title")}
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="accent-line w-20 mt-4 mb-6" />
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-[30vw] lg:max-w-[400px]">
              {t("quality.desc")}
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Quality Note */}
      <div className="hidden lg:block absolute right-[7vw] top-[44vh] w-[22vw]">
        <FadeUp delay={0.3}>
          <p className="text-right font-mono text-sm text-[#F2B33D] tracking-[0.12em]">
            {t("quality.standards")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
};

export default QualitySection;
