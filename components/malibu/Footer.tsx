import { Globe, AtSign } from "lucide-react";

const LINKS = [
  { label: "Shop",      href: "#shop" },
  { label: "Drops",     href: "#drops" },
  { label: "Lookbook",  href: "#lookbook" },
  { label: "Sobre",     href: "#about" },
  { label: "Contacto",  href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white px-6 md:px-20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">

        {/* Big logo */}
        <div className="text-center mb-14">
          <span
            className="font-display font-bold text-white"
            style={{
              fontSize: "clamp(4.5rem, 18vw, 12rem)",
              letterSpacing: "0.06em",
              lineHeight: 0.9,
            }}
          >
            MALIBU
          </span>
        </div>

        <div className="h-px bg-white/8 mb-10" />

        {/* Nav + Social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-8">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[11px] font-semibold tracking-widest uppercase text-white/35 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/35 hover:text-white hover:border-white/30 transition-all duration-200 font-sans text-[10px] font-bold tracking-wider"
            >
              <AtSign size={15} />
            </a>
            <a
              href="#"
              aria-label="Website"
              className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/35 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              <Globe size={15} />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] tracking-widest uppercase text-white/20">
            © 2026 MALIBU. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            {["Privacidade", "Termos"].map((t) => (
              <a
                key={t}
                href="#"
                className="font-sans text-[10px] tracking-widest uppercase text-white/20 hover:text-white/40 transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
