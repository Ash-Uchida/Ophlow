"use client";

import {
  BarChart3,
  CalendarDays,
  Camera,
  Check,
  DoorOpen,
  Droplets,
  Minus,
  Plus,
  Sparkles,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type Tab = { id: string; icon: LucideIcon; title: string; body: string; hint: string; demo: () => ReactNode };

const TABS: Tab[] = [
  {
    id: "rooms",
    icon: DoorOpen,
    title: "Rooms",
    body: "Check rooms in and out by room number. A checkout sends the room straight to housekeeping.",
    hint: "Tap a room to move it along",
    demo: () => <RoomsDemo />,
  },
  {
    id: "housekeeping",
    icon: Sparkles,
    title: "Housekeeping",
    body: "Timed cleans with checklists and targets, plus a director's inspection before a room is ready.",
    hint: "Start the clean and beat the target",
    demo: () => <CleanDemo />,
  },
  {
    id: "dining",
    icon: UtensilsCrossed,
    title: "Dining",
    body: "Nurse stations send meal orders by room and the kitchen works from a live queue. Fridge temperatures and daily checklists are logged too.",
    hint: "Send an order and watch it move",
    demo: () => <DiningDemo />,
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Maintenance",
    body: "Requests with photos, live status, and a before-and-after picture when the fix is done.",
    hint: "Move the repair along to fixed",
    demo: () => <RepairDemo />,
  },
  {
    id: "activities",
    icon: CalendarDays,
    title: "Activities & calendar",
    body: "One calendar for every department, with head counts and a flag when something is slipping.",
    hint: "Take the head count",
    demo: () => <HeadCountDemo />,
  },
  {
    id: "insights",
    icon: BarChart3,
    title: "Manager insights",
    body: "A weekly pulse showing how long each step takes and where the wait really is.",
    hint: "Spot the bottleneck",
    demo: () => <InsightsDemo />,
  },
];

export function ProductTour() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  function onKey(event: KeyboardEvent) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + TABS.length) % TABS.length;
    setActive(next);
    document.getElementById(`tour-tab-${TABS[next].id}`)?.focus();
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
      <div role="tablist" aria-label="Product tour" aria-orientation="vertical" onKeyDown={onKey} className="grid gap-2">
        {TABS.map(({ id, icon: Icon, title, body }, i) => {
          const on = i === active;
          return (
            <button
              key={id}
              id={`tour-tab-${id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="tour-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group flex gap-4 rounded-2xl border p-4 text-left transition ${
                on
                  ? "border-forest-300 bg-paper shadow-lg shadow-forest-900/5"
                  : "border-transparent hover:border-ink-200 hover:bg-paper/60"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                  on ? "bg-forest-800 text-cream" : "bg-ink-100 text-rust-500 group-hover:bg-ink-200"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-serif text-lg font-semibold text-forest-950">{title}</span>
                <span
                  className={`grid transition-all duration-300 ${on ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <span className="overflow-hidden text-[15px] leading-relaxed text-ink-700">{body}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative mx-auto flex w-full max-w-[22rem] flex-col items-center">
        <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-forest-100/70 blur-3xl" />
        <p className="mb-3 whitespace-nowrap text-center font-hand text-2xl text-rust-500">{tab.hint} ↓</p>
        <div
          id="tour-panel"
          role="tabpanel"
          aria-labelledby={`tour-tab-${tab.id}`}
          className="relative h-[30rem] w-[17.5rem] overflow-hidden rounded-[2.5rem] border-[7px] border-forest-950 bg-paper shadow-2xl"
        >
          <div className="mx-auto mt-2.5 h-1.5 w-16 rounded-full bg-ink-200" />
          <div key={tab.id} className="h-full animate-rise px-4 pb-6 pt-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-500">Ophlow · {tab.title}</p>
            {tab.demo()}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Rooms ---------- */

const ROOM_STAGES = [
  { label: "Occupied", tone: "bg-forest-800 text-cream" },
  { label: "Checked out", tone: "bg-rust-500 text-white" },
  { label: "Cleaning", tone: "bg-amber-soft text-ink-900" },
  { label: "Ready", tone: "bg-forest-100 text-forest-800" },
];

function RoomsDemo() {
  const [rooms, setRooms] = useState([0, 0, 1, 2, 0, 3, 0, 0, 2]);
  const counts = ROOM_STAGES.map((_, s) => rooms.filter((r) => r === s).length);
  return (
    <div>
      <p className="mt-1 font-serif text-xl font-semibold text-forest-900">Building A</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {rooms.map((stage, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRooms((r) => r.map((s, n) => (n === i ? (s + 1) % ROOM_STAGES.length : s)))}
            aria-label={`Room ${101 + i}: ${ROOM_STAGES[stage].label}`}
            className={`flex aspect-square flex-col items-center justify-center rounded-2xl text-center transition active:scale-95 ${ROOM_STAGES[stage].tone}`}
          >
            <span className="font-serif text-lg font-semibold">{101 + i}</span>
            <span key={stage} className="animate-pop text-[10px] font-semibold leading-tight">
              {ROOM_STAGES[stage].label}
            </span>
          </button>
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-1.5 text-[11px] text-ink-600">
        {ROOM_STAGES.map((s, i) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${s.tone.split(" ")[0]}`} />
            {s.label} · {counts[i]}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Housekeeping ---------- */

const TARGET = 30;

function CleanDemo() {
  const [phase, setPhase] = useState<"idle" | "running" | "inspect" | "ready">("idle");
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (phase !== "running") return;
    const timer = setInterval(() => setMinutes((m) => Math.min(m + 1, 60)), 180);
    return () => clearInterval(timer);
  }, [phase]);

  const over = minutes > TARGET;
  const pct = Math.min(100, (minutes / TARGET) * 100);

  return (
    <div className="flex h-[calc(100%-1rem)] flex-col">
      <p className="mt-1 font-serif text-xl font-semibold text-forest-900">Room 108 · Deep clean</p>
      <p className="text-xs text-ink-500">Target {TARGET} min</p>
      <p className={`mt-6 text-center font-serif text-6xl font-semibold tabular-nums ${over ? "text-rust-500" : "text-forest-800"}`}>
        {minutes}
        <span className="text-2xl"> min</span>
      </p>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full transition-all duration-200 ${over ? "bg-rust-500" : "bg-forest-600"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-center text-xs text-ink-500">
        {phase === "ready"
          ? "Room is ready for the next resident."
          : over
            ? `${minutes - TARGET} min over the target`
            : `${TARGET - minutes} min left on the target`}
      </p>
      <div className="mt-auto">
        {phase === "idle" ? (
          <PhoneButton onClick={() => setPhase("running")}>Start clean</PhoneButton>
        ) : phase === "running" ? (
          <PhoneButton onClick={() => setPhase("inspect")}>Finish clean</PhoneButton>
        ) : phase === "inspect" ? (
          <PhoneButton onClick={() => setPhase("ready")} tone="rust">
            Pass inspection
          </PhoneButton>
        ) : (
          <div className="space-y-2">
            <p className="flex animate-pop items-center justify-center gap-2 rounded-xl bg-forest-100 py-2.5 text-sm font-semibold text-forest-800">
              <Check className="h-4 w-4" /> Ready
            </p>
            <PhoneButton
              onClick={() => {
                setMinutes(0);
                setPhase("idle");
              }}
              tone="ghost"
            >
              Clean another room
            </PhoneButton>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Dining ---------- */

const ORDER_STAGES = ["Ordered", "Cooking", "On the way", "Delivered"];
const ORDER_ROOMS = [203, 118, 110, 214, 105, 221, 116];

function DiningDemo() {
  const [orders, setOrders] = useState([
    { id: 1, room: 107, stage: 2 },
    { id: 2, room: 112, stage: 1 },
  ]);
  const [next, setNext] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((list) =>
        list
          .map((o) => (o.stage < ORDER_STAGES.length - 1 ? { ...o, stage: o.stage + 1 } : o))
          .filter((o, i, all) => o.stage < ORDER_STAGES.length - 1 || i >= all.length - 3),
      );
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  function send() {
    setOrders((list) => [...list, { id: Date.now(), room: ORDER_ROOMS[next % ORDER_ROOMS.length], stage: 0 }].slice(-4));
    setNext((n) => n + 1);
  }

  return (
    <div className="flex h-[calc(100%-1rem)] flex-col">
      <p className="mt-1 font-serif text-xl font-semibold text-forest-900">Kitchen queue</p>
      <ul className="mt-3 space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="animate-rise rounded-xl border border-ink-200 bg-white p-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-ink-900">Room {o.room}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  o.stage === 3 ? "bg-forest-100 text-forest-800" : o.stage === 2 ? "bg-amber-soft/60 text-ink-900" : "bg-ink-100 text-ink-700"
                }`}
              >
                {ORDER_STAGES[o.stage]}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1">
              {ORDER_STAGES.map((s, i) => (
                <span key={s} className={`h-1.5 rounded-full transition-colors duration-500 ${i <= o.stage ? "bg-forest-600" : "bg-ink-100"}`} />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <PhoneButton onClick={send}>
          <Plus className="h-4 w-4" /> Send an order
        </PhoneButton>
      </div>
    </div>
  );
}

/* ---------- Maintenance ---------- */

const REPAIR_STAGES = ["Reported", "In progress", "Fixed"];

function RepairDemo() {
  const [stage, setStage] = useState(0);
  return (
    <div className="flex h-[calc(100%-1rem)] flex-col">
      <p className="mt-1 font-serif text-xl font-semibold text-forest-900">Leaky faucet</p>
      <p className="text-xs text-ink-500">Room 210 · Bathroom</p>
      <ol className="mt-4 flex items-center gap-1">
        {REPAIR_STAGES.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col items-center gap-1">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${
                i <= stage ? "bg-forest-700 text-cream" : "bg-ink-100 text-ink-500"
              }`}
            >
              {i < stage || stage === 2 ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className="text-[10px] font-semibold text-ink-600">{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Photo label="Before" tone="bg-rust-50 text-rust-500" icon={<Droplets className="h-8 w-8" />} />
        {stage === 2 ? (
          <div className="animate-pop">
            <Photo label="After" tone="bg-forest-50 text-forest-600" icon={<Check className="h-8 w-8" />} />
          </div>
        ) : (
          <div className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 text-ink-400">
            <Camera className="h-6 w-6" />
            <span className="mt-1 text-[10px]">After photo</span>
          </div>
        )}
      </div>
      <div className="mt-auto">
        {stage < 2 ? (
          <PhoneButton onClick={() => setStage((s) => s + 1)}>{stage === 0 ? "Start the repair" : "Mark fixed"}</PhoneButton>
        ) : (
          <PhoneButton onClick={() => setStage(0)} tone="ghost">
            Report another
          </PhoneButton>
        )}
      </div>
    </div>
  );
}

function Photo({ label, tone, icon }: { label: string; tone: string; icon: ReactNode }) {
  return (
    <div className={`relative flex aspect-square items-center justify-center rounded-xl ${tone}`}>
      {icon}
      <span className="absolute bottom-1.5 left-1.5 rounded bg-white/80 px-1.5 text-[10px] font-semibold text-ink-700">{label}</span>
    </div>
  );
}

/* ---------- Activities ---------- */

const ACTIVITY_ROOMS = [102, 104, 106, 109, 111, 114];

function HeadCountDemo() {
  const [count, setCount] = useState(0);
  const [marked, setMarked] = useState<number[]>([]);

  function toggle(room: number) {
    const next = marked.includes(room) ? marked.filter((r) => r !== room) : [...marked, room];
    setMarked(next);
    setCount((c) => Math.max(c, next.length));
  }

  return (
    <div>
      <p className="mt-1 font-serif text-xl font-semibold text-forest-900">Chair yoga</p>
      <p className="text-xs text-ink-500">10:00 AM · Activity room</p>
      <p className="mt-5 text-center text-sm font-semibold text-ink-700">How many people came?</p>
      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="One fewer"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-300 text-forest-900 transition hover:bg-cream active:scale-90"
        >
          <Minus className="h-5 w-5" />
        </button>
        <span key={count} className="w-16 animate-pop text-center font-serif text-5xl font-semibold tabular-nums text-forest-800">
          {count}
        </span>
        <button
          type="button"
          aria-label="One more"
          onClick={() => setCount((c) => Math.min(99, c + 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-cream transition hover:bg-forest-900 active:scale-90"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-6 text-[11px] font-bold uppercase tracking-wider text-ink-500">Which rooms came? (optional)</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {ACTIVITY_ROOMS.map((room) => {
          const on = marked.includes(room);
          return (
            <button
              key={room}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(room)}
              className={`rounded-lg py-2 text-sm font-semibold transition active:scale-95 ${
                on ? "bg-forest-700 text-cream" : "border border-ink-200 bg-white text-ink-700 hover:border-forest-300"
              }`}
            >
              {room}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Insights ---------- */

const STEPS = [
  { label: "Checkout → cleaning starts", minutes: 95, slow: true },
  { label: "Cleaning", minutes: 38, slow: false },
  { label: "Waiting for inspection", minutes: 52, slow: false },
  { label: "Inspection", minutes: 9, slow: false },
];

function InsightsDemo() {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const max = Math.max(...STEPS.map((s) => s.minutes));
  return (
    <div>
      <p className="mt-1 font-serif text-xl font-semibold text-forest-900">Checkout to ready</p>
      <p className="text-xs text-ink-500">Average this week · sample data</p>
      <ul className="mt-5 space-y-3.5">
        {STEPS.map((s, i) => (
          <li key={s.label}>
            <div className="flex justify-between text-xs">
              <span className={s.slow ? "font-semibold text-rust-600" : "text-ink-700"}>{s.label}</span>
              <span className="font-semibold tabular-nums text-ink-900">{s.minutes} min</span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-ink-100">
              <div
                className={`h-full rounded-full transition-[width] duration-1000 ease-out ${s.slow ? "bg-rust-500" : "bg-forest-600"}`}
                style={{ width: grown ? `${(s.minutes / max) * 100}%` : "0%", transitionDelay: `${i * 120}ms` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-xl bg-rust-50 p-3 text-xs leading-relaxed text-rust-700">
        <span className="font-bold">Bottleneck:</span> rooms wait 95 min before anyone starts cleaning. Fix that first.
      </div>
    </div>
  );
}

/* ---------- Shared ---------- */

function PhoneButton({
  children,
  onClick,
  tone = "forest",
}: {
  children: ReactNode;
  onClick: () => void;
  tone?: "forest" | "rust" | "ghost";
}) {
  const tones = {
    forest: "bg-forest-800 text-cream hover:bg-forest-900",
    rust: "bg-rust-500 text-white hover:bg-rust-600",
    ghost: "border border-ink-300 text-forest-900 hover:bg-cream",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-bold transition active:scale-[0.98] ${tones[tone]}`}
    >
      {children}
    </button>
  );
}
