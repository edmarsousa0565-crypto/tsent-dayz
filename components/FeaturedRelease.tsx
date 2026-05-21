'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/app/data.json';

gsap.registerPlugin(ScrollTrigger);

const STREAMING_ICONS: Record<string, string> = {
  'Spotify': '▶',
  'Apple Music': '',
  'YouTube Music': '▶',
  'Deezer': '♫',
};

export default function FeaturedRelease() {
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReduced) return;

      // Cover — scale up + fade in
      gsap.from(coverRef.current, {
        scale: 0.82,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: coverRef.current,
          start: 'top 85%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      });

      // Text children — slide in from left, staggered
      gsap.from(textRef.current!.children, {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: sectionRef }
  );

  const { featured } = data;

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="relative bg-background py-24 px-6"
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-10">

        {/* Video — full width */}
        <div ref={coverRef}>
          <div
            className="
              relative w-full
              rounded-2xl overflow-hidden
              border border-border-subtle
              bg-surface
              shadow-[0_0_80px_rgba(230,0,0,0.15)]
            "
            style={{ aspectRatio: '16/9', willChange: 'transform' }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${featured.youtubeId}?rel=0&modestbranding=1`}
              title={featured.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
          </div>
        </div>

        {/* Info + Streaming — below video */}
        <div ref={textRef} className="flex flex-col gap-5">

          {/* Badge */}
          <span
            className="
              self-start px-3 py-1 rounded-full
              text-xs font-bold tracking-widest uppercase
              bg-brand text-text-main
            "
          >
            {featured.badge}
          </span>

          {/* Title */}
          <h2
            className="font-bold text-text-main leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
          >
            {featured.title}
          </h2>

          {/* Artist + Meta */}
          <div className="flex flex-col gap-1">
            <p className="text-text-muted text-base font-medium">
              {featured.artist}
            </p>
            <p className="text-border-subtle text-sm tracking-wide">
              {featured.genre} · {featured.year}
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-border-subtle" />

          {/* Streaming links */}
          <div className="flex flex-col gap-3">
            <p className="text-text-muted text-xs font-semibold tracking-widest uppercase">
              Ouvir em
            </p>
            <div className="flex flex-wrap gap-3">
              {featured.streaming.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2
                    px-5 py-2.5 rounded-full
                    text-sm font-semibold text-text-main
                    border border-border-subtle bg-surface
                    transition-all duration-300
                    hover:border-brand hover:text-brand
                  "
                >
                  <span className="text-xs opacity-60">
                    {STREAMING_ICONS[s.platform] ?? '▶'}
                  </span>
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
