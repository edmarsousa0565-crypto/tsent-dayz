'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import data from '@/app/data.json';

gsap.registerPlugin(ScrollTrigger);

/* ── Social SVG icons ───────────────────────────────────────────── */
function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.6 3 12 3 12 3s-4.6 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21.7 12 21.7 12 21.7s4.6 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.7 1.2-2.7 1.2-2.7s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l6.6 3.6-6.6 3.5z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: <IconInstagram />,
  TikTok:    <IconTikTok />,
  YouTube:   <IconYouTube />,
};

export default function FooterSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const footerRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReduced) return;

      // Primary service cards — stagger from bottom
      const primaryCards = cardsRef.current!.querySelectorAll<HTMLElement>(
        '[data-service-primary]'
      );
      gsap.from(primaryCards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // B2B links — subtle fade
      const b2bLinks = cardsRef.current!.querySelectorAll<HTMLElement>(
        '[data-service-b2b]'
      );
      gsap.from(b2bLinks, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: b2bLinks[0],
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      // Footer content — fade in
      const footerChildren = footerRef.current!.children;
      gsap.from(footerChildren, {
        opacity: 0,
        y: 15,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: sectionRef }
  );

  const { services, social } = data;

  return (
    <section ref={sectionRef} className="bg-background">

      {/* ── Services ────────────────────────────────────────────── */}
      <div ref={cardsRef} className="mx-auto max-w-6xl px-6 py-24">

        {/* Label */}
        <p className="text-text-muted text-xs font-bold tracking-widest uppercase mb-10">
          Explore · TSENT SYDAZ
        </p>

        {/* Primary cards — 2 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {services.primary.map((s) => (
            <Link
              key={s.id}
              href={s.url}
              data-service-primary
              className="
                group flex items-center justify-between
                p-8 rounded-2xl
                border border-border-subtle bg-surface
                backdrop-blur-sm
                transition-all duration-300
                hover:border-brand
                hover:shadow-[0_0_30px_rgba(230,0,0,0.08)]
              "
              style={{ willChange: 'border-color, box-shadow' }}
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-text-main text-xl tracking-tight">
                  {s.label}
                </h3>
                <p className="text-text-muted text-sm">{s.description}</p>
              </div>

              <div className="
                flex items-center gap-2 shrink-0 ml-6
                px-5 py-2.5 rounded-full
                border border-border-subtle text-text-muted text-sm font-semibold
                transition-all duration-300
                group-hover:border-brand group-hover:text-brand
              ">
                {s.cta}
                <ArrowUpRight size={14} strokeWidth={2} />
              </div>
            </Link>
          ))}
        </div>

        {/* B2B links — 2 col, smaller */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.b2b.map((s) => (
            <Link
              key={s.id}
              href={s.url}
              data-service-b2b
              className="
                group flex items-center justify-between
                px-7 py-5 rounded-xl
                border border-border-subtle
                transition-all duration-300
                hover:border-brand/50
              "
            >
              <span className="text-text-muted text-sm font-semibold tracking-wide transition-colors duration-300 group-hover:text-text-main">
                {s.label}
              </span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="text-border-subtle transition-colors duration-300 group-hover:text-brand"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border-subtle" />

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden bg-background">

        {/* Giant "TS" monogram watermark */}
        <div
          aria-hidden
          className="
            absolute inset-0 flex items-center justify-center
            pointer-events-none select-none
          "
        >
          <span
            className="font-bold text-text-main leading-none"
            style={{
              fontSize: 'clamp(18rem, 55vw, 52rem)',
              opacity: 0.025,
              letterSpacing: '-0.05em',
            }}
          >
            TS
          </span>
        </div>

        {/* Footer content */}
        <div
          ref={footerRef}
          className="relative z-10 mx-auto max-w-6xl px-6 py-16 flex flex-col gap-12"
        >
          {/* Top row: brand name + social */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-text-main text-2xl tracking-widest uppercase">
                TSENT SYDAZ
              </span>
              <span className="text-text-muted text-xs tracking-widest uppercase">
                Bop House · Rap · Trap · R&B
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {social.map((s) => (
                <Link
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="
                    p-3 rounded-full
                    border border-border-subtle text-text-muted
                    transition-all duration-200
                    hover:border-brand hover:text-brand
                    hover:shadow-[0_0_16px_rgba(230,0,0,0.3)]
                  "
                >
                  {SOCIAL_ICONS[s.platform]}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'Artistas',       href: '#artistas' },
              { label: 'Catálogo',       href: '#catalogo' },
              { label: 'Submeter Demo',  href: '#contactos' },
              { label: 'Bookings',       href: '#contactos' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-text-muted text-sm hover:text-text-main transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-border-subtle">
            <p className="text-text-muted text-xs">
              © {new Date().getFullYear()} TSENT SYDAZ. Todos os direitos reservados.
            </p>
            <p className="text-text-muted text-xs opacity-50">
              Produzido com 🩸 em Lisboa
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
