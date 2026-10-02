"use client";

import { ChevronsLeftRight, Clock } from "lucide-react";
import { useState } from "react";

const NOTES = [
  { text: "104 deep clean?? who", tone: "bg-amber-soft", spin: "-rotate-6", place: "left-[6%] top-[10%]" },
  { text: "107 tray — cold again", tone: "bg-rust-100", spin: "rotate-3", place: "left-[38%] top-[6%]" },
  { text: "sink leak 2nd flr (told anyone?)", tone: "bg-forest-100", spin: "-rotate-2", place: "left-[66%] top-[14%]" },
  { text: "bingo 2pm — count ppl!!", tone: "bg-amber-soft", spin: "rotate-6", place: "left-[10%] top-[52%]" },
  { text: "112 moving out FRI", tone: "bg-paper", spin: "-rotate-3", place: "left-[42%] top-[48%]" },
  { text: "fridge temp — did anyone log?", tone: "bg-rust-100", spin: "rotate-2", place: "left-[68%] top-[56%]" },
];

const ROWS = [
  { title: "Deep clean · Room 104", detail: "Assigned to Housekeeping · 0:42 in", tag: "On it", tone: "bg-forest-100 text-forest-800" },
  { title: "Tray · Room 107", detail: "Left the kitchen 2 min ago", tag: "On the way", tone: "bg-amber-soft/60 text-ink-900" },
  { title: "Sink leak · Building B", detail: "Photo attached · tech assigned", tag: "In progress", tone: "bg-forest-100 text-forest-800" },
  { title: "Bingo · 2:00 PM", detail: "14 people came", tag: "Counted", tone: "bg-forest-100 text-forest-800" },
  { title: "Move-out · Room 112", detail: "Friday · room goes to housekeeping", tag: "Scheduled", tone: "bg-ink-100 text-ink-700" },
  { title: "Fridge temperature", detail: "38°F logged at 6:02 AM", tag: "Logged", tone: "bg-forest-100 text-forest-800" },
];

/** Drag the handle to compare a paper-and-sticky-notes day with the same day in Ophlow. */
export function BeforeAfter() {
  // Leave a clear margin before the product panel so its heading is readable on load.
  const [split, setSplit] = useState(38);

  return (
    <div className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-[2rem] border border-ink-200 shadow-[0_30px_80px_-40px_rgba(26,50,33,0.45)] sm:aspect-[16/9]">
      {/* After: Ophlow */}
      <div className="absolute inset-0 bg-paper p-5 sm:p-8">
        <div className="ml-auto flex h-full max-w-[min(100%,34rem)] flex-col">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-serif text-lg font-semibold text-forest-900 sm:text-xl">With Ophlow</p>
            <span className="flex items-center gap-1 text-xs text-ink-500">
              <Clock className="h-3.5 w-3.5" /> Everyone sees the same thing
            </span>
          </div>
          <ul className="grid flex-1 content-start gap-2">
            {ROWS.map((row) => (
              <li key={row.title} className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-3 py-2">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink-900">{row.title}</span>
                  <span className="block truncate text-xs text-ink-500">{row.detail}</span>
                </span>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.tone}`}>{row.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Before: the corkboard */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[#c9a77c] [background-image:radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:6px_6px]"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
        <p className="absolute left-5 top-4 font-hand text-2xl text-ink-900/80 sm:left-8">Before</p>
        {NOTES.map((note) => (
          <div
            key={note.text}
            className={`absolute w-[30%] max-w-44 p-3 font-hand text-lg leading-tight text-ink-900 shadow-lg sm:text-2xl ${note.tone} ${note.spin} ${note.place}`}
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-rust-500 shadow" />
            {note.text}
          </div>
        ))}
      </div>

      {/* Handle */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0" style={{ left: `${split}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)]" />
        <div className="absolute top-1/2 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-forest-900 shadow-xl ring-4 ring-white/40">
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(e) => setSplit(Number(e.target.value))}
        aria-label="Compare a paper day with the same day in Ophlow"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
