import { Instagram, MessageCircle, Send } from "lucide-react";
import FadeUp from "@/components/FadeUp";
import { useTranslation } from "react-i18next";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  const { t } = useTranslation();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { labelKey: "footer.home", id: "hero" },
    { labelKey: "footer.services", id: "services" },
    { labelKey: "footer.works", id: "works" },
    { labelKey: "footer.contact", id: "contact" },
  ];

  const socialLinks = [
    { icon: MessageCircle, label: "Telegram", href: "https://t.me/zontmodul" },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/zontmodul",
    },
    { icon: Send, label: "WhatsApp", href: "https://wa.me/998332144545" },
  ];

  return (
    <footer
      className={`relative bg-[#0d0f12] border-t border-[#F2B33D]/20 pt-12 pb-6 ${className}`}
    >
      <div className="px-6 lg:px-[8vw] max-w-full">
        <FadeUp delay={0}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            {/* Left — Brand */}
            <div>
              {/* Logo + Name */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.png"
                  alt="ZONT MODUL"
                  className="h-12 w-12 object-contain"
                />
                <span className="font-mono text-lg tracking-[0.12em] font-bold text-[#F4F6FA] uppercase">
                  {t("common.brand")}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#A6AFBF] leading-relaxed max-w-[360px] mb-6">
                {t("footer.description")}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-[#A6AFBF]/25 flex items-center justify-center text-[#A6AFBF] hover:border-[#F2B33D] hover:text-[#F2B33D] transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Quick Links */}
            <div className="md:pl-8">
              <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-[#F2B33D] mb-5">
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map(({ labelKey, id }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className="flex items-center gap-2 text-sm text-[#A6AFBF] hover:text-[#F4F6FA] transition-colors duration-200 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#F2B33D] opacity-60 group-hover:opacity-100 transition-opacity" />
                      {t(labelKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* Divider */}
        <div className="h-px bg-[#A6AFBF]/15 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2 text-xs text-center text-[#A6AFBF]/50">
          <p>{t("footer.copyright")}</p>
          <p>
            {(() => {
              const text = t("footer.madeBy");
              const idx = text.indexOf("Pinmap.uz");
              if (idx === -1) return text;
              return (
                <>
                  {text.slice(0, idx)}
                  <span className="text-[#F2B33D]">Pinmap.uz</span>
                  {text.slice(idx + "Pinmap.uz".length)}
                </>
              );
            })()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
