import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// A handful of embers drifting up over the hero for extra fire energy.
const EMBERS = [
  { left: "12%", size: 6, dur: 7, delay: 0 },
  { left: "28%", size: 4, dur: 9, delay: 1.5 },
  { left: "44%", size: 8, dur: 6, delay: 0.8 },
  { left: "63%", size: 5, dur: 8, delay: 2.2 },
  { left: "78%", size: 7, dur: 7.5, delay: 1 },
  { left: "90%", size: 4, dur: 10, delay: 3 },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* ---- Background: video if present, the still as poster otherwise ---- */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        poster="/img/hero/hero-scene.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/img/hero/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark scrim so the headline stays readable over the flames. */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

      {/* Floating embers */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="animate-ember absolute bottom-24 rounded-full bg-primary"
              style={{
                left: e.left,
                width: e.size,
                height: e.size,
                animationDuration: `${e.dur}s`,
                animationDelay: `${e.delay}s`,
                boxShadow: "0 0 12px 2px var(--brand-red)",
              }}
            />
          ))}
        </div>
      )}

      {/* ---- Foreground content ---- */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-5 text-xs font-semibold tracking-[0.4em] text-primary uppercase"
        >
          The first drop is loading
        </motion.p>

        <h1 className="text-6xl leading-[0.85] font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            BUCKETS
          </motion.span>
          <motion.span
            className="text-fire fire-text-glow block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
          >
            INCOMING
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg"
        >
          Greatest of all time. Drop one is almost here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#drop"
            className="fire-glow group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-wide text-primary-foreground transition hover:brightness-110"
          >
            See the drop
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#goat"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold tracking-wide text-foreground transition hover:bg-secondary"
          >
            Meet the G.O.A.T.
          </a>
        </motion.div>
      </div>
    </section>
  );
}
