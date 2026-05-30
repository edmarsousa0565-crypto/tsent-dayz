'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: "001",
    name: "WAVE HOODIE",
    price: "R$349",
    tag: "NEW" as const,
    dark: true,
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 22px, rgba(255,255,255,0.04) 22px, rgba(255,255,255,0.04) 23px)",
  },
  {
    id: "002",
    name: "PACIFIC TEE",
    price: "R$189",
    tag: "NEW" as const,
    dark: false,
    pattern: "repeating-linear-gradient(0deg, transparent, transparent 26px, rgba(0,0,0,0.05) 26px, rgba(0,0,0,0.05) 27px)",
  },
  {
    id: "003",
    name: "DARK SHORES CARGO",
    price: "R$429",
    tag: null,
    dark: true,
    pattern: "radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.06) 0%, transparent 55%)",
  },
  {
    id: "004",
    name: "RED TIDE JACKET",
    price: "R$589",
    tag: "SOLD OUT" as const,
    dark: true,
    pattern: "linear-gradient(135deg, rgba(230,0,0,0.18) 0%, transparent 55%)",
  },
  {
    id: "005",
    name: "COAST SNAPBACK",
    price: "R$149",
    tag: null,
    dark: true,
    pattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 38%, transparent 39%)",
  },
  {
    id: "006",
    name: "NOIR SHORTS",
    price: "R$229",
    tag: "NEW" as const,
    dark: false,
    pattern: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-product]", {
        opacity: 0,
        y: 48,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="shop" className="bg-background py-24 md:py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="font-sans text-[11px] tracking-[0.4em] text-brand uppercase mb-3">
              DROP 001
            </p>
            <h2
              className="font-display font-bold text-ink leading-none uppercase"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              A COLEÇÃO
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 font-sans text-[11px] font-semibold tracking-widest uppercase text-text-muted border-b border-text-muted/40 pb-0.5 hover:text-brand hover:border-brand transition-colors duration-200"
          >
            Ver Tudo
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PRODUCTS.map((p) => (
            <article key={p.id} data-product className="group cursor-pointer">
              {/* Art placeholder */}
              <div
                className="relative aspect-[3/4] overflow-hidden mb-4"
                style={{ backgroundColor: p.dark ? "#0A0A0A" : "#F0F0F0" }}
              >
                {/* Pattern layer */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: p.pattern, backgroundSize: p.id === "006" ? "28px 28px" : undefined }}
                />

                {/* Product number watermark */}
                <span
                  className="absolute bottom-4 left-4 font-display font-bold pointer-events-none"
                  style={{
                    fontSize: "5rem",
                    lineHeight: 1,
                    color: p.dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  }}
                >
                  {p.id}
                </span>

                {/* Tag badge */}
                {p.tag && (
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`font-sans text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 ${
                        p.tag === "SOLD OUT"
                          ? "bg-text-muted text-white"
                          : "bg-brand text-white"
                      }`}
                    >
                      {p.tag}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="font-sans text-[10px] font-semibold tracking-widest uppercase text-white border border-white px-4 py-2.5">
                    {p.tag === "SOLD OUT" ? "Esgotado" : "Adicionar"}
                  </span>
                </div>
              </div>

              {/* Info row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display font-bold text-ink uppercase text-sm md:text-base tracking-wide group-hover:text-brand transition-colors duration-200 leading-tight">
                    {p.name}
                  </p>
                  <p className="font-sans text-text-muted text-xs md:text-sm mt-0.5">
                    {p.price}
                  </p>
                </div>
                <span className="font-sans text-[9px] text-text-muted/40 tracking-wider shrink-0 mt-0.5">
                  {p.id}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
