import FadeUp from "@/components/FadeUp";

interface ManufacturingSectionProps {
  className?: string;
}

const ManufacturingSection = ({
  className = "",
}: ManufacturingSectionProps) => {
  const processes = ["Plazma kesish", "Porshen payvandlash", "Grit blosting"];

  return (
    <section className={`section-pinned ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/manufacturing_bg.jpg"
          alt="Manufacturing process"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0F]/55" />
      </div>

      {/* Diagonal Mask */}
      <div className="absolute inset-0 bg-[#14171C]/70 diagonal-mask" />

      {/* Content */}
      <div className="section-content relative z-10 h-full flex flex-col justify-center px-6 lg:px-[8vw]">
        <div className="max-w-[44vw] lg:max-w-[580px]">
          <FadeUp delay={0}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#F4F6FA] uppercase tracking-tight leading-[0.92]">
              ISHLAB CHIQARISH
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="accent-line w-20 mt-4 mb-6" />
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-base lg:text-lg text-[#A6AFBF] leading-relaxed max-w-[34vw] lg:max-w-[460px]">
              Zamonaviy uskunalar va tajribali ustalar.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Process List */}
      <div className="hidden lg:block absolute right-[7vw] top-[36vh] w-[22vw]">
        <div className="space-y-4">
          {processes.map((process, i) => (
            <FadeUp key={process} delay={0.2 + i * 0.1}>
              <div className="flex items-center gap-3 justify-end">
                <span className="font-mono text-sm text-[#F4F6FA] tracking-wide">
                  {process}
                </span>
                <div className="w-1.5 h-1.5 bg-[#F2B33D]" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturingSection;
