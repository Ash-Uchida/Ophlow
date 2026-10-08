"use client";

import { Check, RotateCcw } from "lucide-react";
import { useState } from "react";

const PAINS = [
  {
    pain: "Rooms sit empty because nobody knows they're clean.",
    fix: "A clean ends with a tap. The room shows as ready for everyone, right away.",
  },
  {
    pain: "Repairs get reported three times — or never.",
    fix: "One request, with a photo and a live status the whole building can see.",
  },
  {
    pain: "Managers guess where the bottlenecks are.",
    fix: "Every step is timed, so the slow one stands out.",
  },
];

/** Problem statements that flip to show how Ophlow handles them. */
export function PainPoints() {
  const [flipped, setFlipped] = useState<boolean[]>(PAINS.map(() => false));

  return (
    <div className="flex flex-col gap-4">
      {PAINS.map(({ pain, fix }, i) => {
        const on = flipped[i];
        return (
          <button
            key={pain}
            type="button"
            aria-pressed={on}
            onClick={() => setFlipped((f) => f.map((v, j) => (j === i ? !v : v)))}
            className={`group flex items-start justify-between gap-4 rounded-2xl border px-6 py-5 text-left text-lg font-medium transition duration-300 hover:-translate-y-0.5 ${
              on ? "border-forest-300 bg-forest-50 text-forest-900" : "border-rust-200 bg-rust-50 text-forest-950"
            }`}
          >
            <span key={on ? "fix" : "pain"} className="animate-rise">
              {on ? fix : pain}
            </span>
            <span
              className={`mt-1 flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                on ? "bg-forest-100 text-forest-800" : "bg-white text-rust-600"
              }`}
            >
              {on ? <RotateCcw className="h-3 w-3" /> : <Check className="h-3 w-3" />}
              {on ? "Before" : "Fix it"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
