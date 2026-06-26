import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Simple, good-enough email check. The real validation also happens on the
// server later; this just catches obvious typos before we bother sending.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setStatus("loading");

    try {
      // TODO(waitlist backend): POST to the Cloudflare Worker at /api/waitlist
      // once the D1 database is set up. For now we save locally so the whole
      // experience works end-to-end and no emails are lost during testing.
      await new Promise((r) => setTimeout(r, 700));
      const saved: string[] = JSON.parse(
        localStorage.getItem("bb_waitlist") ?? "[]",
      );
      if (!saved.includes(email)) saved.push(email);
      localStorage.setItem("bb_waitlist", JSON.stringify(saved));
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          // ---- Success: the goat celebrates ----
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <motion.img
              src="/img/brand/mascot-celebrate.webp"
              alt="The B-BUCKETS goat mascot celebrating"
              className="w-44 select-none sm:w-52"
              draggable={false}
              initial={{ rotate: -6 }}
              animate={reduce ? { rotate: 0 } : { rotate: [-6, 6, -6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <h3 className="mt-2 text-2xl font-bold tracking-tight">
              You&rsquo;re in.
            </h3>
            <p className="mt-2 text-muted-foreground">
              We&rsquo;ll email you the moment B-BUCKETS drops.
            </p>
            <p className="mt-4 text-sm font-semibold tracking-[0.25em] uppercase">
              Get buckets.
            </p>
          </motion.div>
        ) : (
          // ---- The form ----
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            noValidate
            className="w-full"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "email-error" : undefined}
                className="h-12 flex-1 rounded-full border border-input bg-background px-5 text-base outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 rounded-full bg-foreground px-7 text-sm font-semibold tracking-wide text-background transition hover:opacity-90 disabled:opacity-60"
              >
                {status === "loading" ? "Joining…" : "I want in"}
              </button>
            </div>

            <div className="mt-3 h-5 px-1 text-sm">
              {error ? (
                <p id="email-error" className="text-destructive" role="alert">
                  {error}
                </p>
              ) : (
                <p className="text-muted-foreground">
                  No spam — just one email when we drop.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
