import type { NextConfig } from "next";

// Node < 18.17 / < 19.9 (this machine runs 19.8.1) lacks URL.canParse, which
// Next 15 calls internally. Polyfill it in the compiler process.
const U = URL as unknown as {
  canParse?: (url: string, base?: string) => boolean;
};
if (typeof U.canParse !== "function") {
  U.canParse = (url: string, base?: string) => {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile exists in $HOME).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
