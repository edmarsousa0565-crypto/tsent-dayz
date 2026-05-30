'use client';

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      className="bg-background py-24 md:py-36 px-6 md:px-20 border-t border-border"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-sans text-[11px] tracking-[0.4em] text-brand uppercase mb-5">
          LISTA EXCLUSIVA
        </p>

        <h2
          className="font-display font-bold text-ink leading-none uppercase mb-6"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
        >
          ENTRA NA
          <br />
          LISTA
        </h2>

        <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed mb-12 max-w-md mx-auto">
          Primeiro a saber. Primeiro a comprar. Acesso exclusivo a drops,
          edições limitadas e eventos.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-brand/8 border border-brand/20 flex items-center justify-center">
              <Check size={22} className="text-brand" strokeWidth={2} />
            </div>
            <p className="font-sans text-sm font-medium text-ink tracking-wide">
              Estás dentro. Prepara-te.
            </p>
            <p className="font-sans text-[11px] text-text-muted uppercase tracking-widest">
              DROP 002 — Setembro 2026
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="O teu email"
              className="flex-1 border border-border px-5 py-4 font-sans text-sm text-ink placeholder:text-text-muted/40 bg-background focus:outline-none focus:border-ink transition-colors sm:border-r-0"
            />
            <button
              type="submit"
              className="px-7 py-4 bg-ink text-white font-sans text-[11px] font-semibold tracking-widest uppercase hover:bg-brand transition-colors duration-300 flex items-center gap-2 justify-center whitespace-nowrap border border-ink"
            >
              ENTRAR
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <p className="font-sans text-[10px] text-text-muted/40 tracking-widest mt-6 uppercase">
          Sem spam. Cancela quando quiseres.
        </p>
      </div>
    </section>
  );
}
