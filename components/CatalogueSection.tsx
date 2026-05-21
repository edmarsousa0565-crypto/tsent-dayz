'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Play, Plus, Music2 } from 'lucide-react';
import data from '@/app/data.json';

gsap.registerPlugin(ScrollTrigger);

export default function CatalogueSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      gsap.from(contentRef.current!.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: sectionRef }
  );

  const { catalogue, artists } = data;

  return (
    <section ref={sectionRef} id="catalogo" className="bg-background py-24 px-6">
      <div ref={contentRef} className="mx-auto max-w-6xl flex flex-col gap-10">

        {/* ── Eyebrow ── */}
        <div>
          <p className="text-text-muted text-xs font-bold tracking-widest uppercase mb-2">
            Catálogo · TSENT SYDAZ
          </p>
          <h2
            className="text-text-main uppercase leading-none"
            style={{
              fontFamily: 'var(--font-oswald), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            New Releases
          </h2>
        </div>

        {/* ── Featured card + Now Playing ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

          {/* Featured card */}
          <div
            className="relative rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-end p-8"
            style={{
              background: 'linear-gradient(135deg, #1a0000 0%, #3d0000 40%, #0a0a0a 100%)',
            }}
          >
            {/* Artist photo — right side */}
            <div className="absolute right-0 top-0 bottom-0 w-2/5 md:w-1/3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={catalogue.featured.cover}
                alt={catalogue.featured.artist}
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, #1a0000 0%, transparent 60%)' }}
              />
            </div>

            {/* Text */}
            <div className="relative z-10 max-w-[60%]">
              <span className="text-brand text-[10px] font-bold tracking-widest uppercase mb-3 block">
                {catalogue.featured.label}
              </span>
              <h3
                className="text-text-main font-bold leading-tight mb-2"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontFamily: 'var(--font-oswald)' }}
              >
                {catalogue.featured.title}
              </h3>
              <p className="text-text-muted text-sm mb-1">{catalogue.featured.artist}</p>
              <p className="text-text-muted/60 text-xs leading-relaxed max-w-xs">
                {catalogue.featured.description}
              </p>

              <Link
                href={`https://youtu.be/${catalogue.featured.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 mt-5
                  px-6 py-2.5 rounded-full
                  bg-brand text-text-main text-sm font-bold
                  transition-all duration-300 hover:bg-brand/80
                "
              >
                <Play size={14} fill="white" />
                Ouvir Agora
              </Link>
            </div>
          </div>

          {/* Now Playing panel */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 text-text-muted text-xs font-bold tracking-widest uppercase">
              <span className="flex gap-[3px] items-end h-4">
                {[1,2,3,4].map(b => (
                  <span
                    key={b}
                    className="w-[3px] bg-brand rounded-full animate-pulse"
                    style={{ height: `${[10, 16, 8, 14][b-1]}px`, animationDelay: `${b * 0.15}s` }}
                  />
                ))}
              </span>
              Now Playing
            </div>

            {/* Now playing cover */}
            <div className="rounded-xl overflow-hidden aspect-square bg-background">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={catalogue.featured.cover}
                alt={catalogue.featured.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div>
              <p className="text-text-main font-bold text-base">{catalogue.featured.title}</p>
              <p className="text-text-muted text-sm">{catalogue.featured.artist}</p>
            </div>

            {/* Progress bar */}
            <div className="flex flex-col gap-1">
              <div className="w-full h-1 bg-border-subtle rounded-full overflow-hidden">
                <div className="h-full w-2/5 bg-brand rounded-full" />
              </div>
              <div className="flex justify-between text-text-muted text-[10px]">
                <span>1:21</span>
                <span>3:24</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Artistas ── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-text-main font-bold text-base">Artistas</p>
            <Link href="#artistas" className="text-text-muted text-xs hover:text-text-main transition-colors">
              Ver todos
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-none">
            {artists.map((a) => (
              <div key={a.id} className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border-subtle hover:border-brand transition-colors duration-300 bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-text-muted text-xs font-medium text-center whitespace-nowrap">
                  {a.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Track list ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-main font-bold text-base">Catálogo</p>
          </div>

          <div className="flex flex-col divide-y divide-border-subtle">
            {catalogue.tracks.map((track, i) => (
              <div
                key={track.id}
                className="
                  flex items-center gap-4 py-3
                  group cursor-pointer
                  hover:bg-surface/60 rounded-xl px-3 -mx-3
                  transition-colors duration-200
                "
                onClick={() => setPlaying(playing === track.id ? null : track.id)}
              >
                {/* Thumbnail */}
                <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-surface shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {playing === track.id
                      ? <span className="flex gap-[2px] items-end h-3">
                          {[1,2,3].map(b => (
                            <span key={b} className="w-[2px] bg-brand rounded-full animate-pulse"
                              style={{ height: `${[8,12,6][b-1]}px` }} />
                          ))}
                        </span>
                      : <Play size={12} fill="white" className="text-white" />
                    }
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm truncate ${playing === track.id ? 'text-brand' : 'text-text-main'}`}>
                    {track.title}
                  </p>
                  <p className="text-text-muted text-xs truncate">{track.artist}</p>
                </div>

                {/* Duration */}
                <span className="text-text-muted text-xs shrink-0">{track.duration}</span>

                {/* Add button */}
                <Link
                  href={track.url}
                  target={track.url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 text-border-subtle hover:text-brand transition-colors duration-200"
                >
                  <Plus size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
