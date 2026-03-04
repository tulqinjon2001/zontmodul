import FadeUp from "@/components/FadeUp";
import { useTranslation } from "react-i18next";

interface SpaceFrameSectionProps {
  className?: string;
}

const SpaceFrameSection = ({ className = "" }: SpaceFrameSectionProps) => {
  const { t } = useTranslation();
  const specs = [t("spaceFrame.spec1"), t("spaceFrame.spec2"), t("spaceFrame.spec3")];
  return (
    <section className={`section-pinned ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/spaceframe_bg.jpg"
          alt="Space frame structure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/60" />
      </div>

      {/* Diagonal Mask */}
      <div className="absolute inset-0 bg-[#14171C]/40" />

      {/* Content */}
      <div className="section-content relative z-10 h-full flex flex-col justify-center px-6 lg:px-[8vw]">
        <div className="max-w-[46vw] lg:max-w-[620px]">
          <FadeUp delay={0}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]">
              {t("spaceFrame.title")}
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="accent-line w-20 mt-4 mb-6" />
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-[36vw] lg:max-w-[500px]">
              {t("spaceFrame.desc")}
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.35}>
          <div className="mt-10 space-y-3">
            {specs.map((spec) => (
                <div key={spec} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#F2B33D]" />
                  <span className="font-mono text-sm text-[#A6AFBF] tracking-wide">
                    {spec}
                  </span>
                </div>
              ))}
          </div>
        </FadeUp>
      </div>

      {/* Right Side Supporting Line */}
      <div className="hidden lg:block absolute right-[7vw] top-[44vh] w-[26vw]">
        <FadeUp delay={0.3}>
          <p className="text-right text-lg text-[#F4F6FA] font-medium">
            {t("spaceFrame.tagline")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
};

export default SpaceFrameSection;
