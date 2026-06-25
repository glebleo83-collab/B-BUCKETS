import { motion } from "motion/react";

/**
 * A React "island" — Astro renders the page as static HTML, and only this small
 * piece becomes interactive JavaScript in the browser. We use Motion here just
 * to fade/slide the wordmark in, which also proves the React + Motion pipeline
 * works. Brand copy is intentionally minimal until the real reveal.
 */
export default function ComingSoon() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-semibold tracking-[0.2em] sm:text-6xl"
      >
        B-BUCKETS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        className="text-sm tracking-[0.35em] text-muted-foreground uppercase"
      >
        Coming Soon
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
        className="h-px w-24 origin-center bg-foreground/30"
      />
    </main>
  );
}
