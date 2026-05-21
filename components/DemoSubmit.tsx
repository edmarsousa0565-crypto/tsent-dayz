'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DemoSubmit() {
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const mailto = `mailto:demo@tsentsydaz.com?subject=Demo – ${data.get('name')}&body=Artista: ${data.get('name')}%0ALink: ${data.get('link')}`;
    window.location.href = mailto;
  }

  return (
    <section
      ref={sectionRef}
      id="contactos"
      className="relative bg-surface border-t border-border-subtle py-28 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(230,0,0,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-2xl" ref={contentRef}>

        {/* Eyebrow */}
        <p className="text-brand text-xs font-bold tracking-widest uppercase mb-5">
          Para Artistas
        </p>

        {/* Heading */}
        <h2
          className="text-text-main uppercase leading-none mb-6"
          style={{
            fontFamily: 'var(--font-oswald), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            letterSpacing: '-0.02em',
          }}
        >
          A Tua Voz.<br />O Nosso Som.
        </h2>

        {/* Subtitle */}
        <p className="text-text-muted text-base leading-relaxed mb-10 max-w-lg">
          Estamos sempre à procura de novos talentos. Envia o teu demo — Bop House, Rap, Trap ou R&B. Ouvimos tudo.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              placeholder="O teu nome artístico"
              required
              className="
                w-full px-5 py-4 rounded-xl
                bg-background border border-border-subtle
                text-text-main text-sm placeholder:text-text-muted/50
                outline-none focus:border-brand
                transition-colors duration-200
              "
            />
            <input
              name="email"
              type="email"
              placeholder="Email de contacto"
              required
              className="
                w-full px-5 py-4 rounded-xl
                bg-background border border-border-subtle
                text-text-main text-sm placeholder:text-text-muted/50
                outline-none focus:border-brand
                transition-colors duration-200
              "
            />
          </div>

          <input
            name="link"
            type="url"
            placeholder="Link do demo (YouTube, SoundCloud, Drive…)"
            required
            className="
              w-full px-5 py-4 rounded-xl
              bg-background border border-border-subtle
              text-text-main text-sm placeholder:text-text-muted/50
              outline-none focus:border-brand
              transition-colors duration-200
            "
          />

          <button
            type="submit"
            className="
              self-start flex items-center gap-2
              px-8 py-4 rounded-full
              text-sm font-bold tracking-wide text-text-main
              bg-brand border border-brand
              transition-all duration-300
              hover:bg-transparent hover:text-brand
            "
          >
            Submeter Demo
            <ArrowUpRight size={16} strokeWidth={2} />
          </button>
        </form>

        {/* Fine print */}
        <p className="mt-6 text-text-muted text-xs opacity-50">
          Respondemos a todos os demos em até 14 dias úteis.
        </p>
      </div>
    </section>
  );
}
