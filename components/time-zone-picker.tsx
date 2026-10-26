"use client";

import { Check, ChevronDown, Globe, LocateFixed } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { US_ZONES, abbreviation, clockIn, closestListed, searchZones, zoneLabel } from "@/lib/time-zones";

/** The visitor's zone from their device, folded into one of our named US zones when it keeps the same clock. */
export function detectTimeZone(fallback = "America/Denver") {
  try {
    const raw = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return raw ? (closestListed(raw)?.id ?? raw) : fallback;
  } catch {
    return fallback;
  }
}

const noSubscribe = () => () => {};

/** The detected zone once in the browser; undefined while rendering on the server, so hydration matches. */
export function useDetectedTimeZone() {
  return useSyncExternalStore(noSubscribe, () => detectTimeZone(), () => undefined);
}

/**
 * One box: it shows the zone ("Mountain Time (MDT)"). Click it to pick EST / CST / MST / PST… from the
 * quick buttons or the list, or just type — a state ("Idaho"), a city ("Phoenix") or a zone ("PST") —
 * and the matching time zones appear.
 */
export function TimeZonePicker({ value, onChange, detected, className = "" }: { value: string; onChange: (tz: string) => void; detected?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const listId = useId();

  const results = useMemo(() => searchZones(query), [query]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const show = () => {
    setOpen(true);
    setQuery("");
    setActive(0);
  };

  const choose = (tz: string) => {
    onChange(tz);
    setOpen(false);
    setQuery("");
    field.current?.blur();
  };

  return (
    <div ref={box} className={`relative ${className}`}>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white px-3 transition ${open ? "border-forest-400 ring-2 ring-forest-100" : "border-ink-200 hover:border-forest-300"}`}
        onClick={() => field.current?.focus()}
      >
        <Globe className="h-4 w-4 shrink-0 text-ink-500" />
        <input
          ref={field}
          role="combobox"
          aria-label="Time zone — type a state, city or zone"
          aria-controls={listId}
          aria-expanded={open}
          aria-autocomplete="list"
          value={open ? query : `${zoneLabel(value)}${value === detected ? " · your location" : ""}`}
          placeholder="Type your state, city, or e.g. PST"
          onFocus={show}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, results.length - 1));
            else if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
            else if (e.key === "Enter" && open && results[active]) choose(results[active].option.id);
            else if (e.key === "Escape") {
              setOpen(false);
              field.current?.blur();
            } else return;
            e.preventDefault();
          }}
          className={`min-w-0 flex-1 cursor-text truncate bg-transparent py-2 text-sm text-ink-900 outline-none placeholder:text-ink-300 ${open ? "" : "font-semibold"}`}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={open ? "Close time zones" : "Show time zones"}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            if (open) {
              setOpen(false);
              field.current?.blur();
            } else field.current?.focus();
          }}
          className="-mr-1 rounded-lg p-1 text-ink-400 hover:bg-cream"
        >
          <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-full min-w-[19rem] animate-rise overflow-hidden rounded-2xl border border-ink-200 bg-paper shadow-xl shadow-ink-900/10">
          {!query ? (
            <div className="border-b border-ink-100 p-3">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">Quick pick</p>
              <div className="flex flex-wrap gap-1.5">
                {US_ZONES.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    title={`${z.name} — ${z.cities}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(z.id)}
                    className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
                      z.id === value ? "bg-forest-800 text-cream" : "bg-cream text-ink-700 hover:bg-forest-50 hover:text-forest-700"
                    }`}
                  >
                    {z.short}
                  </button>
                ))}
              </div>
              {detected && detected !== value ? (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(detected)}
                  className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:underline"
                >
                  <LocateFixed className="h-3.5 w-3.5" /> Use my location: {zoneLabel(detected)}
                </button>
              ) : null}
            </div>
          ) : null}
          <ul id={listId} role="listbox" className="max-h-72 overflow-y-auto py-1">
            {results.length === 0 ? <li className="px-4 py-3 text-sm text-ink-500">No match. Try a state, a nearby big city, or a zone like CST.</li> : null}
            {results.map(({ option, matched }, i) => (
              <li key={option.id} role="option" aria-selected={option.id === value}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(option.id)}
                  className={`flex w-full items-start gap-3 px-3 py-2.5 text-left ${i === active ? "bg-cream" : ""}`}
                >
                  <span className="mt-0.5 w-4 shrink-0">{option.id === value ? <Check className="h-4 w-4 text-forest-600" /> : null}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink-900">
                      {option.name} <span className="font-normal text-ink-500">({abbreviation(option.id)})</span>
                    </span>
                    <span className="block truncate text-xs text-ink-500">{matched ? `${matched} · ${option.cities}` : option.cities}</span>
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-ink-400">{clockIn(option.id)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
