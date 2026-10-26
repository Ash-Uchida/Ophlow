"use client";

import { CalendarDays, Check, Circle, Laptop, Mail, Plus, Smartphone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/back-link";
import { IntakeWizard, STEPS } from "@/components/intake-wizard";
import { Mark } from "@/components/logo";
import { PhonePreview } from "@/components/phone-preview";
import { detectTimeZone } from "@/components/time-zone-picker";
import { APP_NAV, EMPTY, navFor, type AppSection } from "@/lib/app-nav";
import { FEATURES, featureNames, featuresFromSearch, featuresHref } from "@/lib/features";
import { emptyIntake, type Intake } from "@/lib/intake";
import { SITE } from "@/lib/site";

const DRAFT_KEY = "ophlow-setup-draft";

export function Workspace() {
  const [section, setSection] = useState<AppSection>("setup");
  const [intake, setIntake] = useState<Intake>(() => emptyIntake());
  const [step, setStep] = useState(0);
  const [banner, setBanner] = useState(true);
  const [loaded, setLoaded] = useState(false);
  // Opened from the home page's builder: the sidebar only has the screens for the features they picked.
  const [built, setBuilt] = useState(false);
  const [view, setView] = useState<"laptop" | "phone">("laptop");

  // Bring back an unfinished form (it's only kept in this browser), then apply features picked on the home page.
  useEffect(() => {
    let next = emptyIntake(detectTimeZone());
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) next = { ...emptyIntake(), ...JSON.parse(saved) };
    } catch {
      // Private window or blocked storage: start fresh.
    }
    const picked = featureNames(featuresFromSearch(window.location.search));
    if (picked.length) next = { ...next, modules: picked };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIntake(next);
    setBuilt(picked.length > 0);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(intake));
    } catch {
      // Not saving the draft is fine.
    }
  }, [intake, loaded]);

  const goToStep = (n: number) => {
    setStep(n);
    setSection("setup");
    setView("laptop");
  };

  const name = intake.community.trim() || "Your community";
  // Follows "Features to turn on" in setup, so ticking one there adds its screen here.
  const nav = built ? navFor(FEATURES.filter((f) => intake.modules.includes(f.name)).map((f) => f.id)) : APP_NAV;
  const shown = nav.some((n) => n.id === section) ? section : "setup";

  return (
    <div className="min-h-screen bg-cream md:flex">
      <aside className="hidden w-60 shrink-0 flex-col bg-forest-900 md:flex">
        <div className="flex items-center gap-3 px-5 py-5">
          <Mark className="h-8 w-8" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold tracking-tight text-white">{name}</p>
            <p className="text-[11px] text-forest-300">Operations hub</p>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 px-3" aria-label="Workspace">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              aria-current={shown === id ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                shown === id ? "bg-forest-700 text-white" : "text-forest-200 hover:bg-forest-800 hover:text-forest-50"
              }`}
            >
              <Icon className={`h-4 w-4 ${shown === id ? "text-rust-200" : ""}`} />
              {label}
              {id === "setup" ? <span className="ml-auto rounded-full bg-rust-400 px-1.5 text-[10px] font-bold text-white">new</span> : null}
            </button>
          ))}
          {built ? (
            <Link href="/#build" className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rust-200 transition hover:bg-forest-800">
              <Plus className="h-4 w-4" /> Add features
            </Link>
          ) : null}
        </nav>
        <div className="border-t border-forest-800 px-5 py-4 text-xs">
          <p className="font-semibold text-forest-50">{intake.contactName || "Operations manager"}</p>
          <p className="truncate text-forest-300">{intake.email || "you@community.com"}</p>
          <BackLink label="Back to site" className="mt-2 gap-1 text-rust-200 hover:underline" iconClassName="h-3 w-3" />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-ink-200 bg-paper px-4 py-3 md:hidden">
          <p className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-forest-900">
            <Mark className="h-8 w-8" />
            {name}
          </p>
          <BackLink label="Back to site" className="gap-1 text-xs text-ink-600" iconClassName="h-3.5 w-3.5" />
        </header>
        <nav aria-label="Workspace sections" className="flex gap-1 overflow-x-auto border-b border-ink-200 bg-paper px-3 py-2 md:hidden">
          {nav.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${shown === id ? "bg-forest-800 text-cream" : "text-ink-600"}`}
            >
              {label}
            </button>
          ))}
          {built ? (
            <Link href="/#build" className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-rust-600">
              + Add features
            </Link>
          ) : null}
        </nav>

        <main className="mx-auto max-w-5xl px-4 pb-20 pt-6 md:px-8 md:pt-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <BackLink label="Back to site" className="hidden text-sm text-ink-600 hover:text-forest-800 md:inline-flex" />
            <div role="group" aria-label="Preview on" className="ml-auto inline-flex rounded-full border border-ink-200 bg-paper p-1 shadow-sm">
              {(
                [
                  ["laptop", "Laptop", Laptop],
                  ["phone", "Phone", Smartphone],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={view === id}
                  onClick={() => setView(id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    view === id ? "bg-forest-800 text-cream shadow" : "text-ink-600 hover:text-forest-800"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>
          </div>
          {view === "phone" ? (
            <PhonePreview name={name} nav={nav} section={shown} setSection={setSection} onLaptop={() => setView("laptop")} />
          ) : null}
          {view === "laptop" && banner ? (
            <div role="status" className="mb-6 flex items-start gap-3 rounded-2xl border border-rust-200 bg-rust-50 px-4 py-3.5 text-sm text-ink-800">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-rust-600" />
              <p className="flex-1 leading-relaxed">
                <strong>Welcome! This is your workspace — it&apos;s empty until we set up your building.</strong> Email{" "}
                <a className="font-semibold text-forest-800 underline" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Help setting up Ophlow")}`}>
                  {SITE.email}
                </a>{" "}
                with the checklists, schedules or spreadsheets you use today, and fill in the setup steps below so we know what to build.
              </p>
              <button type="button" aria-label="Dismiss" onClick={() => setBanner(false)} className="text-ink-500 hover:text-forest-900">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          {view === "phone" ? null : shown === "setup" ? (
            <SetupHome intake={intake} setIntake={setIntake} step={step} setStep={setStep} />
          ) : (
            <EmptyScreen section={shown} onSetup={() => goToStep(EMPTY[shown].step)} />
          )}
        </main>
      </div>
    </div>
  );
}

function SetupHome({ intake, setIntake, step, setStep }: { intake: Intake; setIntake: (i: Intake) => void; step: number; setStep: (n: number) => void }) {
  const checklist = [
    { label: "Tell us about your community", done: step > 0 },
    { label: `Email your checklists and schedules to ${SITE.email}`, done: false },
    { label: "We set up your rooms, teams & screens", done: false },
    { label: "First shift with us on the floor", done: false },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-forest-950">Let&apos;s get you set up</h1>
        <p className="mt-2 text-ink-600">
          About 10 minutes. Skip anything you&apos;re not sure about — we&apos;ll fill the gaps together. Your answers save in this browser as you go.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
        <IntakeWizard intake={intake} setIntake={setIntake} step={step} setStep={setStep} />
        <div className="space-y-4">
          <div className="rounded-3xl border border-ink-200 bg-paper p-5">
            <p className="text-sm font-semibold text-forest-950">Your path to go-live</p>
            <ol className="mt-4 space-y-3">
              {checklist.map((c) => (
                <li key={c.label} className="flex gap-2.5 text-sm text-ink-700">
                  {c.done ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />}
                  <span className="break-words">{c.label}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-ink-200 bg-paper p-5">
            <p className="text-sm font-semibold text-forest-950">Setup steps</p>
            <ul className="mt-3 space-y-1">
              {STEPS.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => (i === 0 || intake.community.trim()) && setStep(i)}
                    className={`w-full rounded-lg px-2.5 py-1.5 text-left text-sm ${i === step ? "bg-forest-50 font-semibold text-forest-800" : "text-ink-600 hover:bg-cream"}`}
                  >
                    {i + 1}. {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={featuresHref("/book", FEATURES.filter((f) => intake.modules.includes(f.name)).map((f) => f.id))}
            className="flex items-center gap-3 rounded-3xl bg-forest-900 p-5 text-sm text-forest-100 transition hover:bg-forest-950"
          >
            <CalendarDays className="h-5 w-5 shrink-0 text-rust-200" />
            <span>
              <span className="block font-semibold text-white">Rather talk it through?</span>
              Book a call and we&apos;ll fill this in together.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmptyScreen({ section, onSetup }: { section: Exclude<AppSection, "setup">; onSetup: () => void }) {
  const nav = APP_NAV.find((n) => n.id === section)!;
  const e = EMPTY[section];
  const Icon = nav.icon;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-forest-950">{nav.label}</h1>
      <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-ink-200 bg-paper px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-50 text-forest-700">
          <Icon className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-forest-950">{e.title}</h2>
        <p className="mt-2 max-w-md leading-relaxed text-ink-600">{e.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={onSetup} className="rounded-full bg-forest-800 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-forest-900">
            Continue setup: {STEPS[e.step]}
          </button>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent("Help setting up Ophlow")}`}
            className="rounded-full border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-forest-900 hover:border-forest-400"
          >
            Email us for help
          </a>
        </div>
      </div>
    </div>
  );
}
