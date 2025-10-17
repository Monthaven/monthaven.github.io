import Link from "next/link";

export type Card = {
  slug: string;
  title: string;
  description: string;
  date: string;
  href?: string;
};

export default function CardGrid({ title, cards }: { title?: string; cards: Card[] }) {
  return (
    <section className="space-y-6">
      {title && <h3 className="text-2xl font-semibold text-[var(--mh-charcoal-900)]">{title}</h3>}
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const content = (
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--mh-sage)] bg-white p-6 shadow-[var(--mh-shadow-soft)]">
              <p className="text-xs uppercase tracking-wide text-[var(--mh-accent)]">{card.date}</p>
              <h4 className="text-lg font-semibold text-[var(--mh-charcoal-900)]">{card.title}</h4>
              <p className="text-sm text-[var(--mh-charcoal)]">{card.description}</p>
            </div>
          );

          if (card.href) {
            return (
              <Link key={card.slug} href={card.href} className="h-full">
                {content}
              </Link>
            );
          }

          return (
            <Link key={card.slug} href={`/intel/${card.slug}`} className="h-full">
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
