import { Camera, Check, Clock, Wrench } from "lucide-react";

const CHECKLIST = [
  { label: "Strip and remake 6 beds", done: true },
  { label: "Towels and sheets in the wash", done: true },
  { label: "Kitchen, fridge, dishwasher", done: true },
  { label: "Hot tub cover on", done: false },
];

/** A picture of one turnover between guests, as the owner sees it. Example data, not a real place. */
export function TurnoverMock() {
  return (
    <figure
      aria-label="Example: a turnover clean between two guests, as the owner sees it"
      className="relative mx-auto w-full max-w-sm rounded-[2rem] border border-ink-200 bg-paper p-5 shadow-2xl shadow-forest-900/10"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-rust-600">Turnover today</p>
          <p className="mt-1 text-lg font-semibold text-forest-950">Elk Ridge cabin, side A</p>
        </div>
        <span className="rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800">Cleaning</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-2xl bg-cream px-3 py-2">
          <p className="text-xs text-ink-500">Guest out</p>
          <p className="font-semibold text-forest-950">10:00 a.m.</p>
        </div>
        <div className="rounded-2xl bg-cream px-3 py-2">
          <p className="text-xs text-ink-500">Next guest in</p>
          <p className="font-semibold text-forest-950">3:00 p.m.</p>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm text-ink-700">
        <Clock className="h-4 w-4 text-forest-600" aria-hidden /> Maria started at 10:20 · 3 of 4 done
      </p>
      <ul className="mt-3 space-y-2">
        {CHECKLIST.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-sm">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                item.done ? "border-forest-600 bg-forest-600 text-cream" : "border-ink-300 bg-paper"
              }`}
            >
              {item.done ? <Check className="h-3.5 w-3.5" aria-hidden /> : null}
            </span>
            <span className={item.done ? "text-ink-500 line-through" : "text-forest-950"}>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-ink-200 px-3 py-2 text-sm text-ink-700">
        <Camera className="h-4 w-4 text-forest-600" aria-hidden /> 8 proof photos
      </div>
      <div className="mt-2 flex items-start gap-2 rounded-2xl bg-rust-50 px-3 py-2 text-sm text-rust-700">
        <Wrench className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <span>
          Loose door handle, back porch. Handyman booked for $65, under your $200 limit.
        </span>
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-500">Example of what you see, not a real listing</figcaption>
    </figure>
  );
}
