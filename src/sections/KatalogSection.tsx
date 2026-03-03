import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import FadeUp from "@/components/FadeUp";
import { supabase, BUCKET, getPublicUrl } from "@/lib/supabase";

interface KatalogSectionProps {
  className?: string;
}

interface Photo {
  name: string;
  url: string;
}

const KatalogSection = ({ className = "" }: KatalogSectionProps) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    supabase.storage
      .from(BUCKET)
      .list("", { sortBy: { column: "created_at", order: "asc" } })
      .then(({ data, error }) => {
        if (error) {
          console.warn("Katalog:", error.message);
        } else if (data) {
          setPhotos(
            data
              .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f.name))
              .map((f) => ({ name: f.name, url: getPublicUrl(f.name) })),
          );
        }
        setLoading(false);
      });
  }, []);

  const prev = () =>
    setLightbox((i) => (i === 0 ? photos.length - 1 : (i ?? 0) - 1));
  const next = () =>
    setLightbox((i) => (i === photos.length - 1 ? 0 : (i ?? 0) + 1));

  const current = lightbox !== null ? photos[lightbox] : null;

  if (!loading && photos.length === 0) return null;

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
              Bizning ishlab chiqargan mahsulotlarimiz va loyihalarimizdan
              namunalar.
            </p>
          </FadeUp>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 size={36} className="text-[#F2B33D] animate-spin" />
          </div>
        )}

        {/* Photo Grid */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {photos.map((photo, i) => (
              <FadeUp key={photo.name} delay={(i % 6) * 0.06}>
                <button
                  type="button"
                  className="group relative w-full aspect-square overflow-hidden rounded-sm cursor-pointer bg-[#1a1d23] block"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={photo.url}
                    alt={`Katalog ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0B0C0F]/0 group-hover:bg-[#0B0C0F]/40 transition-colors duration-300" />
                </button>
              </FadeUp>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && current && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-[#F4F6FA] hover:text-[#F2B33D] transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>

          <p className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-sm text-[#A6AFBF]">
            {lightbox + 1} / {photos.length}
          </p>

          <button
            className="absolute left-3 sm:left-6 z-10 w-12 h-12 flex items-center justify-center text-[#F4F6FA] hover:text-[#F2B33D] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft size={36} />
          </button>

          <img
            src={current.url}
            alt={current.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-3 sm:right-6 z-10 w-12 h-12 flex items-center justify-center text-[#F4F6FA] hover:text-[#F2B33D] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
};

export default KatalogSection;
