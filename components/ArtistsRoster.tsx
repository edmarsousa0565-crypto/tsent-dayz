'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/app/data.json';

gsap.registerPlugin(ScrollTrigger);

export default function ArtistsRoster() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReduced) return;

      const cards = gridRef.current!.querySelectorAll<HTMLElement>('[data-artist-card]');

      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: {
          each: 0.12,
          from: 'start',
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="artistas"
      className="bg-background py-24 px-6"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-text-muted text-xs font-bold tracking-widest uppercase mb-3">
              TSENT SYDAZ · Label
            </p>
            <h2
              className="font-bold text-text-main leading-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
            >
              THE ROSTER
            </h2>
          </div>
          <p className="text-text-muted text-sm leading-relaxed max-w-xs sm:text-right">
            Os talentos que definem o som da nova geração urbana.
          </p>
        </div>

        {/* Artist grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Artist card ────────────────────────────────────────────────── */
function ArtistCard({
  artist,
}: {
  artist: (typeof data.artists)[number];
}) {
  return (
    <article
      data-artist-card
      className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface cursor-pointer"
      style={{ willChange: 'transform' }}
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = 'none';
            const parent = el.parentElement!;
            parent.style.background =
              'linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)';
          }}
        />

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Artist info — sits over the gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-bold text-text-main uppercase tracking-wider leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}
          >
            {artist.name}
          </h3>
          <p className="mt-1 text-text-muted text-xs font-semibold tracking-widest uppercase">
            {artist.genre}
          </p>
        </div>
      </div>

      {/* Brand border accent — hidden by default, slides in on hover */}
      <div
        className="
          absolute inset-0 rounded-2xl pointer-events-none
          border-2 border-brand opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Bottom crimson line — always hinted, glows on hover */}
      <div
        className="
          absolute bottom-0 left-0 right-0 h-px
          bg-brand opacity-20
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />
    </article>
  );
}
