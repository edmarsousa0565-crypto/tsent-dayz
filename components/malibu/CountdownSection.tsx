'use client';

import { useState, useEffect } from "react";

/* Drop 002 — Outono 2026 */
const TARGET = new Date("2026-09-20T12:00:00");

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  };
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1_000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "DIAS",  value: pad(time.days) },
    { label: "HORAS", value: pad(time.hours) },
    { label: "MIN",   value: pad(time.minutes) },
    { label: "SEG",   value: pad(time.seconds) },
  ];

  return (
    <section id="drops" className="bg-ink py-24 md:py-36 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="font-sans text-[11px] tracking-[0.4em] text-brand uppercase mb-4">
            PRÓXIMO DROP
          </p>
          <h2
            className="font-display font-bold text-white leading-none uppercase"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            DROP 002
          </h2>
          <p className="font-sans text-white/25 text-xs tracking-[0.3em] uppercase mt-3">
            OUTONO 2026 — COLEÇÃO LIMITADA
          </p>
        </div>

        {/* Countdown grid */}
        <div className="grid grid-cols-4 divide-x divide-white/5 border border-white/5">
          {units.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-10 md:py-16 bg-white/[0.015]"
            >
              <span
                className="font-display font-bold text-white tabular-nums leading-none"
                style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
              >
                {value}
              </span>
              <span className="font-sans text-[9px] md:text-[11px] tracking-[0.3em] text-brand uppercase mt-3">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-10 pt-10 border-t border-white/5">
          <p className="font-sans text-white/30 text-sm max-w-sm text-center md:text-left leading-relaxed">
            Garante o teu acesso antecipado. As peças esgotam em minutos.
          </p>
          <a
            href="#newsletter"
            className="font-sans text-[11px] font-semibold tracking-widest uppercase px-8 py-4 bg-brand text-white hover:bg-white hover:text-ink transition-colors duration-300"
          >
            Notifica-me
          </a>
        </div>
      </div>
    </section>
  );
}
