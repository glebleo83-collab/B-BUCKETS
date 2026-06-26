import { motion, useReducedMotion } from "motion/react";

// The headline is split into words so each one can animate in on its own.
const HEADLINE = ["BUCKETS", "INCOMING"];

// A shared easing curve (a smooth "ease-out-expo") so all hero motion feels
// like one family. [x1,y1,x2,y2] is a cubic-bezier curve.
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  // When the visitor asks their OS for less motion, skip the endless float.
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-20 sm:px-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        {/* ---- Left: the words ---- */}
        <div className="order-2 md:order-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 text-xs font-medium tracking-[0.4em] text-muted-foreground uppercase"
          >
            Coming soon
          </motion.p>

          <h1 className="text-6xl leading-[0.88] font-bold tracking-tight sm:text-7xl lg:text-8xl">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={word}
                className="block"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg"
          >
            Greatest of all time. Drop one is almost here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
            className="mt-9"
          >
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold tracking-wide text-background transition hover:opacity-90"
            >
              I want in
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>

        {/* ---- Right: the mascot ---- */}
        <motion.div
          className="order-1 flex justify-center md:order-2"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* The outer div fades/scales in once; the inner img floats forever. */}
          <motion.img
            src="/img/brand/mascot-hero.webp"
            alt="The B-BUCKETS goat mascot — the G.O.A.T. — in sunglasses, wearing a BB monogram tee and chunky sneakers"
            className="w-[260px] select-none drop-shadow-2xl sm:w-[340px] lg:w-[440px]"
            draggable={false}
            animate={reduce ? undefined : { y: [0, -16, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
