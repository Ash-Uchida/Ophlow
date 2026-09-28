"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

/** A card that glows where the cursor is. */
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }
  return (
    <div
      onPointerMove={move}
      style={{ "--x": "50%", "--y": "0%" } as CSSProperties}
      className={`group relative overflow-hidden transition duration-300 hover:-translate-y-1 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--x) var(--y), rgba(204,115,79,0.22), transparent 65%)" }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}
