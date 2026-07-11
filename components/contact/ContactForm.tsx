"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const SUBJECTS = [
  { value: "general", label: "General question" },
  { value: "youth", label: "Camps and clinics" },
  { value: "tickets", label: "Tickets and memberships" },
  { value: "partnership", label: "Partnerships" },
  { value: "media", label: "Media" },
] as const;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  // Read ?subject= here rather than in the page: using searchParams in the page
  // would opt the whole route out of static rendering for one query param.
  const params = useSearchParams();
  const requested = params.get("subject") ?? "";
  const preset = SUBJECTS.some((s) => s.value === requested) ? requested : "general";

  const [subject, setSubject] = useState(preset);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!name.trim()) e.name = "Tell us who you are.";
    if (!email.trim()) e.email = "We need an address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "That address does not look right.";
    if (message.trim().length < 10) e.message = "A little more detail helps us route this.";
    return e;
  }

  function onSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Concept build: there is no inbox behind this form. Point `action` at a form
    // endpoint (Formspree, Web3Forms, a route handler) to make it live.
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="rounded-2xl border border-ice-blue/30 bg-ice-blue/[0.07] p-8 text-center"
        role="status"
      >
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ice-blue/15">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-ice-blue" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-2xl text-white">Message away</h3>
        <p className="mx-auto mt-2 max-w-[45ch] text-pretty text-sm leading-relaxed text-frost/70">
          Thanks, {name.split(" ")[0]}. We answer most messages within two working days.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setName("");
            setEmail("");
            setMessage("");
          }}
          className="mt-6 rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-frost/75 transition-colors hover:border-white/35 hover:text-white"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
      <fieldset className="mb-6">
        <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-frost/55">
          What is this about
        </legend>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSubject(s.value)}
              aria-pressed={subject === s.value}
              className={`rounded-full border px-4 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ice-blue ${
                subject === s.value
                  ? "border-ice-blue/50 bg-ice-blue/15 text-white"
                  : "border-white/12 text-frost/65 hover:border-white/30 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={inputCls(!!errors.email)}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="message" label="Message" error={errors.message}>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={!!errors.message}
            className={`${inputCls(!!errors.message)} resize-y`}
          />
        </Field>
      </div>

      <button
        onClick={onSubmit}
        className="mt-6 w-full rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ice-void transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98] sm:w-auto sm:px-10"
      >
        Send message
      </button>

      <p className="mt-4 font-mono text-[11px] text-frost/50">
        Concept build. This form validates but does not deliver.
      </p>
    </div>
  );
}

function inputCls(invalid: boolean) {
  return `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-frost/40 focus:border-ice-blue/60 focus-visible:ring-2 focus-visible:ring-ice-blue/40 ${
    invalid ? "border-goal-red-ink/60" : "border-white/12"
  }`;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-frost/60">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-goal-red-ink"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
