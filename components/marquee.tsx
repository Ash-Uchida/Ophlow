const RETIRED = [
  "Clipboards",
  "Whiteboards",
  "Group texts",
  "Sticky notes",
  "Paper logs",
  "Radio calls",
  "Spreadsheets",
  "Missed handoffs",
  "“Who has room 104?”",
];

/** Everything Ophlow replaces, crossed out, scrolling by. */
export function Marquee() {
  const items = [...RETIRED, ...RETIRED];
  return (
    <div className="group relative overflow-hidden border-y border-ink-200/70 bg-forest-900 py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-forest-900 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-forest-900 to-transparent"
      />
      <p className="sr-only">Things Ophlow replaces: {RETIRED.join(", ")}.</p>
      <div aria-hidden className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="relative font-serif text-2xl text-forest-100/80">
              {item}
              <span className="absolute left-[-4%] top-1/2 h-[3px] w-[108%] -rotate-2 rounded-full bg-rust-400" />
            </span>
            <span className="h-2 w-2 rounded-full bg-rust-400/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
