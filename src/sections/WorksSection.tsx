import { useState, useEffect, useRef } from "react";
import { Loader2, ChevronLeft, ChevronRight, X } from "lucide-react";
import FadeUp from "@/components/FadeUp";
import { supabase } from "@/lib/supabase";

interface WorksSectionProps {
  className?: string;
}

interface WorkImage {
  id?: string;
  image_url: string;
  sort_order?: number;
}
interface Work {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  work_images?: WorkImage[];
}

function getWorkImages(w: Work): string[] {
  if (w.work_images?.length) {
    const sorted = [...w.work_images].sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
    );
    return sorted.map((i) => i.image_url);
  }
  if (w.image_url) return [w.image_url];
  return [];
}

const SLIDE_INTERVAL_MS = 4500;

function WorkSlideshow({
  images,
  title,
  className = "",
}: {
  images: string[];
  title: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length]);

  if (!images.length)
    return <div className={`aspect-[4/3] bg-[#14171C] ${className}`} />;

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-sm ${className}`}
    >
      {images.map((url, i) => (
        <img
          key={url}
          src={url}
          alt={title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-[#F2B33D]" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const WorksSection = ({ className = "" }: WorksSectionProps) => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    title: string;
    description?: string;
  } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    supabase
      .from("works")
      .select("*")
      .order("created_at", { ascending: false })
      .then(async ({ data: worksData, error: worksErr }) => {
        if (worksErr || !worksData) {
          setLoading(false);
          return;
        }
        const worksList = worksData as Work[];
        if (worksList.length === 0) {
          setWorks([]);
          setLoading(false);
          return;
        }
        const { data: imagesData, error: imagesErr } = await supabase
          .from("work_images")
          .select("id, work_id, image_url, sort_order")
          .in(
            "work_id",
            worksList.map((w) => w.id),
          );
        if (!imagesErr && imagesData?.length) {
          const byWorkId = imagesData.reduce<Record<string, WorkImage[]>>(
            (acc, img) => {
              const row = img as {
                work_id: string;
                id: string;
                image_url: string;
                sort_order: number;
              };
              if (!acc[row.work_id]) acc[row.work_id] = [];
              acc[row.work_id].push({
                id: row.id,
                image_url: row.image_url,
                sort_order: row.sort_order,
              });
              return acc;
            },
            {},
          );
          worksList.forEach((w) => {
            w.work_images = byWorkId[w.id] ?? [];
          });
        } else {
          worksList.forEach((w) => {
            w.work_images = [];
          });
        }
        setWorks(worksList);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft")
        setLightboxIndex(
          (i) => (i - 1 + lightbox.images.length) % lightbox.images.length,
        );
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i + 1) % lightbox.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (!loading && works.length === 0) return null;

  return (
    <section
      id="works"
      className={`relative bg-[#0B0C0F] py-20 lg:py-28 ${className}`}
    >
      <div className="relative z-10 px-6 lg:px-[8vw]">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <FadeUp delay={0}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F6FA] uppercase tracking-tight mb-4">
              BAJARILGAN ISHLAR
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="accent-line w-16 mb-6" />
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base lg:text-lg text-[#A6AFBF] max-w-[600px]">
              Bizning loyihalarimiz O'zbekistonning turli hududlarida
              muvaffaqiyatli amalga oshirildi.
            </p>
          </FadeUp>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 size={36} className="text-[#F2B33D] animate-spin" />
          </div>
        )}

        {/* Works Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((work, i) => {
              const images = getWorkImages(work);
              if (!images.length) return null;
              return (
                <FadeUp
                  key={work.id}
                  delay={(i % 3) * 0.15}
                  className="work-item group relative overflow-hidden rounded-sm cursor-pointer"
                  onClick={() => {
                    setLightbox({
                      images,
                      title: work.title,
                      description: work.description ?? "",
                    });
                    setLightboxIndex(0);
                  }}
                >
                  <WorkSlideshow
                    images={images}
                    title={work.title}
                    className="group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  {/* Always visible overlay */}
                  <div className="work-card-overlay absolute inset-0 flex flex-col justify-end p-5 rounded-sm pointer-events-none">
                    <h3 className="font-display text-lg font-semibold text-[#F4F6FA] mb-1">
                      {work.title}
                    </h3>
                    <p className="text-sm text-[#A6AFBF]">{work.description}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        )}

        {/* Lightbox — katta ko'rinish, chap/o'ng boshqaruv */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Rasmni yopish"
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-20"
                aria-label="Yopish"
              >
                <X size={24} />
              </button>

              <div className="relative w-full flex items-center justify-center bg-[#0B0C0F]/80 rounded-sm overflow-hidden">
                <img
                  src={lightbox.images[lightboxIndex]}
                  alt={lightbox.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
                {lightbox.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex(
                          (i) =>
                            (i - 1 + lightbox.images.length) %
                            lightbox.images.length,
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                      aria-label="Oldingi rasm"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex(
                          (i) => (i + 1) % lightbox.images.length,
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                      aria-label="Keyingi rasm"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}
              </div>

              {lightbox.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-3">
                  {lightbox.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i === lightboxIndex
                          ? "bg-[#F2B33D]"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Rasm ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="mt-3 text-center">
                <h3 className="font-display text-lg font-semibold text-[#F4F6FA]">
                  {lightbox.title}
                </h3>
                {lightbox.description && (
                  <p className="text-sm text-[#A6AFBF] mt-1">
                    {lightbox.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorksSection;
