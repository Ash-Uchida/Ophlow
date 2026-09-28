export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="16" fill="#1a3221" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="#f6f1e8" strokeWidth="6" />
      <path d="M14 38c6-6 12-6 18 0s12 6 18 0" fill="none" stroke="#cc734f" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`font-serif text-2xl font-semibold tracking-tight ${light ? "text-cream" : "text-forest-900"}`}>
        Ophlow
      </span>
    </span>
  );
}
