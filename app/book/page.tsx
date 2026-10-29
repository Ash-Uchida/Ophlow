import type { Metadata } from "next";
import { BackLink } from "@/components/back-link";
import { BookingWidget } from "@/components/booking-widget";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AVAILABILITY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Book a call — ${SITE.name}`,
  description: `Pick a ${AVAILABILITY.slotMinutes}-minute slot with the ${SITE.name} team. Times show in your time zone.`,
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-forest-100/60 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-12">
          <BackLink className="mb-8 text-sm text-ink-600 hover:text-forest-800" />
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-rust-600">Book a call</p>
            <h1 className="text-4xl font-semibold leading-tight text-forest-950 sm:text-5xl">Tell us about your place.</h1>
            <p className="mt-4 text-lg text-ink-700">Times are shown in your time zone — change it any time.</p>
          </div>
          <BookingWidget />
        </div>
      </main>
      <Footer />
    </>
  );
}
