export type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQBox({ title, items }: { title: string; items: FAQItem[] }) {
  return (
    <section className="rounded-2xl bg-white border border-[var(--mh-sage)] shadow-[var(--mh-shadow-soft)] p-6">
      <h3 className="text-lg font-semibold text-[var(--mh-charcoal-900)]">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-[var(--mh-sage)] bg-[var(--mh-cream100)] p-4"
          >
            <summary className="cursor-pointer text-sm font-medium text-[var(--mh-charcoal-900)]">
              {item.question}
            </summary>
            <p className="mt-2 text-sm text-[var(--mh-charcoal)]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
