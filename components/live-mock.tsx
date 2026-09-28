"use client";

import { Check, Clock, MousePointerClick, PartyPopper, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

const TASKS = ["Strip and make the bed", "Clean the closet", "Sanitize the bathroom"];

const NEEDS = [
  { id: "deep", title: "Deep clean · Room 104", detail: "No one assigned yet", dot: "bg-rust-500", fix: "Assigned" },
  { id: "tray", title: "Tray waiting · Room 107", detail: "12 min since it was ready", dot: "bg-amber-soft", fix: "Delivered" },
  { id: "yoga", title: "Chair yoga", detail: "Head count not taken", dot: "bg-forest-400", fix: "11 came" },
];

const ROOMS = ["102", "106", "109", "111", "114"];

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/** A playable picture of the app (room numbers only, like the real thing). */
export function LiveMock() {
  const [seconds, setSeconds] = useState(12 * 60 + 48);
  const [done, setDone] = useState<boolean[]>([true, true, false]);
  const [cleans, setCleans] = useState(16);
  const [room, setRoom] = useState(0);
  const [cleared, setCleared] = useState<string[]>([]);
  const [bump, setBump] = useState(0);
  const tilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const allDone = done.every(Boolean);
  const open = NEEDS.filter((n) => !cleared.includes(n.id));

  function finish() {
    if (!allDone) return;
    setCleans((c) => c + 1);
    setBump((b) => b + 1);
    setRoom((r) => (r + 1) % ROOMS.length);
    setDone([false, false, false]);
    setSeconds(0);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const el = tilt.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  }

  function leave() {
    if (tilt.current) tilt.current.style.transform = "";
  }

  return (
    <div onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-xl">
      <p className="absolute -top-9 left-2 flex items-center gap-1.5 font-hand text-xl text-rust-500 sm:left-6">
        <MousePointerClick className="h-4 w-4" /> go on, tap around
      </p>
      <div ref={tilt} className="relative transition-transform duration-300 ease-out will-change-transform">
        <section
          aria-label="Manager website preview"
          className="rounded-3xl border border-ink-200 bg-paper p-5 shadow-[0_30px_80px_-30px_rgba(26,50,33,0.35)] sm:mr-16"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-serif text-lg font-semibold text-forest-900">Today at a glance</p>
              <p className="text-xs text-ink-500">Manager website</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-forest-50 px-2.5 py-1 text-[11px] font-semibold text-forest-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forest-500" />
              Live
            </span>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {(
              [
                ["Cleans today", cleans, bump],
                ["Meal orders", 23, 0],
                ["Open repairs", 3, 0],
              ] as const
            ).map(([label, value, key]) => (
              <div key={label} className="rounded-2xl bg-cream px-3 py-2.5">
                <p key={key} className="animate-pop font-serif text-2xl font-semibold text-forest-900">
                  {value}
                </p>
                <p className="text-[11px] text-ink-600">{label}</p>
              </div>
            ))}
          </div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-500">Needs you · {open.length}</p>
          <div className="min-h-[11.75rem]">
          {open.length ? (
            <ul className="space-y-2 text-sm">
              {open.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setCleared((c) => [...c, item.id])}
                    className="group flex w-full items-center gap-3 rounded-xl border border-ink-200/80 bg-white px-3 py-2.5 text-left transition hover:border-forest-300 hover:shadow-md"
                  >
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition ${item.dot}`}>
                      <Check className="h-3 w-3 scale-0 text-white transition group-hover:scale-100 group-focus-visible:scale-100" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink-900">{item.title}</span>
                      <span className="block truncate text-xs text-ink-500 group-hover:hidden group-focus-visible:hidden">
                        {item.detail}
                      </span>
                      <span className="hidden truncate text-xs font-semibold text-forest-700 group-hover:block group-focus-visible:block">
                        Tap to mark: {item.fix}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex animate-rise flex-col items-start gap-2 rounded-xl bg-forest-50 px-4 py-4 text-sm sm:mr-28">
              <PartyPopper className="h-6 w-6 text-rust-500" />
              <span className="font-semibold text-forest-800">All clear. Nothing needs you.</span>
              <button
                type="button"
                onClick={() => setCleared([])}
                className="-ml-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-forest-700 hover:bg-forest-100"
              >
                <RotateCcw className="h-3 w-3" /> Bring them back
              </button>
            </div>
          )}
          </div>
        </section>

        <section
          aria-label="Staff phone app preview"
          className="relative mx-auto mt-6 w-60 rounded-[2rem] border-[6px] border-forest-950 bg-paper p-3.5 shadow-2xl sm:absolute sm:-bottom-12 sm:right-0 sm:mt-0 sm:w-52"
        >
          <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-ink-200" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-500">Staff phone app</p>
          <p key={room} className="animate-rise font-serif text-base font-semibold text-forest-900">
            Room {ROOMS[room]} · Deep clean
          </p>
          <p className="mt-2 flex items-center gap-1.5 font-serif text-3xl font-semibold tabular-nums text-forest-800">
            <Clock className="h-5 w-5 text-rust-500" />
            {clock(seconds)}
          </p>
          <ul className="mt-3 space-y-1 text-xs">
            {TASKS.map((task, i) => (
              <li key={task}>
                <button
                  type="button"
                  aria-pressed={done[i]}
                  onClick={() => setDone((d) => d.map((v, n) => (n === i ? !v : v)))}
                  className="flex w-full items-center gap-2 rounded-md px-1 py-0.5 text-left text-ink-700 transition hover:bg-cream"
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded transition ${
                      done[i] ? "bg-forest-700 text-cream" : "border border-ink-300 bg-white"
                    }`}
                  >
                    {done[i] ? <Check className="h-3 w-3 animate-pop" /> : null}
                  </span>
                  <span className={done[i] ? "text-ink-500 line-through" : ""}>{task}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={finish}
            disabled={!allDone}
            className={`mt-3 w-full rounded-xl py-2 text-center text-xs font-bold transition ${
              allDone
                ? "bg-forest-800 text-cream shadow-lg shadow-forest-900/30 hover:bg-forest-900"
                : "cursor-not-allowed bg-ink-200 text-ink-500"
            }`}
          >
            {allDone ? "Finish clean" : "Tick every step to finish"}
          </button>
        </section>
      </div>
    </div>
  );
}
