"use client";

import { Play, Square, Timer } from "lucide-react";
import { useState } from "react";

const MEASURES = [
  { title: "Checkout to room ready", start: "Resident checks out", stop: "Room passes inspection" },
  { title: "Minutes per clean against target", start: "Housekeeper taps Start", stop: "Last checklist step is done" },
  { title: "Meal order to tray delivered", start: "Nurse station sends the order", stop: "Tray is marked delivered" },
  { title: "Repair request to fixed", start: "Request goes in with a photo", stop: "After photo marks it fixed" },
];

/** What Ophlow measures; tap one to see when its clock starts and stops. */
export function PilotMeasures() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {MEASURES.map((m, i) => {
        const active = open === i;
        return (
          <li key={m.title}>
            <button
              type="button"
              aria-expanded={active}
              onClick={() => setOpen(active ? null : i)}
              className={`h-full w-full rounded-2xl p-4 text-left text-[15px] ring-1 transition duration-300 hover:-translate-y-0.5 ${
                active ? "bg-forest-800 ring-rust-300" : "bg-forest-900/70 ring-forest-700 hover:ring-forest-500"
              }`}
            >
              <span className="flex items-start gap-2.5">
                <Timer className={`mt-0.5 h-4 w-4 shrink-0 text-rust-200 ${active ? "animate-pulse" : ""}`} />
                {m.title}
              </span>
              {active ? (
                <span className="mt-3 block animate-rise space-y-1.5 text-sm text-forest-100">
                  <span className="flex items-center gap-2">
                    <Play className="h-3.5 w-3.5 text-forest-300" /> {m.start}
                  </span>
                  <span className="flex items-center gap-2">
                    <Square className="h-3.5 w-3.5 text-rust-200" /> {m.stop}
                  </span>
                </span>
              ) : (
                <span className="mt-3 block text-xs font-medium text-forest-300">Tap to see how it&apos;s timed</span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
