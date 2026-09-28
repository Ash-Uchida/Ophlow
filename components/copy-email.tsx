"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  }

  return (
    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
      <a
        href={`mailto:${SITE.email}`}
        className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-4 text-sm font-semibold text-forest-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-white"
      >
        <Mail className="h-4 w-4 transition group-hover:-rotate-12" /> {SITE.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        {copied ? <Check className="h-4 w-4 animate-pop" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy email"}
      </button>
    </div>
  );
}
