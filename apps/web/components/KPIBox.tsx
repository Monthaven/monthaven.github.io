export default function KPIBox({
  label,
  figure,
  qualifier,
  footnote,
}: {
  label: string;
  figure: string;
  qualifier?: string;
  footnote: string;
}) {
  return (
    <section className="rounded-2xl bg-white border border-[var(--mh-sage)] shadow-[var(--mh-shadow-soft)] p-6">
      <p className="text-xs uppercase tracking-wide text-[var(--mh-accent)]">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-[var(--mh-charcoal-900)]">{figure}</p>
      {qualifier && <p className="mt-2 text-sm text-[var(--mh-charcoal)]">{qualifier}</p>}
      <p className="mt-3 text-xs text-[var(--mh-sage700)]">{footnote}</p>
    </section>
  );
}
