import Link from "next/link";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-200/70">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center">
        <Logo />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <p className="text-ink-500">
            © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}
          </p>
          <Link href="/book" className="font-medium text-forest-800 transition hover:text-rust-600">
            Book a demo
          </Link>
          <Link href="/workspace" className="font-medium text-forest-800 transition hover:text-rust-600">
            Get started
          </Link>
          <Link href="/blog" className="font-medium text-forest-800 transition hover:text-rust-600">
            Blog
          </Link>
          <Link href="/privacy" className="font-medium text-forest-800 transition hover:text-rust-600">
            Privacy
          </Link>
          <Link href="/terms" className="font-medium text-forest-800 transition hover:text-rust-600">
            Terms
          </Link>
          <a href={`mailto:${SITE.email}`} className="font-medium text-forest-800 transition hover:text-rust-600">
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
