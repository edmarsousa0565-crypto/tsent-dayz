'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    id: "lk1",
    label: "01 — EDITORIAL",
    titleLine1: "SUMMER",
    titleLine2: "25",
    desc: "Peças que definem a temporada.",
    align: "left" as const,
    bg: "linear-gradient(135deg, #161616 0%, #0a0a0a 100%)",
    accent: false,
  },
  {
    id: "lk2",
    label: "02 — CAMPANHA",
    titleLine1: "PACIFIC",
    titleLine2: "NOIR",
    desc: "Entre o oceano e a rua.",
    align: "right" as const,
    bg: "linear-gradient(225deg, #191919 0%, #0a0a0a 65%, #111 100%)",
    accent: true,
  },
  {
    id: "lk3",
    label: "03 — DROP",
    titleLine1: "DARK",
    titleLine2: "WAVES",
    desc: "Exclusivo. Limitado. Teu.",
    align: "left" as const,
    bg: "linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)",
    accent: false,
  },
];

export default function LookbookSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      PANELS.forEach((panel) => {
        gsap.from(`[data-lk="${panel.id}"] .lk-content`, {
          opacity: 0,
          y: 60,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `[data-lk="${panel.id}"]`,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(`[data-lk="${panel.id}"] .lk-rule`, {
          scaleX: 0,
          duration: 0.9,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: `[data-lk="${panel.id}"]`,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="lookbook" className="bg-ink">
      {PANELS.map((panel, index) => (
        <div
          key={panel.id}
          data-lk={panel.id}
          className="relative min-h-screen flex items-end overflow-hidden"
          style={{ background: panel.bg }}
        >
          {/* Noise grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "256px 256px",
            }}
          />

          {/* Vertical accent line */}
          <div
            className="absolute top-0 bottom-0 w-px opacity-20"
            style={{
              background: "linear-gradient(to bottom, transparent, #E60000 30%, #E60000 70%, transparent)",
              left: panel.align === "left" ? "5rem" : "auto",
              right: panel.align === "right" ? "5rem" : "auto",
            }}
          />

          {/* Giant background number */}
          <div
            className="absolute pointer-events-none select-none"
            style={{
              top: "50%",
              right: panel.align === "right" ? "2rem" : "auto",
              left: panel.align === "left" ? "2rem" : "auto",
              transform: "translateY(-50%)",
            }}
          >
            <span
              className="font-display font-bold text-white/[0.025]"
              style={{ fontSize: "clamp(8rem, 25vw, 22rem)", lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content */}
          <div
            className={`lk-content relative z-10 px-8 md:px-24 py-16 md:py-28 max-w-4xl ${
              panel.align === "right" ? "ml-auto text-right" : ""
            }`}
          >
            <p className="font-sans text-[11px] tracking-[0.4em] text-brand uppercase mb-6">
              {panel.label}
            </p>

            <h3
              className="font-display font-bold text-white leading-none uppercase"
              style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
            >
              {panel.titleLine1}
              <br />
              <span className={panel.accent ? "text-brand" : "text-white"}>
                {panel.titleLine2}
              </span>
            </h3>

            <div
              className={`lk-rule h-px bg-brand/40 origin-left mt-8 mb-6 w-24 md:w-36 ${
                panel.align === "right" ? "ml-auto" : ""
              }`}
            />

            <p className="font-sans text-white/40 text-sm tracking-widest">
              {panel.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
