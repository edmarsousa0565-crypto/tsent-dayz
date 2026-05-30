export default function MarqueeBanner() {
  const segment =
    "DROP 001   ·   SUMMER 2026   ·   MALIBU STREETWEAR   ·   BORN ON THE COAST   ·   LIMITED EDITION   ·   ";

  /* Duplicated text so translate(-50%) loops seamlessly */
  const full = segment.repeat(3);

  return (
    <div className="bg-ink border-y border-white/5 py-4 overflow-hidden" aria-hidden>
      <div className="animate-marquee whitespace-nowrap">
        <span className="font-display font-bold tracking-[0.2em] text-white text-sm uppercase">
          {full}
        </span>
        <span
          className="font-display font-bold tracking-[0.2em] text-white text-sm uppercase"
          aria-hidden
        >
          {full}
        </span>
      </div>
    </div>
  );
}
