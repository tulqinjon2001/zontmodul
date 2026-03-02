import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Xizmatlar", id: "services" },
    { label: "Ishlar", id: "works" },
    { label: "Katalog", id: "katalog" },
    { label: "Bog'lanish", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? "bg-[#0B0C0F]/90 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="w-full px-6 lg:px-[8vw] flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.png"
              alt="ZONT MODUL"
              className="h-14 w-14 object-contain"
            />
            <span className="font-mono text-lg tracking-[0.12em] font-medium text-[#F4F6FA]">
              ZONT MODUL
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-[#A6AFBF] hover:text-[#F4F6FA] transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary px-5 py-2.5 text-sm font-medium rounded-sm"
            >
              Zayavka Qoldirish
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F4F6FA] p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] bg-[#0B0C0F]/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <img
            src="/logo.webp"
            alt="ZONT MODUL"
            className="h-16 w-16 object-contain rounded-full mb-2"
          />
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-2xl font-display font-semibold text-[#F4F6FA] hover:text-[#F2B33D] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-primary px-8 py-3 text-lg font-medium rounded-sm mt-4"
          >
            Zayavka Qoldirish
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
