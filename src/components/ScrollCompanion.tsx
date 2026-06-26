import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";

/**
 * A small mascot that rides along in the bottom-right corner. It stays hidden
 * at the very top (so it doesn't fight the hero), fades in once you scroll, and
 * scrolls you to the waitlist when clicked. Skips the float for reduced-motion.
 */
export default function ScrollCompanion() {
  const [shown, setShown] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Show the companion after the user scrolls past ~60% of the first screen.
  useMotionValueEvent(scrollY, "change", (y) => {
    setShown(y > window.innerHeight * 0.6);
  });

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          type="button"
          onClick={() =>
            document
              .getElementById("waitlist")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Jump to the waitlist"
          className="fixed right-5 bottom-5 z-40 rounded-full focus:ring-2 focus:ring-ring focus:outline-none"
          initial={{ opacity: 0, y: 30, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/img/brand/mascot-wave.webp"
            alt="B-BUCKETS goat mascot waving"
            className="w-20 select-none drop-shadow-xl sm:w-24"
            draggable={false}
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
