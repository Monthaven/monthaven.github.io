import CardGrid from "@/components/CardGrid";
import CalloutStrip from "@/components/CalloutStrip";
import { intelEntries } from "@/content/intel";

export default function IntelPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Intel</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Market notes and anonymized case studies</h1>
          <p className="text-lg text-mh-charcoal">
            Access highlights from Monthaven&apos;s deal-intelligence work. Full briefs, data rooms, and underwriting files are available to qualified clients under NCNDA.
          </p>
        </header>
        <CardGrid
          cards={intelEntries.map((entry) => ({
            slug: entry.slug,
            title: entry.title,
            description: entry.abstract,
            date: entry.date,
          }))}
        />
        <CalloutStrip>
          Download full Intel packages and case studies once onboarded to your mandate lane. Request access to initiate NCNDA.
        </CalloutStrip>
      </div>
    </div>
  );
}
