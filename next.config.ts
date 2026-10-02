import type { NextConfig } from "next";

/** Plain HTML in `out/`, so the site can be hosted anywhere (Vercel, Netlify, GitHub Pages, S3). */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
};

export default nextConfig;
