import { ArrowRight, Phone } from "lucide-react";
import FadeUp from "@/components/FadeUp";
import { useTranslation } from "react-i18next";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = "" }: HeroSectionProps) => {
  const { t } = useTranslation();
  return (
    <section id="hero" className={`section-pinned ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero_bg.webp"
          alt="Industrial steel structure"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/55" />
      </div>

      {/* Diagonal Mask */}
      <div className="absolute inset-0 bg-[#14171C]/72 diagonal-mask" />

      {/* Content — mobilda navbar ostida, kengroq */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-[8vw] pt-36 pb-12 lg:pt-0 lg:pb-0">
        <div className="w-full max-w-[600px]">
          <FadeUp delay={0}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]">
              {t("hero.title")}
            </h1>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="accent-line w-24 mt-4 mb-6" />
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-full lg:max-w-[480px]">
              {t("hero.subtitle")}
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.4}>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary px-6 py-3.5 rounded-sm font-medium flex items-center gap-2"
            >
              <Phone size={18} />
              {t("hero.leaveRequest")}
            </button>
            <button
              onClick={() => scrollToSection("works")}
              className="btn-secondary px-6 py-3.5 rounded-sm font-medium flex items-center gap-2"
            >
              {t("hero.viewWorks")}
              <ArrowRight size={18} />
            </button>
          </div>
        </FadeUp>
      </div>

      {/* Right Side Info Strip */}
      <div className="hidden lg:block absolute right-[8vw] top-1/2 -translate-y-1/2 w-[22vw]">
        <FadeUp delay={0.5}>
          <div className="space-y-6">
            <div className="text-right">
              <p className="font-mono text-xs text-[#F2B33D] tracking-[0.12em] uppercase mb-1">
                {t("hero.production")}
              </p>
              <p className="text-sm text-[#A6AFBF]">{t("hero.productionDesc")}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-[#F2B33D] tracking-[0.12em] uppercase mb-1">
                {t("hero.delivery")}
              </p>
              <p className="text-sm text-[#A6AFBF]">{t("hero.deliveryDesc")}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-[#F2B33D] tracking-[0.12em] uppercase mb-1">
                {t("hero.installation")}
              </p>
              <p className="text-sm text-[#A6AFBF]">{t("hero.installationDesc")}</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default HeroSection;
