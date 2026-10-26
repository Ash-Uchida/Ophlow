"use client";

import { ArrowDown, ArrowRight, ArrowUp, CalendarDays, Check, ChevronUp, GripVertical, LayoutGrid, Plus, RotateCcw, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FEATURES, FEATURE_BY_ID, FEATURE_GROUPS, TONES, featuresHref, type Feature } from "@/lib/features";

const KEY = "ophlow-feature-builder-v1";
/** What the pilot building runs today: a one-click starting point. */
const PILOT = ["rooms", "housekeeping", "orders", "maintenance", "today"];

type State = { order: string[]; off: Record<string, number[]>; collapsed: Record<string, boolean> };
const EMPTY: State = { order: [], off: {}, collapsed: {} };

/**
 * The home page version of our call-time "Feature Builder": drag features (or click them) onto your screen,
 * reorder them, untick what you don't need, then take the picks to Book a demo or Get started.
 */
export function FeatureBuilder() {
  const [state, setState] = useState<State>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [over, setOver] = useState(false);
  const [dropAt, setDropAt] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);
  const dragging = useRef<{ kind: "add" | "move"; id: string } | null>(null);
  const cards = useRef(new Map<string, HTMLElement>());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as State | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setState({ ...EMPTY, ...saved, order: (saved.order ?? []).filter((id) => FEATURE_BY_ID[id]) });
    } catch {
      // Private window or blocked storage: start with an empty screen.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // Not remembering the picks is fine.
    }
  }, [state, loaded]);

  const showCard = (id: string, block: ScrollLogicalPosition = "nearest") => {
    requestAnimationFrame(() => cards.current.get(id)?.scrollIntoView({ behavior: "smooth", block }));
  };

  const add = (id: string, at?: number) => {
    if (state.order.includes(id)) {
      setFlash(id);
      setTimeout(() => setFlash((f) => (f === id ? null : f)), 900);
      showCard(id, "center");
      return;
    }
    const order = [...state.order];
    order.splice(at ?? order.length, 0, id);
    setState({ ...state, order });
    showCard(id);
  };

  const move = (id: string, to: number) => {
    const order = state.order.filter((x) => x !== id);
    order.splice(Math.max(0, Math.min(to, order.length)), 0, id);
    setState({ ...state, order });
  };

  const remove = (id: string) => setState({ ...state, order: state.order.filter((x) => x !== id) });

  const toggleCap = (id: string, i: number) => {
    const off = new Set(state.off[id] ?? []);
    if (off.has(i)) off.delete(i);
    else off.add(i);
    setState({ ...state, off: { ...state.off, [id]: [...off] } });
  };

  const capCount = state.order.reduce((n, id) => n + FEATURE_BY_ID[id].caps.length - (state.off[id]?.length ?? 0), 0);

  /** Where a drop at this height lands among the cards on screen. */
  const indexAt = (y: number) => {
    const els = state.order.map((id) => cards.current.get(id)).filter(Boolean) as HTMLElement[];
    for (let i = 0; i < els.length; i++) {
      const r = els[i].getBoundingClientRect();
      if (y < r.top + Math.min(r.height / 2, 80)) return i;
    }
    return els.length;
  };

  const endDrag = () => {
    dragging.current = null;
    setMovingId(null);
    setOver(false);
    setDropAt(null);
  };

  const q = query.trim().toLowerCase();
  const matches = (f: Feature) => !q || `${f.name} ${f.tagline} ${f.caps.join(" ")}`.toLowerCase().includes(q);

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] border border-ink-200 bg-paper shadow-xl shadow-forest-900/5 lg:grid-cols-[19rem_minmax(0,1fr)]">
      {/* Palette */}
      <aside className="border-b border-ink-200 bg-cream/60 p-5 lg:border-b-0 lg:border-r">
        <p className="text-sm text-ink-600">
          <span className="hidden sm:inline">Drag a feature onto your screen, or </span>
          <span className="sm:hidden">Tap a feature to add it, or </span>
          <span className="hidden sm:inline">click it to add.</span>
          <span className="sm:hidden">drag it.</span>
        </p>
        <label className="mt-3 flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 focus-within:border-forest-400 focus-within:ring-2 focus-within:ring-forest-100">
          <Search className="h-4 w-4 text-ink-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a feature"
            aria-label="Find a feature"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-ink-900 outline-none placeholder:text-ink-400"
          />
        </label>
        <div className="mt-4 max-h-[26rem] space-y-4 overflow-y-auto pr-1 lg:max-h-[38rem]">
          {FEATURE_GROUPS.map((g) => {
            const items = FEATURES.filter((f) => f.group === g && matches(f));
            if (!items.length) return null;
            return (
              <div key={g}>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-500">{g}</p>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
                  {items.map((f) => {
                    const on = state.order.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        type="button"
                        draggable
                        onDragStart={(e) => {
                          dragging.current = { kind: "add", id: f.id };
                          e.dataTransfer.setData("text/plain", f.name);
                          e.dataTransfer.effectAllowed = "copyMove";
                        }}
                        onDragEnd={endDrag}
                        onClick={() => add(f.id)}
                        title={f.tagline}
                        className={`group flex w-full cursor-grab items-center gap-3 rounded-xl border p-2.5 text-left transition active:cursor-grabbing ${
                          on ? "border-forest-300 bg-forest-50" : "border-ink-200 bg-white hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-md"
                        }`}
                      >
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${TONES[f.tone]}`}>
                          <f.icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-forest-950">{f.name}</span>
                          <span className="block truncate text-xs text-ink-500">{on ? "On your screen" : f.tagline}</span>
                        </span>
                        {on ? <Check className="h-4 w-4 shrink-0 text-forest-600" /> : <Plus className="h-4 w-4 shrink-0 text-ink-400 transition group-hover:text-rust-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {FEATURES.every((f) => !matches(f)) ? <p className="text-sm text-ink-500">Nothing matches.</p> : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-ink-200 pt-3 text-sm">
          <button type="button" onClick={() => setState({ ...state, order: FEATURES.map((f) => f.id) })} className="inline-flex items-center gap-1.5 font-semibold text-forest-800 hover:text-rust-600">
            <LayoutGrid className="h-3.5 w-3.5" /> Add everything
          </button>
          <button type="button" onClick={() => setState(EMPTY)} disabled={!state.order.length} className="inline-flex items-center gap-1.5 font-semibold text-ink-500 hover:text-rust-600 disabled:opacity-40">
            <RotateCcw className="h-3.5 w-3.5" /> Clear
          </button>
        </div>
      </aside>

      {/* Canvas */}
      <section
        aria-label="Your Ophlow"
        className={`flex min-h-[30rem] flex-col transition ${over ? "bg-forest-50/60" : ""}`}
        onDragOver={(e) => {
          if (!dragging.current) return;
          e.preventDefault();
          setOver(true);
          setDropAt(state.order.length ? indexAt(e.clientY) : null);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setOver(false);
            setDropAt(null);
          }
        }}
        onDrop={(e) => {
          const d = dragging.current;
          if (!d) return;
          e.preventDefault();
          const at = indexAt(e.clientY);
          if (d.kind === "add") add(d.id, at);
          else move(d.id, state.order.indexOf(d.id) < at ? at - 1 : at);
          endDrag();
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-200 px-5 py-4 sm:px-7">
          <div>
            <p className="font-serif text-xl font-semibold text-forest-950">Your Ophlow</p>
            <p className="text-sm text-ink-500">
              {state.order.length
                ? `${state.order.length} feature${state.order.length === 1 ? "" : "s"} · ${capCount} thing${capCount === 1 ? "" : "s"} you can do`
                : "Nothing on your screen yet"}
            </p>
          </div>
          {state.order.length ? (
            <span className="hidden rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800 sm:block">Drag ⋮⋮ to reorder</span>
          ) : null}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5 sm:p-7 lg:max-h-[38rem]">
          {!state.order.length ? (
            <div
              className={`flex h-full min-h-[22rem] flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 text-center transition ${
                over ? "border-forest-400 bg-forest-50" : "border-ink-200"
              }`}
            >
              <span className="flex h-14 w-14 animate-float items-center justify-center rounded-2xl bg-forest-100 text-forest-700">
                <LayoutGrid className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-forest-950">Drag features here</h3>
              <p className="mt-2 max-w-sm text-ink-600">Pick what your building needs. Each one shows what your team can do with it.</p>
              <button
                type="button"
                onClick={() => setState({ ...state, order: PILOT })}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-forest-900 transition hover:-translate-y-0.5 hover:border-forest-400"
              >
                <Sparkles className="h-4 w-4 text-rust-500" /> Start with what our pilot runs
              </button>
            </div>
          ) : null}

          {state.order.map((id, i) => {
            const f = FEATURE_BY_ID[id];
            const off = state.off[id] ?? [];
            const collapsed = Boolean(state.collapsed[id]);
            const missing = f.pairs.filter((p) => !state.order.includes(p));
            return (
              <div key={id}>
                {dropAt === i ? <DropLine /> : null}
                <article
                  ref={(el) => {
                    if (el) cards.current.set(id, el);
                    else cards.current.delete(id);
                  }}
                  className={`animate-rise rounded-2xl border bg-white transition ${
                    flash === id ? "border-rust-400 ring-4 ring-rust-100" : "border-ink-200 hover:border-forest-300"
                  } ${movingId === id ? "opacity-40" : ""}`}
                >
                  <div className="flex items-center gap-3 p-3 sm:p-4">
                    <span
                      draggable
                      onDragStart={(e) => {
                        dragging.current = { kind: "move", id };
                        setMovingId(id);
                        e.dataTransfer.setData("text/plain", f.name);
                        e.dataTransfer.effectAllowed = "move";
                        const card = cards.current.get(id);
                        if (card) e.dataTransfer.setDragImage(card, 24, 24);
                      }}
                      onDragEnd={endDrag}
                      title="Drag to reorder"
                      aria-hidden
                      className="hidden cursor-grab rounded-lg p-1 text-ink-400 hover:bg-cream hover:text-forest-800 active:cursor-grabbing sm:block"
                    >
                      <GripVertical className="h-5 w-5" />
                    </span>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${TONES[f.tone]}`}>
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-forest-950">{f.name}</h3>
                      <p className="truncate text-sm text-ink-500">{f.tagline}</p>
                    </div>
                    <div className="flex shrink-0 items-center">
                      <IconButton label={`Move ${f.name} up`} disabled={i === 0} onClick={() => move(id, i - 1)}>
                        <ArrowUp className="h-4 w-4" />
                      </IconButton>
                      <IconButton label={`Move ${f.name} down`} disabled={i === state.order.length - 1} onClick={() => move(id, i + 1)}>
                        <ArrowDown className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        label={collapsed ? `Show ${f.name} details` : `Fold ${f.name}`}
                        onClick={() => setState({ ...state, collapsed: { ...state.collapsed, [id]: !collapsed } })}
                      >
                        <ChevronUp className={`h-4 w-4 transition ${collapsed ? "rotate-180" : ""}`} />
                      </IconButton>
                      <IconButton label={`Remove ${f.name}`} onClick={() => remove(id)}>
                        <X className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </div>
                  {!collapsed ? (
                    <div className="border-t border-ink-100 px-4 pb-4 pt-3 sm:pl-[4.75rem]">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-500">What you can do</p>
                      <ul className="grid gap-1.5 md:grid-cols-2">
                        {f.caps.map((c, n) => {
                          const on = !off.includes(n);
                          return (
                            <li key={c}>
                              <label className={`flex cursor-pointer items-start gap-2 text-sm leading-snug ${on ? "text-ink-800" : "text-ink-400 line-through"}`}>
                                <input type="checkbox" checked={on} onChange={() => toggleCap(id, n)} className="mt-0.5 accent-forest-700" />
                                {c}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                      {missing.length ? (
                        <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
                          Pairs with
                          {missing.map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => add(p, i + 1)}
                              className="rounded-full bg-rust-50 px-2.5 py-1 font-semibold text-rust-700 transition hover:bg-rust-100"
                            >
                              + {FEATURE_BY_ID[p].name}
                            </button>
                          ))}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              </div>
            );
          })}
          {dropAt !== null && dropAt === state.order.length ? <DropLine /> : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 bg-cream/60 px-5 py-4 sm:px-7">
          <p className="text-sm text-ink-600">{state.order.length ? "We'll bring these to your demo." : "Pick a few, then bring them to a demo."}</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={featuresHref("/book", state.order)}
              className="group inline-flex items-center gap-2 rounded-full border border-ink-300 bg-paper px-5 py-2.5 text-sm font-semibold text-forest-900 transition hover:-translate-y-0.5 hover:border-forest-400"
            >
              <CalendarDays className="h-4 w-4 transition group-hover:-rotate-12" /> Book a demo{state.order.length ? " with these" : ""}
            </Link>
            <Link
              href={featuresHref("/workspace", state.order)}
              className="group inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-cream shadow-lg shadow-forest-900/20 transition hover:-translate-y-0.5 hover:bg-forest-900"
            >
              Get started <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function DropLine() {
  return <div aria-hidden className="my-1 h-1 rounded-full bg-rust-400" />;
}

function IconButton({ label, disabled = false, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded-lg p-1.5 text-ink-400 transition hover:bg-cream hover:text-forest-800 disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
