import {
  CalendarSync,
  Camera,
  House,
  LayoutDashboard,
  Mail,
  MessageCircle,
  PackageCheck,
  Plus,
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

// Wording follows the "Ophlow Cabin Care: Owner Offer" (Oct 29). The assisted-living version of this page is kept in
// app/_assisted-living/home.tsx.

const NUMBERS: { value: string; label: string }[] = [
  { value: "10%", label: "of your payout is our whole fee. Local full-service managers typically charge 25 to 30%." },
  { value: "1 hour", label: "for guests to hear back, from 7 AM to 10 PM. Emergencies any time." },
  { value: "$200", label: "Anything over it needs your OK first. Every cost is on your monthly summary." },
];

const PAINS = [
  "Stays run from 3 nights to 2 weeks, so you don't know when you'll need a cleaner until the booking comes in.",
  "Your cleaner stops answering, and you're back on the Facebook group asking who's free on Saturday.",
  "A guest says the place wasn't ready. Now your rating drops and you sink in the search results.",
  "A door won't lock, two hours from where you live. You drive up for ten seconds of work.",
];

const HANDLE: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MessageCircle,
    title: "Guest messages",
    body: "We answer guests inside Airbnb as your co-host, from 7 AM to 10 PM, with a phone line for emergencies.",
  },
  {
    icon: CalendarSync,
    title: "Cleaning between guests",
    body: "We schedule a local cleaner around every checkout and check-in, including back-to-back summer weekends.",
  },
  {
    icon: Camera,
    title: "Photo checks",
    body: "After every clean you get photos and a finished checklist, so you can see the cabin is ready.",
  },
  {
    icon: Wrench,
    title: "Repairs",
    body: "Cleaners report anything broken with photos, and we send a trusted local pro such as Ace Handyman Services.",
  },
  {
    icon: PackageCheck,
    title: "Restocking",
    body: "We keep basics like paper goods and soap topped up and pass the cost through at what we paid.",
  },
  {
    icon: LayoutDashboard,
    title: "Your dashboard",
    body: "One screen shows whether the cabin is clean, any open issues, who checks in next, and this month's costs.",
  },
];

const PRICING: { cost: string; how: string }[] = [
  { cost: "Our fee", how: "10% of your payout, billed monthly." },
  { cost: "Cleaning", how: "Paid per clean, straight to the cleaner. Usually covered by the cleaning fee guests pay." },
  { cost: "Repairs", how: "The pro's price with no markup from us. Anything over $200 needs your OK first." },
  { cost: "Supplies", how: "What we paid, shown on your monthly summary." },
];

const STEPS: { title: string; body: string }[] = [
  { title: "A 15-minute call", body: "About your cabin and how you run it today." },
  { title: "A walk-through", body: "We walk the cabin with you, make its cleaning checklist and note what repairs it tends to need." },
  { title: "Co-host and calendar", body: "You add us as a co-host on Airbnb and share your calendar link." },
  { title: "Your next guest", body: "We handle your next guest from checkout to check-in, and you watch it on your dashboard." },
];

const PROMISES: { title: string; body: string }[] = [
  { title: "Fast replies", body: "Guests hear back within an hour from 7 AM to 10 PM, and emergencies are handled any time." },
  { title: "Proof, not promises", body: "Photos after every clean and every repair." },
  { title: "Re-clean guarantee", body: "If a guest reports a problem with the cleaning, we fix it the same day." },
  { title: "No long-term contract", body: "Cancel with 30 days' notice. Bookings already made are still covered." },
  { title: "No surprises", body: "You approve anything over $200, and every cost shows on your monthly summary." },
];

const FAQS = [
  {
    q: "Do I have to give up my listing?",
    a: "No. You stay the host. Your listing, photos, nightly prices, calendar and house rules stay yours, and you can use your cabin whenever it's open. We work alongside you as a co-host, not instead of you.",
  },
  {
    q: "What's a payout?",
    a: "The money that reaches you after Airbnb's fees and taxes. Our fee is 10% of that, billed monthly.",
  },
  {
    q: "Who are the cleaners?",
    a: "Local cleaners we schedule around every checkout. Every clean follows your cabin's checklist and ends with photos. You pay them per clean, and that's usually covered by the cleaning fee your guests pay.",
  },
  {
    q: "What happens when something breaks?",
    a: "The cleaner reports it with photos and we send a trusted local pro. You pay the pro's price with no markup from us. Anything over $200 waits for your OK.",
  },
  {
    q: "Where do you work?",
    a: "We're starting with cabins around Island Park.",
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
                Ophlow Cabin Care · Island Park
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] text-forest-950 sm:text-5xl lg:text-6xl">
                Your cabin, handled.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-700 lg:mx-0">
                We run your cabin day to day: guest messages, cleaning between guests, photo checks and repairs. You keep
                your listing and your prices, and you only hear from us for big decisions. It costs 10% of your payout.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-500 lg:mx-0">
                Built for owners who rent out their own cabin and don&apos;t want to hand everything to a full-service manager.
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
        <section aria-label="The short version" className="border-y border-ink-200/70 bg-forest-950 text-cream">
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
              Full-service managers take a quarter of your rent. Doing it yourself takes your weekends.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              So most owners run it themselves: finding cleaners, chasing repairs, answering texts. It works, until it
              doesn&apos;t.
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

        {/* What we handle */}
        <section id="how" className="overflow-x-clip bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="max-w-2xl">
              <Eyebrow>What we handle</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">
                Everything between one guest and the next.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {HANDLE.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={(i % 3) * 100}>
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
          </div>
        </section>

        {/* What you keep */}
        <section id="keep" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>What you keep</Eyebrow>
            <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">You stay the host.</h2>
          </Reveal>
          <Reveal delay={120} className="text-lg leading-relaxed text-ink-700">
            <p>
              Your listing, photos, nightly prices, calendar and house rules stay yours, and you can use your cabin
              whenever it&apos;s open. We work alongside you as a co-host, not instead of you.
            </p>
          </Reveal>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-paper">
          <div className="mx-auto max-w-4xl px-5 py-24">
            <Reveal className="max-w-2xl">
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">10% of your payout.</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-700">
                Your payout is the money that reaches you after Airbnb&apos;s fees and taxes. Local full-service managers
                typically charge 25 to 30%.
              </p>
            </Reveal>
            <Reveal className="mt-10">
              <table className="w-full overflow-hidden rounded-3xl border border-ink-200 bg-cream text-left">
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Cost</th>
                    <th scope="col">How it works</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-200">
                  {PRICING.map(({ cost, how }) => (
                    <tr key={cost}>
                      <th scope="row" className="w-32 px-6 py-5 align-top font-semibold text-forest-950 sm:w-40">
                        {cost}
                      </th>
                      <td className="px-6 py-5 leading-relaxed text-ink-700">{how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        {/* Getting started */}
        <section id="start">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="max-w-2xl">
              <Eyebrow>Getting started</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">Four steps to your next guest.</h2>
            </Reveal>
            <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <span
                aria-hidden
                className="absolute left-8 right-8 top-14 hidden border-t-2 border-dashed border-forest-200 lg:block"
              />
              {STEPS.map(({ title, body }, i) => (
                <li key={title} className="relative">
                  <Reveal delay={i * 140} className="h-full">
                    <div className="group relative h-full rounded-3xl border border-ink-200 bg-cream p-7 transition duration-300 hover:-translate-y-1 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-900/5">
                      <span className="font-serif text-5xl font-semibold text-forest-100 transition-colors duration-300 group-hover:text-rust-200">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-forest-950">{title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Promises */}
        <section id="promises" className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <Reveal className="max-w-2xl">
              <Eyebrow>Our promises</Eyebrow>
              <h2 className="text-3xl font-semibold leading-tight text-forest-950 sm:text-4xl">What you can hold us to.</h2>
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROMISES.map(({ title, body }) => (
                <li key={title} className="rounded-3xl border border-ink-200 bg-cream p-6">
                  <h3 className="text-lg font-semibold text-forest-950">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-700">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
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

        {/* Final CTA */}
        <section id="demo" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-rust-500 px-8 py-16 text-center text-white sm:px-16">
              <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-float rounded-full bg-rust-400/60 blur-2xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 animate-float rounded-full bg-rust-700/50 blur-2xl [animation-delay:-3.5s]" />
              <div className="relative">
                <h2 className="text-3xl font-semibold sm:text-5xl">Founding cabins, this winter.</h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg text-rust-50">
                  We&apos;re taking on a few founding cabins before the summer rush. Founding owners help shape the service
                  and lock in the 10% rate.
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
