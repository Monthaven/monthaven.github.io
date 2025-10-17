import Box from "@/components/Box";
import KPIBox from "@/components/KPIBox";
import CardGrid from "@/components/CardGrid";
import CTA from "@/components/CTA";
import CalloutStrip from "@/components/CalloutStrip";
import { intelEntries } from "@/content/intel";

const kpis = [
  {
    label: "Qualified introductions",
    figure: "$1.2B+",
    qualifier: "Mandate-matched introductions to date",
    footnote: "[1] Gross asset value of introductions facilitated January 2022–March 2024; tracked via Monthaven CRM logs.",
  },
  {
    label: "Curated mandates",
    figure: "42",
    qualifier: "Active and recent mandates across strategies",
    footnote: "[2] Mandates onboarded between July 2022 and March 2024 with executed NCNDAs.",
  },
  {
    label: "Diligence support",
    figure: "<45 days",
    qualifier: "Median advisory-led diligence cycle",
    footnote: "[3] Measured on transactions closed 2023–Q1 2024 under Monthaven advisory.",
  },
  {
    label: "Retention",
    figure: "87%",
    qualifier: "Clients extending mandates beyond initial scope",
    footnote: "[4] Percentage of clients renewing services within 12 months ending March 2024.",
  },
];

const whyPillars = [
  {
    title: "Off-market sourcing at scale",
    proof: "Institutional-grade coverage across operators, developers, and family offices.",
  },
  {
    title: "Institutional underwriting & diligence",
    proof: "Dedicated underwriting bench provides investment committee-ready analysis.",
  },
  {
    title: "Confidential, NCNDA-first process",
    proof: "Every mandate begins with formal NCNDA onboarding and data protection protocol.",
  },
  {
    title: "Mandate alignment",
    proof: "No blast lists—each introduction is curated to expressed criteria and capital lanes.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-mh-cream">
      <section className="bg-mh-cream100">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-[0.3em] text-mh-accent">Advisory & Deal-Intelligence</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight text-mh-charcoal900">
            Off-market mandates. Institutional diligence. Confidential execution.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-mh-charcoal">
            Monthaven is a capital advisory and deal-intelligence partner connecting qualified buyers with strictly off-market real-asset opportunities. Mandate-driven sourcing, institutional underwriting, and confidential execution are embedded in every engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTA href="/request-access" label="Request Access" />
            <CTA href="/contact" label="Speak with the Team" variant="secondary" />
          </div>
        </div>
      </section>

      <section id="why" className="bg-mh-cream py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-mh-accent">Why Monthaven</p>
              <h2 className="mt-2 text-3xl font-semibold text-mh-charcoal900">Pillars that protect mandate value</h2>
            </div>
            <CTA href="/why" label="Explore why clients trust us" variant="secondary" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {whyPillars.map((pillar) => (
              <Box key={pillar.title} title={pillar.title}>
                <p>{pillar.proof}</p>
              </Box>
            ))}
          </div>
        </div>
      </section>

      <section id="numbers" className="bg-mh-cream100 py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-mh-accent">By the Numbers</p>
              <h2 className="mt-2 text-3xl font-semibold text-mh-charcoal900">Mandate impact with transparent footnotes</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {kpis.map((kpi) => (
              <KPIBox key={kpi.label} {...kpi} />
            ))}
          </div>
        </div>
      </section>

      <section id="intel" className="bg-mh-cream py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-mh-accent">Latest Intel</p>
              <h2 className="mt-2 text-3xl font-semibold text-mh-charcoal900">Advisory briefs and case studies</h2>
            </div>
            <CTA href="/intel" label="View all intel" variant="secondary" />
          </div>
          <CardGrid
            cards={intelEntries.slice(0, 3).map((entry) => ({
              slug: entry.slug,
              title: entry.title,
              description: entry.abstract,
              date: entry.date,
            }))}
          />
        </div>
      </section>

      <section id="contact" className="bg-mh-cream100 py-20">
        <div className="mx-auto max-w-6xl space-y-8 px-6">
          <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
            <Box title="Speak with our advisory team" eyebrow="Contact">
              <p>
                Share your mandate objectives and confidentiality requirements. We will align on mandate lanes, NCNDA execution,
                and how Monthaven can extend your deal intelligence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTA href="/contact" label="Contact" />
                <CTA
                  href="mailto:info@monthavencapital.com"
                  label="info@monthavencapital.com"
                  variant="secondary"
                />
              </div>
            </Box>
            <Box title="Direct emails">
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="font-semibold text-mh-charcoal900">General inquiries:</span> info@monthavencapital.com
                </li>
                <li>
                  <span className="font-semibold text-mh-charcoal900">Legal & compliance:</span> legal@monthavencapital.com
                </li>
              </ul>
            </Box>
          </div>
          <CalloutStrip>
            Access confidential materials and data rooms after NDA. Request access to be onboarded to your mandate lane.
          </CalloutStrip>
        </div>
      </section>
    </div>
  );
}
