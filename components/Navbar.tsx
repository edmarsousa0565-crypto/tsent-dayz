'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Artistas', href: '/#artistas' },
  { label: 'Catálogo', href: '/#catalogo' },
  { label: 'Contactos', href: '/#contactos' },
];

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
      <div
        className="
          flex items-center justify-between
          px-5 py-3
          rounded-full
          border border-border-subtle
          bg-surface/70
          backdrop-blur-md
        "
        style={{ WebkitBackdropFilter: 'blur(12px)' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="TSENT SYDAZ"
            className="h-7 w-auto"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-text-main font-bold text-base tracking-widest uppercase">
            TSENT SYDAZ
          </span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="
                  text-text-muted text-sm font-medium
                  transition-colors duration-300
                  hover:text-text-main
                "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA — Demo */}
        <Link
          href="/#contactos"
          className="
            shrink-0 px-5 py-2 rounded-full
            text-sm font-semibold text-text-main
            border border-border-subtle
            transition-all duration-300
            hover:bg-brand hover:border-brand
          "
        >
          Submeter Demo
        </Link>
      </div>
    </nav>
  );
}
