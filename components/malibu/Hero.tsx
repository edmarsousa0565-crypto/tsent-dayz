'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* SplitText wraps every char in its own <div> automatically */
      const split = new SplitText(".hero-title", {
        type: "chars",
        charsClass: "split-char",
      });

      /* Letters wipe up from below (parent overflow:hidden creates the mask) */
      gsap.from(split.chars, {
        yPercent: 130,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.065,
        delay: 0.15,
      });

      /* Red line sweeps left → right */
      gsap.from(".hero-line", {
        scaleX: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.95,
        transformOrigin: "left center",
      });

      /* Tagline + CTAs fade up */
      gsap.from([".hero-sub", ".hero-cta"], {
        opacity: 0,
        y: 18,
        duration: 0.75,
        ease: "power2.out",
        delay: 1.15,
        stagger: 0.12,
      });

      /* Scroll hint */
      gsap.from(".hero-scroll", {
        opacity: 0,
        duration: 0.6,
        delay: 2.1,
      });

      /* Restore original DOM on unmount */
      return () => split.revert();
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.028) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(0,0,0,0.028) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/*
          Single h1 — SplitText splits "MALIBU" into individual char divs.
          overflow:hidden on this wrapper clips the yPercent animation.
        */}
        <div className="overflow-hidden">
          <h1
            className="hero-title font-display font-bold text-ink leading-none"
            style={{
              fontSize: "clamp(5rem, 18vw, 15rem)",
              letterSpacing: "-0.01em",
            }}
          >
            MALIBU
          </h1>
        </div>

        {/* Red accent line */}
        <div className="hero-line w-full h-[2px] bg-brand origin-left mt-5 mb-5" />

        {/* Tagline */}
        <p className="hero-sub font-sans text-[11px] font-semibold tracking-[0.45em] text-brand uppercase">
          Streetwear — Sem Regras
        </p>

        {/* CTAs */}
        <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="#shop"
            className="px-8 py-3.5 bg-ink text-white font-sans text-[11px] font-semibold tracking-widest uppercase hover:bg-brand transition-colors duration-300"
          >
            Ver Coleção
          </a>
          <a
            href="#drops"
            className="px-8 py-3.5 border border-ink text-ink font-sans text-[11px] font-semibold tracking-widest uppercase hover:border-brand hover:text-brand transition-colors duration-300"
          >
            Próximo Drop
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-sans text-[10px] tracking-[0.35em] text-text-muted uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <div className="animate-scroll-pulse absolute inset-x-0 h-1/2 bg-brand" />
        </div>
      </div>
    </section>
  );
}
