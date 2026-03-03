import { useState } from "react";
import FadeUp from "@/components/FadeUp";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const TG_BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN as string;
const TG_CHAT_ID = import.meta.env.VITE_TG_CHAT_ID as string;

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = "" }: ContactSectionProps) => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const text =
      `📩 Yangi zayavka — ZONT MODUL\n\n` +
      `👤 Ism: ${form.name}\n` +
      `📞 Telefon: ${form.phone}\n` +
      `💬 Qo'shimcha: ${form.message || "—"}`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TG_CHAT_ID, text }),
        },
      );
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Manzil",
      value: "Andijon shahar, Asaka yo'li ko'chasi 124",
      href: "https://yandex.uz/maps/?text=Andijon+shahar",
    },
    {
      icon: Phone,
      label: "Telefon",
      value: "+998 33 214 45 45",
      href: "tel:+998332144545",
      highlight: true,
    },
    {
      icon: Clock,
      label: "Ish vaqti",
      value: "Har kuni 08:00 – 21:00",
      href: "#",
    },
    {
      icon: Mail,
      label: "Email",
      value: "zontmodul@gmail.com",
      href: "mailto:zontmodul@gmail.com",
    },
  ];

  return (
    <section
      id="contact"
      className={`relative bg-[#0B0C0F] py-20 lg:py-28 ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.05]">
        <img
          src="/quality_bg.webp"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/80" />
      </div>

      <div className="relative z-10 px-6 lg:px-[8vw]">
        {/* ── Sarlavha ── */}
        <FadeUp delay={0}>
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-4">
              <span className="text-[#F4F6FA]">BOG'LANISH </span>
              <span className="text-[#F2B33D]">UCHUN MANZIL</span>
            </h2>
            <p className="text-[#A6AFBF] text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              Ma'lumotlarimizni saqlab qo'ying, siz uchun qulay vaqtda
              qo'ng'iroq qilishimiz mumkin.
            </p>
          </div>
        </FadeUp>

        {/* ── Zayavka formasi (markazda) ── */}
        <FadeUp delay={0.15}>
          <div className="max-w-2xl mx-auto mb-12 bg-[#14171C] border border-[#A6AFBF]/15 rounded-sm p-8">
            <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-[#F2B33D] mb-2">
              ZAYAVKA QOLDIRISH
            </h3>
            <div className="accent-line w-12 mb-6" />

            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle2 size={48} className="text-[#F2B33D]" />
                <p className="text-[#F4F6FA] font-medium text-lg">
                  Zayavkangiz qabul qilindi!
                </p>
                <p className="text-[#A6AFBF] text-sm">
                  Tez orada siz bilan bog'lanamiz.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-[#F2B33D] underline underline-offset-2"
                >
                  Yana yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#A6AFBF] mb-1.5 uppercase tracking-wide">
                      Ism *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Ismingizni kiriting"
                      className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/40 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A6AFBF] mb-1.5 uppercase tracking-wide">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+998 __ ___ __ __"
                      className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/40 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#A6AFBF] mb-1.5 uppercase tracking-wide">
                    Qo'shimcha ma'lumot
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Loyiha haqida qisqacha ma'lumot..."
                    className="w-full px-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/40 text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full py-3.5 rounded-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {status === "loading"
                    ? "Yuborilmoqda..."
                    : "Zayavka Qoldirish"}
                </button>
              </form>
            )}
          </div>
        </FadeUp>

        {/* ── Kontakt + Xarita ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Kontakt karta */}
          <FadeUp delay={0.2}>
            <div className="bg-[#14171C] border border-[#A6AFBF]/15 rounded-sm p-8 h-full">
              <h3 className="font-mono text-xs tracking-[0.18em] uppercase text-[#F2B33D] mb-2">
                KONTAKT MA'LUMOTLAR
              </h3>
              <div className="accent-line w-12 mb-6" />
              <p className="text-sm text-[#A6AFBF] mb-8 leading-relaxed">
                Konstruksiya buyurtma qilish yoki savol berish uchun quyidagi
                ma'lumotlar orqali bog'lanishingiz mumkin.
              </p>

              <div className="space-y-5">
                {contactInfo.map(
                  ({ icon: Icon, label, value, href, highlight }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-full bg-[#F2B33D]/10 border border-[#F2B33D]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F2B33D]/20 transition-colors">
                        <Icon size={18} className="text-[#F2B33D]" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-[#A6AFBF] uppercase mb-0.5">
                          {label}
                        </p>
                        <p
                          className={`text-sm font-medium leading-snug transition-colors ${
                            highlight
                              ? "text-[#F2B33D]"
                              : "text-[#F4F6FA] group-hover:text-[#F2B33D]"
                          }`}
                        >
                          {value}
                        </p>
                      </div>
                    </a>
                  ),
                )}
              </div>
            </div>
          </FadeUp>

          {/* Xarita */}
          <FadeUp delay={0.3}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=72.314337%2C40.713851&mode=search&oid=125406941870&ol=biz&z=17"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: 12 }}
              allowFullScreen
              loading="lazy"
              title="ZONT MODUL manzili"
            ></iframe>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
