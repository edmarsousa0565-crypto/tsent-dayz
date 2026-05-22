'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { ArrowLeft, Play, AtSign, PlayCircle, Music2, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';

type Social = { platform: string; url: string };
type Artist = {
  id: string;
  name: string;
  genre: string;
  image: string;
  bio: string;
  socials: Social[];
};
type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  url: string;
};

// Mapa de plataforma → ícone (fallback para link externo genérico)
const SOCIAL_ICON: Record<string, React.ComponentType<{ size?: number }>> = {
  Instagram: AtSign,
  TikTok: Music2,
  YouTube: PlayCircle,
};

export default function ArtistProfile({
  artist,
  tracks,
}: {
  artist: Artist;
  tracks: Track[];
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="bg-background min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 pt-28 pb-24">
        {/* Voltar */}
        <Link
          href="/#artistas"
          data-reveal
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-10 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Voltar aos artistas
        </Link>

        {/* Hero do artista */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Foto */}
          <div
            data-reveal
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full object-cover object-top"
              style={{ aspectRatio: '4/5' }}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = 'none';
                const p = el.parentElement!;
                p.style.background = 'linear-gradient(160deg,#1a0000,#0a0a0a)';
                p.style.aspectRatio = '4/5';
              }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div data-reveal>
              <span className="inline-block bg-brand text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                {artist.genre}
              </span>
              <h1
                className="text-text-main uppercase leading-none"
                style={{
                  fontFamily: 'var(--font-oswald), sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                {artist.name}
              </h1>
            </div>

            <p data-reveal className="text-text-muted leading-relaxed max-w-prose">
              {artist.bio}
            </p>

            {/* Redes sociais */}
            <div data-reveal className="flex items-center gap-3">
              {artist.socials.map((s) => {
                const Icon = SOCIAL_ICON[s.platform] ?? ExternalLink;
                return (
                  <Link
                    key={s.platform}
                    href={s.url}
                    target={s.url !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="w-11 h-11 rounded-full border border-border-subtle flex items-center justify-center text-text-muted hover:text-white hover:bg-brand hover:border-brand transition-all duration-300"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Faixas */}
        <div data-reveal className="mt-20">
          <h2
            className="text-text-main uppercase mb-6"
            style={{
              fontFamily: 'var(--font-oswald), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Faixas
          </h2>

          {tracks.length === 0 ? (
            <p className="text-text-muted text-sm">Sem faixas publicadas ainda. Em breve. 🎤</p>
          ) : (
            <div className="flex flex-col divide-y divide-border-subtle">
              {tracks.map((track) => (
                <Link
                  key={track.id}
                  href={track.url}
                  target={track.url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 py-3 group hover:bg-surface/60 rounded-xl px-3 -mx-3 transition-colors duration-200"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play size={14} fill="white" className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate text-text-main group-hover:text-brand transition-colors">
                      {track.title}
                    </p>
                    <p className="text-text-muted text-xs truncate">{track.artist}</p>
                  </div>
                  <span className="text-text-muted text-xs shrink-0">{track.duration}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
