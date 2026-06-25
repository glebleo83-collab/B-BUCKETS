// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// NOTE: We deploy a fully *static* site for now — every visitor sees the same
// HTML, so Cloudflare can cache it and serve it instantly. When we build the
// email waitlist (which runs server code on each request), we'll switch this
// to server output and turn on the Cloudflare adapter that's already installed:
//
//   import cloudflare from "@astrojs/cloudflare";
//   output: "server",
//   adapter: cloudflare(),

// https://astro.build/config
export default defineConfig({
  site: "https://b-buckets.com",
  output: "static",
  integrations: [react()],
  vite: {
    // Tailwind 4 plugs into the build through Vite (no tailwind.config.js needed).
    plugins: [tailwindcss()],
  },
});
