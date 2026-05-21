'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import data from '@/app/data.json';

gsap.registerPlugin(ScrollTrigger);

export default function EventCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReduced) return;

      // Parallax — bg moves up slower than scroll
      gsap.to(bgRef.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text block — fade + slight scale up as section enters
      gsap.from(textRef.current!.children, {
        opacity: 0,
        y: 35,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: sectionRef }
  );

  const ev = data.highlightEvent;

  // Split title on \n so we can style each line
  const titleLines = ev.title.split('\n');

  return (
    <section
      ref={sectionRef}
      id="eventos"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background image — slightly oversized for parallax headroom */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.18] origin-center"
        style={{ willChange: 'transform' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ev.image}
          alt="Evento TSENT SYDAZ"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = 'none';
            const parent = el.parentElement!;
            // Fallback: dark gradient that evokes concert lighting
            parent.style.background =
              'radial-gradient(ellipse 80% 60% at 50% 70%, rgba(180,0,0,0.35) 0%, #000 70%)';
          }}
        />
      </div>

      {/* Overlay — radial dark center to keep text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.30) 100%)',
        }}
      />

      {/* Radial vignette on edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div ref={textRef} className="flex flex-col items-center gap-6">

          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/50 bg-brand/10 text-brand text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            {ev.eyebrow}
          </span>

          {/* Title */}
          <h2
            className="font-bold text-text-main leading-[1.0] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          {/* Event meta */}
          <div className="flex items-center gap-4 text-text-muted text-sm font-semibold tracking-widest uppercase">
            <span>{ev.date}</span>
            <span className="w-1 h-1 rounded-full bg-text-muted opacity-60" />
            <span>{ev.venue}</span>
          </div>

          {/* CTA */}
          <Link
            href={ev.ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-2 px-10 py-4 rounded-full
              bg-brand text-text-main
              text-sm font-bold tracking-widest uppercase
              shadow-[0_0_40px_rgba(230,0,0,0.45)]
              transition-all duration-300
              hover:shadow-[0_0_60px_rgba(230,0,0,0.65)]
              hover:scale-105
            "
          >
            Comprar Bilhetes
          </Link>
        </div>
      </div>
    </section>
  );
}
