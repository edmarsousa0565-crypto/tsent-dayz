'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/app/data.json';

gsap.registerPlugin(ScrollTrigger);

// Arco simétrico — rotações espelhadas esq/dir
// [0]NOTTAZ  [1]STANNA  [2]DC  [3]WESS  [4]PRODBYPAKKAZ
const ROTATIONS = [-6, 0, 6, -13, 13];
const ZINDEXES  = [23, 25, 23, 21, 21];

// left/top = CENTRO de cada card (via xPercent/yPercent -50 no GSAP).
// Perfeitamente simétrico em torno de left:50%.
// Arco apertado: tops 53% → 36% → 27%(apex) → 36% → 53%
const DESKTOP_POS: React.CSSProperties[] = [
  { left: '30%', top: '36%' }, // NOTTAZ — mid-esquerda
  { left: '50%', top: '27%' }, // STANNA — apex (centro exato)
  { left: '70%', top: '36%' }, // DC — mid-direita (espelho NOTTAZ: 100-30)
  { left: '12%', top: '53%' }, // WESS — extremo-esq, mais baixo
  { left: '88%', top: '53%' }, // PRODBYPAKKAZ — extremo-dir (espelho WESS: 100-12)
];

// Larguras em vw para escalar proporcionalmente; centro ligeiramente maior
const WIDTHS = ['16vw', '18vw', '16vw', '15vw', '15vw'];

export default function ArtistsRoster() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const mm = gsap.matchMedia();

      // Desktop — arco simétrico com rotação e entrada stagger
      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          '[data-artist-desktop]',
          sectionRef.current
        );

        // Centrar cada card no seu ponto (left/top) e aplicar rotação.
        // Corre sempre — mesmo com reduced-motion — para o arco ficar correto.
        cards.forEach((card, i) => {
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            rotation: ROTATIONS[i] ?? 0,
            transformOrigin: 'center center',
          });
        });

        if (prefersReduced) return;

        // Animação de entrada: sobe desde baixo com fade + stagger.
        // y (px) é aditivo ao yPercent:-50 da centragem.
        gsap.from(cards, {
          y: 60,
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
        if (prefersReduced) return;
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
              zIndex: ZINDEXES[i] ?? 20,
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
