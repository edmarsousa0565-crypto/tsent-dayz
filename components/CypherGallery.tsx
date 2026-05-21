'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Fotos disponíveis — repetidas para preencher o mosaico denso */
const PHOTOS = [
  '/assets/cypher-29.jpg',
  '/assets/cypher-63.jpg',
  '/assets/cypher-119.jpg',
  '/assets/cypher-60.jpg',
  '/assets/nottaz.jpg',
  '/assets/cypher-30.jpg',
  '/assets/cypher-116.jpg',
];

// Tiles pequenos uniformes. 24 divide certo em 4/6/8 colunas (linhas sempre completas).
const TILE_COUNT = 24;
const TILES = Array.from({ length: TILE_COUNT }, (_, i) => ({
  src: PHOTOS[i % PHOTOS.length],
  pos: i % 3 === 0 ? 'object-top' : 'object-center',
}));

export default function CypherGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      gsap.from(headerRef.current!.children, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });

      const items = gridRef.current!.querySelectorAll<HTMLElement>('[data-tile]');
      gsap.from(items, {
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-brand">

      {/* Header — centrado */}
      <div ref={headerRef} className="mx-auto max-w-6xl px-6 pt-24 pb-10 text-center">
        <p className="text-white/80 text-xs font-bold tracking-widest uppercase mb-3">
          O Cypher · TSENT SYDAZ
        </p>
        <h2
          className="text-white uppercase leading-none"
          style={{
            fontFamily: 'var(--font-oswald), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            letterSpacing: '-0.02em',
          }}
        >
          A Cultura<br />em Foco
        </h2>
      </div>

      {/* Mosaico denso de tiles pequenos */}
      <div
        ref={gridRef}
        className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 auto-rows-[120px] md:auto-rows-[150px]"
        style={{ gap: '3px' }}
      >
        {TILES.map((tile, i) => (
          <div
            key={i}
            data-tile
            className="relative overflow-hidden bg-surface"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tile.src}
              alt="TSENT SYDAZ Cypher"
              className={`w-full h-full object-cover ${tile.pos} transition-transform duration-700 hover:scale-105`}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-400" />
          </div>
        ))}
      </div>

    </section>
  );
}
