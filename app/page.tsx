import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ClipboardList,
  Footprints,
  Mail,
  Plus,
  Ruler,
  Smartphone,
  Timer,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { LiveMock } from "@/components/live-mock";
import { Logo } from "@/components/logo";
import { PainPoints } from "@/components/pain-points";
import { PilotMeasures } from "@/components/pilot-measures";
import { ProductTour } from "@/components/product-tour";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { SITE } from "@/lib/site";

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ClipboardList,
    title: "Replace the paper",
    body: "Every check-in, clean, order, and repair gets a timestamp instead of a scribble. Nothing gets lost between shifts.",
  },
  {
    icon: Smartphone,
    title: "Built for people on their feet",
    body: "Big, simple screens on the phone staff already carry. Each person sees only their job — no training manual, no 40-tab dashboard.",
  },
  {
    icon: BarChart3,
    title: "Show where the time goes",
    body: "Every step is measured. See the one bottleneck worth fixing this week instead of guessing.",
  },
];

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Footprints,
    title: "We shadow the floor",
    body: "We spend time with the people doing the work and map every clipboard, whiteboard, and group text.",
  },
  {
    icon: Ruler,
    title: "We build the smallest useful thing",
    body: "Working software in weeks, not a slide deck. It has to be faster than the paper it replaces.",
  },
  {
    icon: Users,
    title: "We ship with the team",
    body: "Changes go out weekly, and the people using the tool decide what gets built next.",
  },
  {
    icon: Timer,
    title: "We measure the minutes",
    body: "Every step is timed, so improvements are proven with data, not assumed.",
  },
];

const FAQS = [
  {
    q: "We already have an EHR. Do we need to replace it?",
    a: "No. Your EHR handles clinical records and compliance. Ophlow handles the building's day — cleans, repairs, meal orders — the work your EHR was never designed for. The two don't compete.",
  },
  {
    q: "Will our staff actually use it?",
    a: "That's the whole bet. Big buttons, three taps to finish a clean, nothing they don't need. We design it with the people who'll tap it, on the floor, before we ship it.",
  },
  {
    q: "What about resident privacy?",
    a: "Ophlow works with room numbers only. Resident names and health information never go into the system — and each person sees only the screens for their job.",
  },
  {
    q: "How long does setup take?",
    a: "Days, not months. We map your building's actual workflows on the floor, configure the software around them, and your team is using it within weeks.",
  },
  {
    q: "What does it cost?",
    a: "We're working with a small number of design partners right now, and pricing is part of that conversation — not a price list. Book a demo and we'll talk about what makes sense for your building.",
  },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-rust-200" : "text-rust-600"}`}>
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] animate-float rounded-full bg-forest-100/70 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 animate-float rounded-full bg-rust-100/60 blur-3xl [animation-delay:-3s]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(31,60,39,0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          />
          <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-16 lg:pt-24">
            <div className="mx-auto max-w-3xl animate-rise text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-paper px-4 py-1.5 text-sm font-medium text-forest-800">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-400 opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest-500" />
                </span>
                Live pilot at an assisted living community
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] text-forest-950 sm:text-5xl lg:text-6xl">
                The clipboard is the bottleneck.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
                Ophlow gives your housekeeping, dining, and maintenance teams one simple system — big buttons, timestamps,
                no training manual. Managers finally see where the day goes.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#demo"
                  className="group inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-forest-900/20 transition hover:-translate-y-0.5 hover:bg-forest-900 hover:shadow-xl"
                >
                  <CalendarDays className="h-4 w-4" /> Book a demo
                </a>
                <a
                  href="#how"
                  className="group inline-flex items-center gap-2 rounded-full border border-ink-300 bg-paper px-6 py-3.5 text-sm font-semibold text-forest-900 transition hover:-translate-y-0.5 hover:border-forest-400"
                >
                  See how it works <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="mx-auto mt-16 max-w-xl animate-rise [animation-delay:150ms]">
              <LiveMock />
            </div>
          </div>
        </section>

        {/* Proof strip */}
        <section aria-label="Live pilot" className="border-y border-ink-200/70 bg-forest-950 text-cream">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-rust-200">Live pilot</p>
              <p className="mt-2 text-2xl font-semibold">Homestead Senior Living</p>
              <p className="mt-1 text-sm text-forest-200">What we measure every week:</p>
            </div>
            <PilotMeasures />
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
              Paper doesn&apos;t scale. Neither do group texts.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              Every shift, your teams write things down — room numbers on clipboards, repairs on sticky notes, meal changes
              in a group chat. Then the information dies there. Nobody knows which rooms are actually ready. Repairs wait
              because nobody saw the note. The next shift starts blind.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center">
            <PainPoints />
          </Reveal>
        </section>

        {/* Features */}
        <section id="product" className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="max-w-2xl">
              <Eyebrow>Product</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
                One system for the whole building&apos;s day.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 120}>
                  <SpotlightCard className="h-full rounded-3xl border border-ink-200 bg-cream p-7 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-900/5">
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-800 text-cream transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-semibold text-forest-950">{title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-700">{body}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-20">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-semibold text-forest-950 sm:text-3xl">Try it yourself.</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink-700">
                    A manager website and a staff phone app, sharing one live system. Pick a team and tap through their day.
                  </p>
                </div>
                <span className="rounded-full bg-forest-100 px-4 py-2 text-sm font-semibold text-forest-800">Interactive demo</span>
              </div>
              <ProductTour />
            </Reveal>
          </div>
        </section>

        {/* How we work */}
        <section id="how">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="max-w-2xl">
              <Eyebrow>How we work</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
                We start where the work happens, not in a conference room.
              </h2>
            </Reveal>
            <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <span
                aria-hidden
                className="absolute left-8 right-8 top-14 hidden border-t-2 border-dashed border-forest-200 lg:block"
              />
              {STEPS.map(({ icon: Icon, title, body }, i) => (
                <li key={title} className="relative">
                  <Reveal delay={i * 140} className="h-full">
                    <div className="group relative h-full rounded-3xl border border-ink-200 bg-cream p-7 transition duration-300 hover:-translate-y-1 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-900/5">
                      <span className="font-serif text-5xl font-semibold text-forest-100 transition-colors duration-300 group-hover:text-rust-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon className="absolute right-7 top-8 h-6 w-6 text-forest-600 transition duration-300 group-hover:scale-125 group-hover:text-rust-500" />
                      <h3 className="mt-4 text-lg font-semibold text-forest-950">{title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-paper">
          <div className="mx-auto max-w-3xl px-5 py-24">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">Questions we hear a lot.</h2>
            </Reveal>
            <div className="mt-10 divide-y divide-ink-200 border-y border-ink-200">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-forest-950 [&::-webkit-details-marker]:hidden">
                    {q}
                    <Plus className="h-5 w-5 shrink-0 text-forest-600 transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-700">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>About Ophlow</Eyebrow>
            <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
              Small team, built on the floor.
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-ink-700">
            <p>
              Ophlow started inside an assisted living community, working shoulder-to-shoulder with its operations team.
              We&apos;re a small team of builders — we make software alongside the people who use it.
            </p>
            <p>
              Today that&apos;s senior living; the same approach fits hotels, restaurants, and anywhere the day runs on
              paper. We&apos;re looking for design partners who run buildings where the real work happens away from a desk.
            </p>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section id="demo" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-rust-500 px-8 py-16 text-center text-white sm:px-16">
              <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-float rounded-full bg-rust-400/60 blur-2xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 animate-float rounded-full bg-rust-700/50 blur-2xl [animation-delay:-3.5s]" />
              <div className="relative">
                <h2 className="text-3xl font-semibold sm:text-5xl">See your building&apos;s day, clearly.</h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg text-rust-50">
                  Book a 20-minute demo — we&apos;ll show you the pilot running live.
                </p>
                <a
                  href={SITE.demoUrl}
                  className="group mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-4 text-sm font-semibold text-forest-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <CalendarDays className="h-4 w-4 transition group-hover:-rotate-12" /> Book a demo
                </a>
                <p className="mx-auto mt-8 max-w-xl text-sm text-rust-50">
                  Pilot partners, investors, and future teammates: we&apos;d love to hear from you —{" "}
                  <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1 font-semibold text-white underline underline-offset-4">
                    <Mail className="h-3.5 w-3.5" />
                    {SITE.email}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-ink-200/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center">
          <Logo />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-sm text-ink-500">
              © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}
            </p>
            <Link href="/blog" className="text-sm font-medium text-forest-800 transition hover:text-rust-600">Blog</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
