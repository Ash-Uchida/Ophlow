"use client";

import { useEffect, useState } from "react";

const WORDS = ["clipboards", "whiteboards", "group texts", "sticky notes", "paper logs"];

export function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((n) => (n + 1) % WORDS.length), 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-grid text-rust-500">
      <span className="sr-only">clipboards, whiteboards and group texts</span>
      {WORDS.map((word, n) => (
        <span
          key={word}
          aria-hidden
          className={`relative col-start-1 row-start-1 justify-self-start whitespace-nowrap ${
            n === index ? "animate-word-in" : "invisible"
          }`}
        >
          {word}
          <svg
            viewBox="0 0 300 12"
            preserveAspectRatio="none"
            className="absolute -bottom-1 left-0 h-3 w-full text-rust-400/70"
          >
            <path d="M2 8c40-6 80-6 120 0s80 6 120 0 40-4 56-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </span>
  );
}
