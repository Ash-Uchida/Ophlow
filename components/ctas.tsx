import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

/** The two buttons every section ends on: Book a call (/book) and How it works (/#how). The /workspace setup form is for senior living, so it is not linked until an "Add your place" form replaces it. */
export function Ctas({ center = false, light = false, className = "" }: { center?: boolean; light?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""} ${className}`}>
      <Link
        href="/book"
        className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
          light ? "bg-cream text-forest-900 shadow-xl hover:bg-white" : "border border-ink-300 bg-paper text-forest-900 hover:border-forest-400"
        }`}
      >
        <CalendarDays className="h-4 w-4 transition group-hover:-rotate-12" /> Book a call
      </Link>
      <Link
        href="/#how"
        className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl ${
          light ? "bg-forest-900 text-cream shadow-forest-950/30 hover:bg-forest-950" : "bg-forest-800 text-cream shadow-forest-900/20 hover:bg-forest-900"
        }`}
      >
        How it works <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
