import {
  CalendarSync,
  Camera,
  Clock,
  House,
  Languages,
  Mail,
  MessageCircle,
  Plus,
  Receipt,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Ctas } from "@/components/ctas";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { TurnoverMock } from "@/components/turnover-mock";
import { SITE } from "@/lib/site";

// The assisted-living version of this page is kept in app/_assisted-living/home.tsx.

const NUMBERS: { value: string; label: string }[] = [
  { value: "25–30%", label: "of gross rent is what a management company usually takes" },
  { value: "5 hours", label: "between a 10 a.m. checkout and a 3 p.m. check-in" },
  { value: "2 a.m.", label: "is when the smoke detector battery always dies" },
];

const PAINS = [
  "Stays run from 3 nights to 2 weeks, so you don't know when you'll need a cleaner until the booking comes in.",
  "Your cleaner stops answering, and you're back on the Facebook group asking who's free on Saturday.",
  "A guest says the place wasn't ready. Now your rating drops and you sink in the search results.",
  "A door won't lock, two hours from where you live. You drive up for ten seconds of work.",
];

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: CalendarSync,
    title: "Paste your calendar link",
    body: "Airbnb and VRBO both have an Export calendar link. Paste it once and we see every booking's check-in and checkout.",
  },
  {
    icon: Clock,
    title: "We send a cleaner after every checkout",
    body: "Each checkout becomes a turnover clean for the window before the next guest. Someone on our local team takes it.",
  },
  {
    icon: Camera,
    title: "Photos prove it's ready",
    body: "Your checklist, your instructions, and proof photos of every room before the next guest walks in.",
  },
  {
    icon: Wrench,
    title: "Repairs, handled",
    body: "Cleaners report anything broken with a photo. We send a handyman. Under your limit it just gets fixed; over it, you decide.",
  },
];

const DASHBOARD: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: House, title: "Was it cleaned?", body: "Each turnover with who did it, when, and the photos." },
  { icon: Wrench, title: "What broke?", body: "Every repair, what it cost, and whether it's fixed." },
  { icon: CalendarSync, title: "Who's next?", body: "Your next guests in and out, straight from your calendar." },
  { icon: Receipt, title: "What did it cost?", body: "One monthly statement: cleans, repairs, and our share." },
];

const FAQS = [
  {
    q: "Do I have to leave Airbnb or VRBO?",
    a: "No. You keep your listing exactly as it is. You paste your calendar link so we know when guests come and go. If you want us to answer guest messages too, you add Ophlow as a co-host, which is a normal Airbnb feature.",
  },
  {
    q: "Who are the cleaners?",
    a: "A local team of on-call cleaners and handymen we work with. Every clean follows your checklist and ends with proof photos, and the app works in English and Spanish.",
  },
  {
    q: "What happens when something breaks?",
    a: "The cleaner reports it with a photo and we send someone to fix it. You set a limit, like $200: anything under it just gets done and shows on your monthly statement. Anything over it waits for your OK.",
  },
  {
    q: "What does it cost?",
    a: "A share of the rent your place makes each month, well under what a management company takes. We're setting the exact number with our first owners, so book a call and we'll work it out for your place.",
  },
  {
    q: "Where do you work?",
    a: "We're starting around Island Park and Yellowstone. If your place is somewhere else, tell us anyway.",
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
          <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:pb-32 lg:pt-24">
            <div className="mx-auto max-w-3xl animate-rise text-center lg:mx-0 lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-paper px-4 py-1.5 text-sm font-medium text-forest-800">
                <House className="h-4 w-4" aria-hidden />
                For Airbnb and VRBO owners
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] text-forest-950 sm:text-5xl lg:text-6xl">
                Cleaned and fixed between every guest.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-700 lg:mx-0">
                Ophlow is the management company for owners with one cabin or a few. We send a cleaner after every
                checkout and a handyman when something breaks. You see the photos and the costs, and keep most of your rent.
              </p>
              <div className="mt-9">
                <Ctas center className="lg:justify-start" />
              </div>
            </div>
            <div className="mx-auto w-full max-w-xl animate-rise [animation-delay:150ms]">
              <TurnoverMock />
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section aria-label="Why owners call us" className="border-y border-ink-200/70 bg-forest-950 text-cream">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
            {NUMBERS.map(({ value, label }) => (
              <div key={value}>
                <p className="font-serif text-4xl font-semibold text-rust-200">{value}</p>
                <p className="mt-2 text-sm leading-relaxed text-forest-100">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
              Management companies want owners with twenty places. You have one.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              So you run it yourself: finding cleaners, chasing repairs, answering texts. It works, until it doesn&apos;t.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center">
            <ul className="space-y-3">
              {PAINS.map((pain) => (
                <li key={pain} className="rounded-2xl border border-ink-200 bg-paper px-5 py-4 leading-relaxed text-ink-700">
                  {pain}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* How it works */}
        <section id="how" className="overflow-x-clip bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="max-w-2xl">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
                You list it. We turn it over.
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

        {/* What you see */}
        <section id="dashboard">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="max-w-2xl">
              <Eyebrow>What you see</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
                One simple page for your place. Nothing to set up.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-700">
                No software to learn. Open it from your phone and you know where things stand.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DASHBOARD.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 100}>
                  <SpotlightCard className="h-full rounded-3xl border border-ink-200 bg-paper p-7 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-900/5">
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-800 text-cream transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-semibold text-forest-950">{title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-700">{body}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10">
              <div className="grid gap-4 rounded-3xl border border-ink-200 bg-cream p-6 sm:grid-cols-3">
                <p className="flex items-start gap-3 text-ink-700">
                  <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-forest-600" aria-hidden />
                  Guest messages answered, with a real person when it matters.
                </p>
                <p className="flex items-start gap-3 text-ink-700">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-forest-600" aria-hidden />
                  You set the repair limit. Nothing big gets spent without your OK.
                </p>
                <p className="flex items-start gap-3 text-ink-700">
                  <Languages className="mt-1 h-5 w-5 shrink-0 text-forest-600" aria-hidden />
                  Cleaners use the app in English or Spanish.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-paper">
          <div className="mx-auto max-w-3xl px-5 py-24">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">Questions owners ask.</h2>
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
            <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">A small team in eastern Idaho.</h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-ink-700">
            <p>
              We build the software we run on: the cleaner&apos;s checklist, the repair queue, the owner&apos;s page. Then we run
              it ourselves, so you get a management company without the management-company cut.
            </p>
            <p>We&apos;re looking for our first owners. If you rent out a place you don&apos;t live in, we&apos;d love to talk.</p>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section id="demo" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-rust-500 px-8 py-16 text-center text-white sm:px-16">
              <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-float rounded-full bg-rust-400/60 blur-2xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 animate-float rounded-full bg-rust-700/50 blur-2xl [animation-delay:-3.5s]" />
              <div className="relative">
                <h2 className="text-3xl font-semibold sm:text-5xl">Stop driving up to unlock the door.</h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg text-rust-50">
                  Book a 20-minute call. Tell us about your place, and we&apos;ll tell you how we&apos;d run it.
                </p>
                <div className="mt-9">
                  <Ctas center light />
                </div>
                <p className="mx-auto mt-8 max-w-xl text-sm text-rust-50">
                  Cleaners and handymen who want steady work: we&apos;d love to hear from you too —{" "}
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

      <Footer />
    </>
  );
}
