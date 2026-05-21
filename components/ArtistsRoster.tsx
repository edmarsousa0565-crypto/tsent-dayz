'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/app/data.json';

gsap.registerPlugin(ScrollTrigger);

const ROTATIONS = [6, -4, 5, -10, 9];

const DESKTOP_POS: React.CSSProperties[] = [
  { left: '13%',  top: '22%'   }, // NOTTAZ        — esquerda, mais para dentro
  { left: '33%',  top: '3%'   }, // STANNA        — centro topo destaque (maior)
  { right: '9%',  top: '8%'   }, // DC            — direita superior
  { left: '-5%',  bottom: '-22%' }, // WESS        — canto inf-esq, muito cortado
  { right: '-4%', bottom: '-18%' }, // PRODBYPAKKAZ — canto inf-dir, muito cortado
];

const WIDTHS = [188, 245, 165, 218, 208];

export default function ArtistsRoster() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const mm = gsap.matchMedia();

      // Desktop — cards espalhados com rotação e entrada stagger
      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          '[data-artist-desktop]',
          sectionRef.current
        );

        // Aplicar rotação final antes de animar
        cards.forEach((card, i) => {
          gsap.set(card, { rotation: ROTATIONS[i] ?? 0, transformOrigin: 'center center' });
        });

        // Animação de entrada: sobe desde baixo com fade + stagger
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });

        // Heading entra a partir do centro
        gsap.from('[data-roster-heading]', {
          opacity: 0,
          scale: 0.85,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Mobile — fade-in simples
      mm.add('(max-width: 767px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          '[data-artist-mobile]',
          sectionRef.current
        );
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const artists = data.artists;

  return (
    <section
      ref={sectionRef}
      id="artistas"
      className="relative bg-background overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Desktop ──────────────────────────────────────────────── */}
      <div className="hidden md:block relative w-full" style={{ height: '100vh' }}>

        {/* Heading — zona inferior, como no JoyJam */}
        <div
          data-roster-heading
          className="absolute bottom-0 left-0 right-0 flex flex-col items-center pointer-events-none z-10"
          style={{ paddingBottom: '6vh' }}
        >
          <p className="text-text-muted text-xs font-bold tracking-widest uppercase mb-4">
            TSENT SYDAZ · Label
          </p>
          <h2
            className="text-text-main uppercase leading-none text-center"
            style={{
              fontFamily: 'var(--font-oswald), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              letterSpacing: '-0.03em',
            }}
          >
            THE<br />ROSTER
          </h2>
          <p className="text-text-muted text-sm mt-4 text-center leading-relaxed">
            Os talentos que definem o som<br />da nova geração urbana.
          </p>
        </div>

        {/* Cards espalhados */}
        {artists.map((artist, i) => (
          <div
            key={artist.id}
            data-artist-desktop
            className="absolute group"
            style={{
              ...DESKTOP_POS[i],
              width: WIDTHS[i],
              willChange: 'transform',
              zIndex: 20,
            }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-[border-color] duration-300 group-hover:border-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: '3/4' }}
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                  const p = el.parentElement!;
                  p.style.background = 'linear-gradient(160deg,#1a0000,#0a0a0a)';
                  p.style.aspectRatio = '3/4';
                }}
              />
              {/* Badge de género */}
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-block bg-black/70 backdrop-blur-sm border border-white/10 text-text-muted text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full">
                  {artist.genre}
                </span>
              </div>
            </div>
            <p className="mt-2 text-text-main font-bold text-xs uppercase tracking-widest px-1">
              {artist.name}
            </p>
          </div>
        ))}
      </div>

      {/* ── Mobile ───────────────────────────────────────────────── */}
      <div className="md:hidden px-4 pt-16 pb-20">
        <div className="text-center mb-10">
          <p className="text-text-muted text-xs font-bold tracking-widest uppercase mb-3">
            TSENT SYDAZ · Label
          </p>
          <h2
            className="text-text-main uppercase leading-none"
            style={{ fontFamily: 'var(--font-oswald)', fontWeight: 700, fontSize: '3rem' }}
          >
            THE ROSTER
          </h2>
          <p className="text-text-muted text-sm mt-3">
            Os talentos da nova geração urbana.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {artists.map((artist) => (
            <div key={artist.id} data-artist-mobile>
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: '3/4' }}
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    const p = el.parentElement!;
                    p.style.background = 'linear-gradient(160deg,#1a0000,#0a0a0a)';
                    p.style.aspectRatio = '3/4';
                  }}
                />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="inline-block bg-black/70 text-text-muted text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full border border-white/10">
                    {artist.genre}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-text-main font-bold text-xs uppercase tracking-widest">
                {artist.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
