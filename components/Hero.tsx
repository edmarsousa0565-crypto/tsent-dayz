'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">

      {/* ── Background ──────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Desktop — SVG ténue */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-bg.svg"
          alt=""
          aria-hidden="true"
          className="hidden md:block w-full h-full object-cover object-center"
          style={{ opacity: 0.32 }}
        />
        {/* Mobile — foto inteira (object-contain), com efeito fosco sobre toda a imagem */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-mobile.jpg"
          alt=""
          aria-hidden="true"
          className="md:hidden w-full h-full object-contain object-top"
          style={{ opacity: 0.5 }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Véu fosco — uniforme sobre toda a foto no mobile, forte no desktop */}
        <div className="absolute inset-0 bg-black/55 md:bg-black/[0.68]" />
        {/* Left + right edges fade — só no desktop (blend com painéis laterais) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to right, #000 0%, transparent 32%, transparent 68%, #000 100%)' }}
        />
        {/* Top + bottom fade — desktop */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 22%, transparent 72%, #000 100%)' }}
        />
        {/* Mobile — fade suave para preto na base (blend com a secção seguinte) */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: 'linear-gradient(to bottom, transparent 55%, #000 100%)' }}
        />
      </div>


{/* ── Central content ────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-1.5 text-xs font-semibold tracking-widest text-text-muted uppercase"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          Bop House · Rap · Trap · R&B
        </motion.div>

        {/* Label name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-text-main uppercase leading-none"
          style={{
            fontFamily: 'var(--font-oswald), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(4.5rem, 14vw, 13rem)',
            letterSpacing: '-0.01em',
          }}
        >
          TSENT<br />SYDAZ
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-5 max-w-sm text-text-muted text-sm leading-relaxed"
        >
          A produtora que define o som das ruas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="#catalogo"
            className="
              w-full sm:w-auto px-7 py-3 rounded-full
              text-sm font-bold tracking-wide text-text-main
              bg-brand border border-brand
              transition-all duration-300
              hover:bg-transparent hover:text-brand
            "
          >
            Ouvir Lançamentos
          </Link>
          <Link
            href="#contactos"
            className="
              w-full sm:w-auto px-7 py-3 rounded-full
              text-sm font-bold tracking-wide text-text-main
              border border-border-subtle
              transition-all duration-300
              hover:border-text-muted
            "
          >
            Submeter Demo
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
