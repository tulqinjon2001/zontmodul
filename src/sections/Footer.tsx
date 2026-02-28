import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, MessageCircle, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );

      // Links animation
      const links = linksRef.current?.querySelectorAll('a');
      if (links) {
        gsap.fromTo(
          links,
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 80%',
              end: 'top 55%',
              scrub: 1,
            },
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Xizmatlar', id: 'services' },
    { label: 'Ishlar', id: 'works' },
    { label: 'Bog‘lanish', id: 'contact' },
  ];

  const socialLinks = [
    { icon: MessageCircle, label: 'Telegram', href: 'https://t.me/zontmodul' },
    { icon: Phone, label: 'WhatsApp', href: 'https://wa.me/998332144545' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/zontmodul' },
  ];

  return (
    <footer
      ref={footerRef}
      className={`relative bg-[#14171C] py-12 lg:py-16 ${className}`}
    >
      <div className="relative z-10 px-6 lg:px-[8vw]">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div ref={logoRef} className="mb-8">
            <span className="font-mono text-2xl lg:text-3xl tracking-[0.12em] font-medium text-[#F4F6FA]">
              ZONT MODUL
            </span>
          </div>

          {/* Navigation Links */}
          <div
            ref={linksRef}
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 mb-8"
          >
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="font-mono text-sm text-[#A6AFBF] hover:text-[#F4F6FA] tracking-wide uppercase transition-colors"
              >
                {label}
              </button>
            ))}
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[#A6AFBF] hover:text-[#F4F6FA] tracking-wide uppercase transition-colors flex items-center gap-2"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-[#A6AFBF]/20 mb-6" />

          {/* Copyright */}
          <p className="text-sm text-[#A6AFBF]/70 text-center">
            © 2026 ZONT MODUL. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
