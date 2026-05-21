'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Mosaic layout — each item: col-span, row-span, object position */
const MOSAIC = [
  { src: '/assets/cypher-29.jpg',  col: 'col-span-2', row: 'row-span-2', pos: 'object-center' },
  { src: '/assets/cypher-63.jpg',  col: 'col-span-1', row: 'row-span-1', pos: 'object-top'    },
  { src: '/assets/cypher-119.jpg', col: 'col-span-1', row: 'row-span-1', pos: 'object-top'    },
  { src: '/assets/cypher-60.jpg',  col: 'col-span-1', row: 'row-span-2', pos: 'object-center' },
  { src: '/assets/nottaz.jpg',     col: 'col-span-1', row: 'row-span-1', pos: 'object-top'    },
  { src: '/assets/cypher-30.jpg',  col: 'col-span-2', row: 'row-span-1', pos: 'object-center' },
  { src: '/assets/cypher-116.jpg', col: 'col-span-1', row: 'row-span-1', pos: 'object-top'    },
];

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
    <section ref={sectionRef} className="bg-background">

      {/* Header — contained */}
      <div ref={headerRef} className="mx-auto max-w-6xl px-6 pt-24 pb-10">
        <p className="text-text-muted text-xs font-bold tracking-widest uppercase mb-3">
          O Cypher · TSENT SYDAZ
        </p>
        <h2
          className="text-text-main uppercase leading-none"
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

      {/* Full-width mosaic grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-4 auto-rows-[260px]"
        style={{ gap: '3px' }}
      >
        {MOSAIC.map((tile, i) => (
          <div
            key={i}
            data-tile
            className={`${tile.col} ${tile.row} relative overflow-hidden bg-surface`}
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
