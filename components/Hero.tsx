'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play } from 'lucide-react';
import data from '@/app/data.json';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden bg-background">

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
          className="md:hidden w-full h-full object-cover object-center"
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
      <div className="relative z-10 w-full min-h-screen md:min-h-0 flex flex-col items-center text-center px-6 pt-32 md:pt-24 pb-10 md:pb-0">

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
          className="mt-5 hidden md:block max-w-sm text-text-muted text-sm leading-relaxed"
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
              hidden md:block
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

        {/* Cartão OUT NOW — só mobile */}
        <motion.a
          href="#catalogo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="md:hidden mt-7 w-full max-w-xs flex items-center gap-3 p-2.5 pr-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm transition-colors duration-300 hover:border-brand"
        >
          <span className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.featured.cover}
              alt={data.featured.title}
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute inset-0 bg-black/35 flex items-center justify-center">
              <Play size={18} fill="white" className="text-white" />
            </span>
          </span>
          <span className="flex flex-col items-start min-w-0 text-left">
            <span className="text-[9px] font-bold tracking-widest uppercase text-brand">
              {data.featured.badge}
            </span>
            <span className="text-sm font-bold text-white truncate w-full leading-tight">
              {data.featured.title}
            </span>
            <span className="text-[11px] text-text-muted">{data.featured.artist}</span>
          </span>
        </motion.a>

        {/* Tira de artistas — só mobile, empurrada para o fundo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="md:hidden mt-auto w-full flex flex-col items-center gap-4"
        >
          <span className="text-[10px] text-text-muted uppercase tracking-[0.25em]">
            Os Artistas
          </span>
          <div className="flex items-start justify-center gap-3 w-full">
            {data.artists.map((a) => (
              <Link
                key={a.id}
                href={`/artistas/${a.id}`}
                className="group flex flex-col items-center gap-1.5 w-[18%]"
              >
                <span className="block w-14 h-14 rounded-full overflow-hidden border border-white/20 group-hover:border-brand transition-colors duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = 'none';
                      el.parentElement!.style.background = 'linear-gradient(160deg,#1a0000,#0a0a0a)';
                    }}
                  />
                </span>
                <span className="text-[8px] leading-tight text-text-muted uppercase tracking-wider text-center truncate w-full">
                  {a.name}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
