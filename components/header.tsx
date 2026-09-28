"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-cream/80 backdrop-blur-md transition-shadow ${
        progress > 0.005 ? "border-ink-200 shadow-[0_8px_30px_-12px_rgba(26,50,33,0.25)]" : "border-transparent"
      }`}
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-0.5 origin-left bg-gradient-to-r from-forest-500 to-rust-400"
        style={{ width: "100%", transform: `scaleX(${progress})` }}
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" aria-label="Ophlow home">
          <Logo />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-ink-700 transition hover:text-forest-800"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-rust-400 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href={`mailto:${SITE.email}`}
            className="rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-forest-900 hover:shadow-lg hover:shadow-forest-900/20"
          >
            Talk to us
          </a>
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-forest-900 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <nav aria-label="Mobile" className="border-t border-ink-200 bg-cream px-5 pb-5 pt-2 md:hidden">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-ink-200/70 py-3 text-base font-medium text-ink-800"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 block rounded-full bg-forest-800 px-4 py-3 text-center text-sm font-semibold text-cream"
          >
            Talk to us
          </a>
        </nav>
      ) : null}
    </header>
  );
}
