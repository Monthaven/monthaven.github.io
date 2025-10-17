import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";
import CTA from "@/components/CTA";
import { intelEntries } from "@/content/intel";
import { contactEmails } from "@/lib/seo";

export function generateStaticParams() {
  return intelEntries.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = intelEntries.find((item) => item.slug === params.slug);
  if (!entry) {
    return {};
  }

  return {
    title: `${entry.title} | Intel`,
    description: entry.abstract,
  };
}

export default function IntelDetailPage({ params }: { params: { slug: string } }) {
  const entry = intelEntries.find((item) => item.slug === params.slug);

  if (!entry) {
    notFound();
  }

  const Content = entry.component;

  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-mh-accent">{entry.category}</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">{entry.title}</h1>
          <p className="text-sm text-mh-sage700">{entry.date}</p>
          <p className="text-lg text-mh-charcoal">{entry.abstract}</p>
        </header>
        <div className="space-y-6">
          <Content />
        </div>
        <Box title="Request confidential materials" eyebrow="Next steps">
          <p>
            Access detailed underwriting workbooks, financial models, and diligence trackers after NCNDA execution. Share your
            mandate to receive a curated package.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <CTA href="/request-access" label="Request Access" />
            <CTA href="/contact" label="Speak with the Team" variant="secondary" />
          </div>
        </Box>
        <CalloutStrip>
          Download tracking is logged for compliance. Questions? Email {" "}
          <a className="underline" href={`mailto:${contactEmails.legal}`}>
            {contactEmails.legal}
          </a>
          .
        </CalloutStrip>
      </div>
    </div>
  );
}
