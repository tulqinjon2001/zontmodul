import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Clock, Mail, Send, Instagram, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Form column animation
      gsap.fromTo(
        formRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Contact column animation
      gsap.fromTo(
        contactRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDialog(true);
    setFormData({ name: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Telefon',
      value: '+998 33 214 45 45',
      href: 'tel:+998332144545',
    },
    {
      icon: MapPin,
      label: 'Manzil',
      value: 'Andijon shahar, Asaka yo\'li ko\'chasi 124',
      href: '#',
    },
    {
      icon: Clock,
      label: 'Ish vaqti',
      value: 'Har kuni 08:00 – 21:00',
      href: '#',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'zontmodul@gmail.com',
      href: 'mailto:zontmodul@gmail.com',
    },
  ];

  const socialLinks = [
    { icon: MessageCircle, label: 'Telegram', href: 'https://t.me/zontmodul' },
    { icon: Phone, label: 'WhatsApp', href: 'https://wa.me/998332144545' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/zontmodul' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-[#0B0C0F] py-20 lg:py-28 ${className}`}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.08]">
        <img
          src="/quality_bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/72" />
      </div>

      <div className="relative z-10 px-6 lg:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form Column */}
          <div ref={formRef}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FA] uppercase tracking-tight mb-4">
              BOG‘LANISH
            </h2>
            <div className="accent-line w-16 mb-8" />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-[#A6AFBF] mb-2">Ism</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ismingizni kiriting"
                  className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#A6AFBF] mb-2">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+998 __ ___ __ __"
                  className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#A6AFBF] mb-2">Xabar</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Xabaringizni yozing..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full px-6 py-4 rounded-sm font-medium flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Yuborish
              </button>
            </form>
          </div>

          {/* Contact Column */}
          <div ref={contactRef} className="lg:pt-16">
            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#14171C] border border-[#A6AFBF]/25 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-[#F2B33D]/40 transition-colors">
                    <Icon size={20} className="text-[#F2B33D]" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#A6AFBF] tracking-wide uppercase mb-1">
                      {label}
                    </p>
                    <p className="text-[#F4F6FA] group-hover:text-[#F2B33D] transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-8 border-t border-[#A6AFBF]/20">
              <p className="font-mono text-xs text-[#A6AFBF] tracking-wide uppercase mb-4">
                Ijtimoiy tarmoqlar
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#14171C] border border-[#A6AFBF]/25 rounded-sm flex items-center justify-center hover:border-[#F2B33D]/40 hover:bg-[#F2B33D]/10 transition-all"
                    aria-label={label}
                  >
                    <Icon size={20} className="text-[#F4F6FA]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#14171C] border-[#A6AFBF]/25 text-[#F4F6FA]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-semibold">
              Rahmat!
            </DialogTitle>
            <DialogDescription className="text-[#A6AFBF]">
              Sizning so‘rovingiz qabul qilindi. Tez orada siz bilan bog‘lanamiz.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <button
              onClick={() => setShowDialog(false)}
              className="btn-primary w-full px-6 py-3 rounded-sm font-medium"
            >
              Yopish
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;
