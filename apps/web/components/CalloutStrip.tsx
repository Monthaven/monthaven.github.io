import { ReactNode } from "react";

export default function CalloutStrip({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--mh-sage)] bg-[var(--mh-cream100)] p-4 text-sm text-[var(--mh-charcoal)]">
      {children}
    </div>
  );
}
