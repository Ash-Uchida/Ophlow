import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Caveat, Inter, Source_Serif_4 } from "next/font/google";
import { NavTracker } from "@/components/back-link";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-serif-display", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

/** Absolute links for share previews: Vercel's production domain (e.g. ophlow.com once DNS points there). */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${serif.variable} ${hand.variable} antialiased`}>
      <body className="bg-cream text-ink-800">
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <NavTracker />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
