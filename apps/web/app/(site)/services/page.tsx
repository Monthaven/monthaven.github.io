import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";

const services = [
  {
    title: "Buy-Side Advisory",
    inputs: [
      "Mandate definition and criteria scoring",
      "Pipeline intelligence and sourcing analytics",
      "NCNDA administration and confidentiality protocols",
    ],
    outputs: [
      "Curated introductions with data packs",
      "Underwriting support and valuation alignment",
      "Execution roadmap with diligence milestones",
    ],
  },
  {
    title: "Discreet Dispositions",
    inputs: [
      "Seller objectives and confidentiality thresholds",
      "Pre-marketing underwriting and comps",
      "Stakeholder alignment across property teams",
    ],
    outputs: [
      "Shortlist of vetted buyers under NCNDA",
      "Structured bid process with institutional cadence",
      "Closing support and post-close communications",
    ],
  },
  {
    title: "Capital Formation",
    inputs: [
      "Capital stack diagnostics",
      "Placement strategy and compliance framework",
      "Manager positioning and data preparation",
    ],
    outputs: [
      "Investor coverage and meeting orchestration",
      "Feedback-driven term refinement",
      "Alignment with registered BD / exempt adviser partners*",
    ],
  },
  {
    title: "Underwriting & Diligence",
    inputs: [
      "Assumption validation and stress testing",
      "Third-party vendor coordination",
      "IC-ready materials and risk memos",
    ],
    outputs: [
      "Investment committee-ready packages",
      "Integrated diligence trackers",
      "Scenario analysis and downside planning",
    ],
  },
  {
    title: "Portfolio Intelligence",
    inputs: [
      "Operational data ingestion",
      "Market benchmarking and KPI mapping",
      "Stakeholder interview program",
    ],
    outputs: [
      "Quarterly dashboards and analytics",
      "Actionable recommendations",
      "Board reporting and mandate refresh",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Services</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Advisory lanes engineered for confidentiality</h1>
          <p className="text-lg text-mh-charcoal">
            Monthaven supports clients across mandate definition, deal sourcing, execution, and portfolio intelligence. Each service lane operates with NCNDA-first discipline and institutional rigor.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Box key={service.title} title={service.title}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-mh-charcoal900">Inputs</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
                    {service.inputs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-mh-charcoal900">Outputs</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
                    {service.outputs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Box>
          ))}
        </div>
        <CalloutStrip>
          *Any securities placement or capital formation activities are executed through appropriately registered broker-dealers or exempt advisers. Monthaven coordinates compliance review prior to outreach.
        </CalloutStrip>
      </div>
    </div>
  );
}
