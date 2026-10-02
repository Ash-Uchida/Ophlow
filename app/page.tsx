import {
  ArrowRight,
  BarChart3,
  BedDouble,
  Building2,
  ClipboardList,
  Factory,
  Footprints,
  Hotel,
  Ruler,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Timer,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BeforeAfter } from "@/components/before-after";
import { CopyEmail } from "@/components/copy-email";
import { Header } from "@/components/header";
import { LiveMock } from "@/components/live-mock";
import { Logo } from "@/components/logo";
import { Marquee } from "@/components/marquee";
import { ProductTour } from "@/components/product-tour";
import { Reveal } from "@/components/reveal";
import { RotatingWord } from "@/components/rotating-word";
import { SpotlightCard } from "@/components/spotlight-card";
import { SITE } from "@/lib/site";

const PILLARS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ClipboardList,
    title: "Replace the paper",
    body: "Every check-in, clean, order and repair gets a timestamp instead of a scribble. Nothing gets lost between shifts.",
  },
  {
    icon: Smartphone,
    title: "Built for people on their feet",
    body: "Big, simple screens on the phone staff already carry. Each person sees only the screens for their job.",
  },
  {
    icon: BarChart3,
    title: "Show where the time goes",
    body: "Every step is measured, so managers can see the one bottleneck worth fixing this week instead of guessing.",
  },
];

const MEASURES = [
  "Checkout to room ready",
  "Minutes per clean against the target",
  "Meal order to tray delivered",
  "Repair request to fixed",
];

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Footprints,
    title: "We shadow the floor",
    body: "We spend time with the people doing the work and map every clipboard, whiteboard and group text.",
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
    body: "Every step is timed, so improvements are proven with data rather than assumed.",
  },
];

const MARKETS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: BedDouble,
    title: "Senior living",
    body: "Coordinate housekeeping, dining, maintenance and activities across shifts.",
  },
  {
    icon: Hotel,
    title: "Hotels",
    body: "Coordinate room turnovers, housekeeping, maintenance and guest requests across shifts.",
  },
  {
    icon: ClipboardList,
    title: "Restaurants",
    body: "Keep opening and closing checklists, prep, cleaning and maintenance tasks organized.",
  },
  {
    icon: Building2,
    title: "Property management",
    body: "Move-ins, move-outs, unit turns and work orders across many buildings.",
  },
  {
    icon: Stethoscope,
    title: "Clinics & outpatient care",
    body: "Room readiness, supplies and front-of-house flow, without touching patient records.",
  },
  {
    icon: Factory,
    title: "Facilities & light industry",
    body: "Checklists, inspections and repair requests for crews who never sit at a desk.",
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
          <div className="relative mx-auto grid max-w-6xl items-center gap-20 px-5 pb-28 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-36 lg:pt-24">
            <div className="animate-rise">
              <Eyebrow>Day-to-day operations software</Eyebrow>
              <h1 className="text-4xl font-semibold leading-[1.1] text-forest-950 sm:text-5xl lg:text-6xl">
                We turn <RotatingWord /> into software teams actually use.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
                Ophlow helps companies organize the everyday work that keeps things running. Teams use one simple system
                to manage checklists, handoffs, requests and tasks, whether they work in a hotel, restaurant, assisted
                living community or somewhere else entirely.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#product"
                  className="group inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-forest-900/20 transition hover:-translate-y-0.5 hover:bg-forest-900 hover:shadow-xl"
                >
                  See it in action <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-paper px-6 py-3.5 text-sm font-semibold text-forest-900 transition hover:-translate-y-0.5 hover:border-forest-400"
                >
                  Talk to us
                </a>
              </div>
              <p className="mt-8 flex items-center gap-2 text-sm text-ink-600">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-400 opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest-500" />
                </span>
                Now in a live pilot with an assisted living community.
              </p>
            </div>
            <div className="animate-rise [animation-delay:150ms]">
              <LiveMock />
            </div>
          </div>
        </section>

        <Marquee />

        {/* What we do */}
        <section id="what" className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="max-w-2xl">
              <Eyebrow>What we do</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
                A lot of important work still runs on paper. We fix that, one team at a time.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {PILLARS.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 120}>
                  <div className="group h-full rounded-3xl border border-ink-200 bg-cream p-7 transition duration-300 hover:-translate-y-1 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-900/5">
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-800 text-cream transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-semibold text-forest-950">{title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-700">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-20">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-forest-950 sm:text-3xl">Same day, two ways.</h3>
              </div>
              <BeforeAfter />
            </Reveal>
          </div>
        </section>

        {/* Product */}
        <section id="product" className="overflow-hidden border-y border-ink-200/70 px-5 py-24">
          <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Quick interactive demo</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">Explore Ophlow for Senior Living</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-700">
                A manager website and a staff phone app sharing one live system. We built it side by side with an assisted
                living operations team, around the work they do every single day.
              </p>
            </div>
            <span className="rounded-full bg-forest-100 px-4 py-2 text-sm font-semibold text-forest-800">
              Try the demo below
            </span>
          </Reveal>

          <Reveal className="mt-14">
            <ProductTour />
          </Reveal>

          <Reveal className="mt-16 grid gap-5 lg:grid-cols-2">
            <div className="flex gap-5 rounded-3xl bg-forest-900 p-7 text-cream">
              <ShieldCheck className="h-8 w-8 shrink-0 text-rust-200" />
              <div>
                <h3 className="text-xl font-semibold">Private by design</h3>
                <p className="mt-2 leading-relaxed text-forest-100">
                  Ophlow works with room numbers only. Resident names and health information never go into the system,
                  and each person sees only the screens for their job.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-ink-200 bg-paper p-7">
              <h3 className="text-xl font-semibold text-forest-950">What we measure in the pilot</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {MEASURES.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                    <Timer className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          </div>
        </section>

        {/* How we work */}
        <section id="how" className="bg-paper">
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

        {/* Where we're going */}
        <section id="next" className="bg-forest-950 text-cream">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="max-w-3xl">
              <Eyebrow light>Where we&apos;re going</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
                One approach for the day-to-day work in any company.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-forest-100">
                Hotels, restaurants, assisted living communities and many other companies share the same challenge: daily
                work is spread across paper, messages and shift handoffs. Ophlow brings those tasks into one clear system,
                shaped around how each team works.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MARKETS.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 90} className="h-full">
                  <SpotlightCard
                    className="h-full rounded-3xl bg-forest-900/70 p-6 ring-1 ring-forest-700"
                  >
                    <Icon className="h-7 w-7 text-forest-300" />
                    <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-200">{body}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>About Ophlow</Eyebrow>
            <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
              Small, hands-on, and just getting started.
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-ink-700">
            <p>
              Ophlow started inside an assisted living community, where we worked with its operations team to bring paper,
              whiteboards and phone calls into one live system. That first product was built for senior living, while the
              underlying approach applies to day-to-day operations in many kinds of companies.
            </p>
            <p>
              We&apos;re a small team that builds software alongside the people who use it, and we&apos;re growing. We&apos;re
              looking for design partners in every industry where the real work happens away from a desk.
            </p>
          </Reveal>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-5 pb-24">
          <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-rust-500 px-8 py-16 text-center text-white sm:px-16">
            <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-float rounded-full bg-rust-400/60 blur-2xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 animate-float rounded-full bg-rust-700/50 blur-2xl [animation-delay:-3.5s]" />
            <div className="relative">
              <h2 className="text-3xl font-semibold sm:text-5xl">Does your team still run on clipboards?</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-rust-50">
                Pilot partners, investors and future teammates: we&apos;d love to hear from you.
              </p>
              <CopyEmail />
            </div>
          </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-ink-200/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center">
          <Logo />
          <p className="text-sm text-ink-500">
            © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}
          </p>
        </div>
      </footer>
    </>
  );
}
