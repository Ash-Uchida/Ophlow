import type { Metadata } from "next";
import { BackLink } from "@/components/back-link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OwnerSignupForm } from "@/components/owner-signup-form";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Add your place — ${SITE.name}`,
  description: "Sign up for Ophlow Cabin Care in a few minutes. 10% of your payout, no charge until work is done.",
};

export default function StartPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-forest-100/60 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-12">
          <BackLink className="mb-8 text-sm text-ink-600 hover:text-forest-800" />
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-rust-600">Get started</p>
            <h1 className="text-4xl font-semibold leading-tight text-forest-950 sm:text-5xl">Add your place.</h1>
            <p className="mt-4 text-lg text-ink-700">A few details about you and your place. It takes about three minutes.</p>
          </div>
          <OwnerSignupForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
