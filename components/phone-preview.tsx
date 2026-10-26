"use client";

import { ArrowLeft, Bell, ChevronRight, House, Laptop } from "lucide-react";
import { Mark } from "@/components/logo";
import { APP_NAV, EMPTY, type AppSection } from "@/lib/app-nav";

type Screen = Exclude<AppSection, "setup">;

/** Bottom tabs fit Home plus this many screens; the rest are on the home screen's list. */
const TAB_LIMIT = 4;

/**
 * The workspace as floor staff see it in the phone app: big buttons, bottom tabs, only the screens in `nav`.
 * Shares the current screen with the laptop view, so switching views keeps your place ("setup" is Home here).
 */
export function PhonePreview({
  name,
  nav,
  section,
  setSection,
  onLaptop,
}: {
  name: string;
  nav: typeof APP_NAV;
  section: AppSection;
  setSection: (s: AppSection) => void;
  onLaptop: () => void;
}) {
  const screens = nav.filter((n) => n.id !== "setup") as (Omit<(typeof APP_NAV)[number], "id"> & { id: Screen })[];
  const current = screens.find((s) => s.id === section);
  const tabs = screens.slice(0, TAB_LIMIT);

  return (
    <div className="flex flex-col items-center gap-6 overflow-x-clip py-2 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
      <div className="relative w-full max-w-[22rem]">
        <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-forest-100/70 blur-3xl" />
        <div className="relative flex h-[44rem] max-h-[80vh] min-h-[34rem] w-full flex-col overflow-hidden rounded-[2.75rem] border-[8px] border-forest-950 bg-paper shadow-2xl">
          <div className="mx-auto mt-2.5 h-1.5 w-20 shrink-0 rounded-full bg-ink-200" />

          <header className="flex shrink-0 items-center gap-2.5 border-b border-ink-200 px-4 pb-3 pt-3">
            {current ? (
              <button type="button" aria-label="Back to home" onClick={() => setSection("setup")} className="-ml-1 rounded-full p-1.5 text-forest-900 hover:bg-cream">
                <ArrowLeft className="h-5 w-5" />
              </button>
            ) : (
              <Mark className="h-7 w-7" />
            )}
            <p className="min-w-0 flex-1 truncate text-[15px] font-semibold text-forest-950">{current ? current.label : name}</p>
            {screens.some((s) => s.id === "alerts") ? (
              <button type="button" aria-label="Alerts" onClick={() => setSection("alerts")} className="rounded-full p-1.5 text-forest-800 hover:bg-cream">
                <Bell className="h-5 w-5" />
              </button>
            ) : null}
          </header>

          <div key={current?.id ?? "home"} className="flex-1 animate-rise overflow-y-auto px-4 py-5">
            {current ? (
              <div className="flex flex-col items-center px-2 pt-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-50 text-forest-700">
                  <current.icon className="h-8 w-8" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-forest-950">{EMPTY[current.id].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{EMPTY[current.id].body}</p>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-ink-500">Your screens</p>
                {screens.length ? (
                  <ul className="mt-3 space-y-2.5">
                    {screens.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => setSection(s.id)}
                          className="flex w-full items-center gap-3 rounded-2xl border border-ink-200 bg-white p-4 text-left transition hover:border-forest-300 active:scale-[0.98]"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-forest-800">
                            <s.icon className="h-5 w-5" />
                          </span>
                          <span className="flex-1 text-base font-semibold text-forest-950">{s.label}</span>
                          <ChevronRight className="h-5 w-5 text-ink-400" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 rounded-2xl bg-cream p-4 text-sm text-ink-600">No screens yet. Pick features to turn on in setup.</p>
                )}
              </>
            )}
          </div>

          <nav aria-label="Phone tabs" className="flex shrink-0 border-t border-ink-200 bg-white px-1 pb-4 pt-1.5">
            {[{ id: "setup" as AppSection, label: "Home", icon: House }, ...tabs].map((t) => {
              const on = t.id === "setup" ? !current : current?.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSection(t.id)}
                  className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-semibold transition ${on ? "text-forest-800" : "text-ink-400 hover:text-ink-600"}`}
                >
                  <t.icon className={`h-5 w-5 ${on ? "text-rust-500" : ""}`} />
                  <span className="w-full truncate px-0.5 text-center">{t.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-xs text-center lg:mt-24 lg:text-left">
        <p className="font-hand text-2xl text-rust-500">what floor staff see ↓</p>
        <h2 className="mt-1 text-2xl font-semibold text-forest-950">The staff phone app</h2>
        <p className="mt-3 leading-relaxed text-ink-600">
          Big buttons, bottom tabs, and only the screens your features turn on. Each person sees just their job. It installs to the home
          screen, with no app store needed.
        </p>
        <button
          type="button"
          onClick={onLaptop}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-5 py-2.5 text-sm font-semibold text-forest-900 transition hover:border-forest-400"
        >
          <Laptop className="h-4 w-4" /> Back to the laptop view
        </button>
      </div>
    </div>
  );
}
