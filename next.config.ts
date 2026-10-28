import type { NextConfig } from "next";

/** Hosted on Vercel: the booking and setup routes in `app/api` need a server. */
const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;
