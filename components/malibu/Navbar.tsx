'use client';

import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "SHOP", href: "#shop" },
  { label: "DROPS", href: "#drops" },
  { label: "LOOKBOOK", href: "#lookbook" },
  { label: "SOBRE", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-ink"
          style={{ fontSize: "1.5rem", letterSpacing: "0.18em" }}
        >
          MALIBU
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-[11px] font-semibold tracking-widest uppercase text-text-muted hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Carrinho"
            className="relative p-1 text-ink hover:text-brand transition-colors duration-200"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand" />
          </button>
          <button
            className="md:hidden p-1 text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 font-sans text-[11px] font-semibold tracking-widest uppercase text-text-muted border-b border-border hover:text-ink hover:bg-surface transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
