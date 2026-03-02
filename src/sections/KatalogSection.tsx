import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import FadeUp from "@/components/FadeUp";

interface KatalogSectionProps {
  className?: string;
}

const FILENAME = "2026-03-02_20-58-21";

const photos = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  src: `/katalog/photo_${i + 1}_${FILENAME}.webp`,
  alt: `Loyiha rasmi ${i + 1}`,
}));

const KatalogSection = ({ className = "" }: KatalogSectionProps) => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (id: number) => setLightbox(id);
  const closeLightbox = () => setLightbox(null);

  const prev = () =>
    setLightbox((cur) => (cur === 1 ? photos.length : (cur ?? 1) - 1));
  const next = () =>
    setLightbox((cur) => (cur === photos.length ? 1 : (cur ?? 1) + 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") closeLightbox();
  };

  const current = photos.find((p) => p.id === lightbox);

  return (
    <section
      id="katalog"
      className={`relative bg-[#14171C] py-20 lg:py-28 ${className}`}
    >
      <div className="px-6 lg:px-[8vw]">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <FadeUp delay={0}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FA] uppercase tracking-tight mb-4">
              KATALOG
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="accent-line w-16 mb-6" />
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base lg:text-lg text-[#A6AFBF] max-w-[600px]">
              Bizning ishlab chiqargan mahsulotlarimiz va loyihalarimizdan namunalar.
            </p>
          </FadeUp>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {photos.map((photo, i) => (
            <FadeUp key={photo.id} delay={(i % 6) * 0.06}>
              <button
                type="button"
                className="group relative w-full aspect-square overflow-hidden rounded-sm cursor-pointer bg-[#1a1d23] block"
                onClick={() => openLightbox(photo.id)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0B0C0F]/0 group-hover:bg-[#0B0C0F]/40 transition-colors duration-300" />
              </button>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && current && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-[#F4F6FA] hover:text-[#F2B33D] transition-colors"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>

          {/* Counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-sm text-[#A6AFBF]">
            {lightbox} / {photos.length}
          </p>

          {/* Prev */}
          <button
            className="absolute left-3 sm:left-6 z-10 w-12 h-12 flex items-center justify-center text-[#F4F6FA] hover:text-[#F2B33D] transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-3 sm:right-6 z-10 w-12 h-12 flex items-center justify-center text-[#F4F6FA] hover:text-[#F2B33D] transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
};

export default KatalogSection;
