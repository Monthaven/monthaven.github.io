import { ReactNode } from "react";

export default function Box({
  title,
  eyebrow,
  children,
}: {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white border border-[var(--mh-sage)] shadow-[var(--mh-shadow-soft)] p-6">
      {eyebrow && (
        <p className="text-xs uppercase tracking-wide text-[var(--mh-accent)]">{eyebrow}</p>
      )}
      {title && <h3 className="mt-1 text-xl text-[var(--mh-charcoal-900)]">{title}</h3>}
      <div className="mt-3 text-[var(--mh-charcoal)]">{children}</div>
    </section>
  );
}
