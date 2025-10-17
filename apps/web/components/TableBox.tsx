import { ReactNode } from "react";

export default function TableBox({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white border border-[var(--mh-sage)] shadow-[var(--mh-shadow-soft)] p-6">
      <h3 className="text-lg font-semibold text-[var(--mh-charcoal-900)]">{title}</h3>
      {description && <p className="mt-2 text-sm text-[var(--mh-charcoal)]">{description}</p>}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm text-[var(--mh-charcoal)]">
          {children}
        </table>
      </div>
    </section>
  );
}
