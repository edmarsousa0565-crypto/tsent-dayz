'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  /*
   * With ScrollSmoother active, CSS `position:sticky` is broken because
   * the actual scroll container uses transforms, not native overflow scroll.
   * We use ScrollTrigger pin:true instead — GSAP manages it correctly.
   */
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current!;
      const p2 = section.querySelector<HTMLElement>("[data-panel='p2']")!;
      const p3 = section.querySelector<HTMLElement>("[data-panel='p3']")!;

      gsap.set([p2, p3], { opacity: 0, y: 90 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",     // pin for 2x viewport height of scroll
          scrub: 1.3,
          pin: true,         // GSAP pin replaces CSS sticky
          anticipatePin: 1,
        },
      });

      /* Phase 1 → 2 */
      tl.to("[data-panel='p1']", { opacity: 0, y: -75, duration: 0.6 }, 0.2);
      tl.to(p2, { opacity: 1, y: 0, duration: 0.6 }, 0.3);

      /* Phase 2 → 3 */
      tl.to(p2, { opacity: 0, y: -75, duration: 0.6 }, 1.5);
      tl.to(p3, { opacity: 1, y: 0, duration: 0.6 }, 1.6);

      /* Red underline draws in */
      tl.from("[data-redline]", { scaleX: 0, duration: 0.5 }, 2.1);

      return () => tl.scrollTrigger?.kill();
    },
    { scope: sectionRef }
  );

  return (
    /* No outer 300 vh wrapper — GSAP pin adds its own spacing */
    <section
      ref={sectionRef}
      id="about"
      className="h-screen bg-ink flex items-center px-8 md:px-24 overflow-hidden"
    >
      {/* Progress dots */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-10">
        {[1, 2, 3].map((n) => (
          <div key={n} className="w-1.5 h-1.5 rounded-full bg-white/15" />
        ))}
      </div>

      {/* Panels */}
      <div className="relative w-full max-w-6xl" style={{ height: "55vh" }}>
        {/* Panel 1 */}
        <div data-panel="p1" className="absolute inset-0 flex flex-col justify-center">
          <p className="font-sans text-[11px] tracking-[0.4em] text-brand uppercase mb-6 md:mb-8">
            001 — ORIGEM
          </p>
          <h2
            className="font-display font-bold leading-none uppercase text-white"
            style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
          >
            BORN ON
            <br />
            THE COAST.
          </h2>
        </div>

        {/* Panel 2 */}
        <div data-panel="p2" className="absolute inset-0 flex flex-col justify-center">
          <p className="font-sans text-[11px] tracking-[0.4em] text-brand uppercase mb-6 md:mb-8">
            002 — IDENTIDADE
          </p>
          <h2
            className="font-display font-bold leading-none uppercase text-white"
            style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
          >
            MADE FOR
            <br />
            THE STREETS.
          </h2>
        </div>

        {/* Panel 3 */}
        <div data-panel="p3" className="absolute inset-0 flex flex-col justify-center">
          <p className="font-sans text-[11px] tracking-[0.4em] text-brand uppercase mb-6 md:mb-8">
            003 — EXCLUSIVIDADE
          </p>
          <h2
            className="font-display font-bold leading-none uppercase text-brand"
            style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
          >
            WORN BY
            <br />
            THE FEW.
          </h2>
          <div
            data-redline
            className="h-0.5 bg-brand origin-left mt-8 w-28 md:w-44"
          />
        </div>
      </div>

      {/* Vertical label */}
      <div className="absolute left-5 bottom-10 hidden md:block">
        <span
          className="font-sans text-[9px] tracking-[0.35em] text-white/15 uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          MALIBU — 2026
        </span>
      </div>
    </section>
  );
}
