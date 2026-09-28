import type { NextConfig } from "next";

/** Plain HTML in `out/`, so the site can be hosted anywhere (Vercel, Netlify, GitHub Pages, S3). */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
