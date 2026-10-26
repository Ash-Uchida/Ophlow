"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PREV_KEY = "ophlow-prev-path";
const CURRENT_KEY = "ophlow-current-path";
const RESTORE_KEY = "ophlow-restore";
const scrollKey = (path: string) => `ophlow-scroll:${path}`;

/**
 * Lives in the layout. Remembers the page before this one (so a back link knows the visitor came from our site)
 * and where each page was scrolled to when a link on it was clicked, so going back lands on that exact spot.
 */
export function NavTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const remember = (e: MouseEvent) => {
      if (!(e.target as Element).closest?.("a")) return;
      try {
        sessionStorage.setItem(scrollKey(location.pathname), String(Math.round(scrollY)));
      } catch {
        // Not remembering is fine.
      }
    };
    document.addEventListener("click", remember, true);
    return () => document.removeEventListener("click", remember, true);
  }, []);

  useEffect(() => {
    try {
      const current = sessionStorage.getItem(CURRENT_KEY);
      if (current !== pathname) {
        if (current) sessionStorage.setItem(PREV_KEY, current);
        sessionStorage.setItem(CURRENT_KEY, pathname);
      }
      if (sessionStorage.getItem(RESTORE_KEY) !== pathname) return;
      sessionStorage.removeItem(RESTORE_KEY);
      const y = Number(sessionStorage.getItem(scrollKey(pathname)) ?? 0);
      // Twice: once as soon as the page is in, once after the browser's own restore has had its go.
      const jump = () => window.scrollTo({ top: y, behavior: "instant" });
      requestAnimationFrame(jump);
      const later = setTimeout(jump, 120);
      return () => clearTimeout(later);
    } catch {
      // Blocked storage: back links fall back to the home page.
    }
  }, [pathname]);
  return null;
}

const cameFromSite = () => {
  try {
    return Boolean(sessionStorage.getItem(PREV_KEY));
  } catch {
    return false;
  }
};

/**
 * Goes back the way the browser's back button does, so the page reopens where the visitor was scrolled to.
 * Someone who landed here directly (a shared link) goes to the home page instead.
 */
export function BackLink({ label = "Back", className = "", iconClassName = "h-4 w-4" }: { label?: string; className?: string; iconClassName?: string }) {
  const router = useRouter();
  return (
    <Link
      href="/"
      onClick={(e) => {
        if (!cameFromSite() || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        try {
          sessionStorage.setItem(RESTORE_KEY, sessionStorage.getItem(PREV_KEY) ?? "/");
        } catch {
          // Then the browser's own scroll restore is all we get.
        }
        router.back();
      }}
      className={`inline-flex items-center gap-1.5 font-semibold transition ${className}`}
    >
      <ArrowLeft className={iconClassName} /> {label}
    </Link>
  );
}
