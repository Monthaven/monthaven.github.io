"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { trackEvent } from "@/lib/analytics";

type StepBoxProps = {
  step: number;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  analyticsStep?: number;
};

export default function StepBox({ step, title, description, className, children, analyticsStep }: StepBoxProps) {
  const handleActivate = () => {
    if (typeof analyticsStep === "number") {
      trackEvent({ type: "how_step_clicked", payload: { step: analyticsStep } });
    }
  };

  return (
    <section
      className={clsx(
        "rounded-2xl bg-white border border-[var(--mh-sage)] shadow-[var(--mh-shadow-soft)] p-6 flex flex-col gap-3 transition hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      role={analyticsStep ? "button" : undefined}
      tabIndex={analyticsStep ? 0 : undefined}
      onClick={analyticsStep ? handleActivate : undefined}
      onKeyDown={
        analyticsStep
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleActivate();
              }
            }
          : undefined
      }
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--mh-accent)] text-[var(--mh-cream)] font-semibold">
          {step}
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--mh-accent)]">Step {step}</p>
          <h3 className="text-lg font-semibold text-[var(--mh-charcoal-900)]">{title}</h3>
        </div>
      </div>
      {description && <p className="text-sm text-[var(--mh-charcoal)]">{description}</p>}
      {children && <div className="text-sm text-[var(--mh-charcoal)]">{children}</div>}
    </section>
  );
}
