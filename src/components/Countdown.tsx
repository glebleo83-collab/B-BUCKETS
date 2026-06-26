import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Live countdown to the drop. `target` is an ISO date string. We compute the
 * remaining time only AFTER mount (not during server render) so the server and
 * browser HTML always match — otherwise React warns about a hydration mismatch.
 */
type Props = { target: string };

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(target: string): Remaining | null {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ target }: Props) {
  // `undefined` = not mounted yet, `null` = the drop time has passed.
  const [time, setTime] = useState<Remaining | null | undefined>(undefined);

  useEffect(() => {
    setTime(getRemaining(target));
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (time === null) {
    return (
      <p className="text-fire fire-text-glow text-5xl font-extrabold tracking-tight sm:text-7xl">
        IT&rsquo;S LIVE
      </p>
    );
  }

  const units: [string, number | undefined][] = [
    ["Days", time?.days],
    ["Hours", time?.hours],
    ["Minutes", time?.minutes],
    ["Seconds", time?.seconds],
  ];

  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-5">
      {units.map(([label, value], i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="flex min-w-[70px] flex-col items-center rounded-2xl border border-border bg-card/60 px-3 py-4 backdrop-blur-sm sm:min-w-[96px] sm:px-5 sm:py-6"
        >
          <span className="text-fire text-4xl font-extrabold tabular-nums sm:text-6xl">
            {value === undefined ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] font-medium tracking-[0.25em] text-muted-foreground uppercase sm:text-xs">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
