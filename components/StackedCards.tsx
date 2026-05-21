'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic2, Star, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: 'artista',
    number: '01',
    title: 'Para o Artista',
    subtitle: 'Produção & Distribuição',
    body: 'Acesso direto ao estúdio, distribuição global e uma equipa dedicada ao teu crescimento. A TSENT SYDAZ é a tua casa.',
    Icon: Mic2,
    accent: '0% 0%',
  },
  {
    id: 'fa',
    number: '02',
    title: 'Para o Fã',
    subtitle: 'Acesso Exclusivo',
    body: 'Conteúdo behind-the-scenes, pré-lançamentos e acesso direto ao universo TSENT SYDAZ. Segue de perto a cultura.',
    Icon: Star,
    accent: '100% 0%',
  },
  {
    id: 'cultura',
    number: '03',
    title: 'Cultura TSENT',
    subtitle: 'Som & Identidade',
    body: 'Música que define as ruas. Do estúdio ao mundo — a TSENT SYDAZ representa uma geração com voz própria.',
    Icon: Flame,
    accent: '50% 100%',
  },
];

export default function StackedCards() {
  const outerRef  = useRef<HTMLDivElement>(null); // espaço de scroll alto
  const stickyRef = useRef<HTMLDivElement>(null); // container sticky (nativo, sem pin GSAP)
  const wrapperRef = useRef<HTMLDivElement>(null); // scope do useGSAP (inclui mobile)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const mm = gsap.matchMedia();

      // ── Desktop ──────────────────────────────────────────────────
      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]', stickyRef.current);
        const vh = window.innerHeight;

        if (prefersReduced) {
          // Sem animação: colapsar o espaço extra para não haver scroll preso.
          // O card 01 já está no topo pelo z-index invertido no JSX.
          gsap.set(outerRef.current, { height: '100vh' });
          return;
        }

        // Reordenar z-index para a animação: card 03 fica por cima (i+1)
        cards.forEach((card, i) => gsap.set(card, { zIndex: i + 1 }));

        // Cards 02 e 03 começam escondidos abaixo do viewport
        gsap.set(cards.slice(1), { yPercent: 108 });

        // Um ScrollTrigger por transição (sem pin GSAP — CSS sticky trata disso)
        cards.forEach((card, i) => {
          if (i === 0) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: outerRef.current,
              start: `top+=${(i - 1) * vh} top`,
              end:   `top+=${i * vh} top`,
              scrub: 0.4,
            },
          });

          // Card novo sobe durante toda a transição
          tl.to(card, { yPercent: 0, ease: 'none', duration: 1 }, 0);

          // fromTo garante que o GSAP sabe o valor inicial (brightness:1) —
          // sem isso o browser reporta filter:"none" e o GSAP interpola de 0→0.22
          // em vez de 1→0.22, causando o escurecimento instantâneo ("piscadela")
          tl.fromTo(
            cards[i - 1],
            { scale: 1, filter: 'brightness(1)' },
            { scale: 0.93, filter: 'brightness(0.22)', ease: 'none', duration: 0.75 },
            0.25
          );
        });
      });

      // ── Mobile — stagger fade-in ──────────────────────────────────
      mm.add('(max-width: 767px)', () => {
        if (prefersReduced) return;
        const mCards = gsap.utils.toArray<HTMLElement>('[data-card-mobile]', wrapperRef.current);
        gsap.from(mCards, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef}>
      {/* ── Desktop ──────────────────────────────────────────────── */}
      <div
        ref={outerRef}
        className="hidden md:block"
        style={{ height: `${CARDS.length * 100}vh` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen overflow-hidden"
        >
          {CARDS.map((card, i) => {
            const { Icon } = card;
            return (
              <div
                key={card.id}
                data-card
                className="absolute inset-6 lg:inset-10 rounded-3xl border border-border-subtle overflow-hidden"
                style={{
                  // Z-index invertido por defeito: card 01 fica no topo sem animação.
                  // O GSAP sobrescreve para a ordem da animação (card 03 mais alto).
                  zIndex: CARDS.length - i,
                  willChange: 'transform, filter',
                  background: `radial-gradient(ellipse 65% 55% at ${card.accent}, rgba(230,0,0,0.11) 0%, transparent 70%), #0A0A0A`,
                }}
              >
                <div className="flex flex-col justify-between w-full h-full p-10 lg:p-16">
                  {/* Topo */}
                  <div className="flex items-start justify-between">
                    <span className="text-text-muted text-xs font-bold tracking-widest uppercase">
                      {card.number}
                    </span>
                    <div className="p-3 rounded-full border border-border-subtle bg-black/30">
                      <Icon size={22} className="text-brand" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col gap-5 max-w-2xl">
                    <p className="text-text-muted text-sm font-semibold tracking-widest uppercase">
                      {card.subtitle}
                    </p>
                    <h3
                      className="font-bold text-text-main leading-none"
                      style={{
                        fontFamily: 'var(--font-oswald), sans-serif',
                        fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed max-w-lg" style={{ fontSize: '1.05rem' }}>
                      {card.body}
                    </p>
                  </div>

                  {/* Rodapé */}
                  <div className="w-16 h-px bg-brand opacity-60" />
                </div>
              </div>
            );
          })}

          {/* Pontos de progresso */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
            {CARDS.map((card) => (
              <div
                key={card.id}
                className="w-1.5 h-1.5 rounded-full bg-text-muted opacity-40"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile ───────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-5 px-4 py-20">
        {CARDS.map((card) => {
          const { Icon } = card;
          return (
            <div
              key={card.id}
              data-card-mobile
              className="rounded-3xl border border-border-subtle overflow-hidden p-8 min-h-[60vw]"
              style={{
                background: `radial-gradient(ellipse 70% 40% at ${card.accent}, rgba(230,0,0,0.09) 0%, transparent 70%), #0A0A0A`,
              }}
            >
              <div className="flex flex-col justify-between h-full gap-8">
                <div className="flex items-start justify-between">
                  <span className="text-text-muted text-xs font-bold tracking-widest uppercase">
                    {card.number}
                  </span>
                  <div className="p-3 rounded-full border border-border-subtle bg-black/30">
                    <Icon size={20} className="text-brand" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-text-muted text-xs font-semibold tracking-widest uppercase">
                    {card.subtitle}
                  </p>
                  <h3
                    className="font-bold text-text-main leading-tight"
                    style={{ fontFamily: 'var(--font-oswald), sans-serif', fontSize: '2.2rem' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{card.body}</p>
                </div>
                <div className="w-12 h-px bg-brand opacity-60" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
