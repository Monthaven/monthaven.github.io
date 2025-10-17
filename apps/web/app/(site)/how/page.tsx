import StepBox from "@/components/StepBox";
import TableBox from "@/components/TableBox";
import CalloutStrip from "@/components/CalloutStrip";

const steps = [
  {
    title: "Intro & Criteria",
    description: "Align on mandate goals, confidentiality requirements, and diligence expectations.",
    detail:
      "We map capital lanes, preferred deal profiles, and decision timelines to ensure sourcing precision and governance coverage.",
  },
  {
    title: "NCNDA",
    description: "Execute non-circumvention and NDA agreements before any information is shared.",
    detail:
      "NCNDA establishes confidentiality and process discipline for investors, owners, and Monthaven as intermediary.",
  },
  {
    title: "Targeting",
    description: "Curate opportunities or investors based on qualified fit with the mandate.",
    detail:
      "Opportunities are vetted for alignment with underwriting thresholds; buyers and sellers receive tailored briefings.",
  },
  {
    title: "Advisory through execution",
    description: "Coordinate diligence, financing, and stakeholder communications through close.",
    detail:
      "We manage data room readiness, third-party workstreams, and negotiation cadence.",
  },
  {
    title: "Ongoing intel",
    description: "Refresh pipelines and provide portfolio intelligence post-close.",
    detail:
      "Mandates evolve with quarterly reviews, market updates, and proactive sourcing.",
  },
];

const ncnDaTable = (
  <>
    <thead>
      <tr className="text-left text-sm font-semibold text-mh-charcoal900">
        <th className="py-2 pr-4">Protection</th>
        <th className="py-2 pr-4">Investors</th>
        <th className="py-2">Owners</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="py-2 pr-4">Confidentiality</td>
        <td className="py-2 pr-4">Gain pre-market access without public disclosure.</td>
        <td className="py-2">Maintain privacy over dispositions and recapitalizations.</td>
      </tr>
      <tr>
        <td className="py-2 pr-4">Data protection</td>
        <td className="py-2 pr-4">Receive diligence-ready data with usage controls.</td>
        <td className="py-2">Safeguard proprietary financials and tenant details.</td>
      </tr>
      <tr>
        <td className="py-2 pr-4">Non-circumvention</td>
        <td className="py-2 pr-4">Preserves orderly process and advisory oversight.</td>
        <td className="py-2">Prevents direct outreach that could erode value.</td>
      </tr>
      <tr>
        <td className="py-2 pr-4">Shared alignment</td>
        <td className="py-2 pr-4">Ensures expectations on communication cadence.</td>
        <td className="py-2">Clarifies escalation paths and decision rights.</td>
      </tr>
    </tbody>
  </>
);

const compareTable = (
  <>
    <thead>
      <tr className="text-left text-sm font-semibold text-mh-charcoal900">
        <th className="py-2 pr-4">Element</th>
        <th className="py-2 pr-4">Off-Market (Monthaven)</th>
        <th className="py-2">Traditional Processes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="py-2 pr-4">Competition</td>
        <td className="py-2 pr-4">Limited to pre-qualified counterparties under NDA.</td>
        <td className="py-2">Broad auctions with public exposure and pricing pressure.</td>
      </tr>
      <tr>
        <td className="py-2 pr-4">Pricing</td>
        <td className="py-2 pr-4">Value-focused with alignment on underwriting assumptions.</td>
        <td className="py-2">Prone to bid inflation and retrades.</td>
      </tr>
      <tr>
        <td className="py-2 pr-4">Confidentiality</td>
        <td className="py-2 pr-4">NCNDA-first, minimal market signaling.</td>
        <td className="py-2">Marketing leaks can disrupt tenants and partners.</td>
      </tr>
      <tr>
        <td className="py-2 pr-4">Speed</td>
        <td className="py-2 pr-4">Streamlined diligence, calibrated timeline.</td>
        <td className="py-2">Extended due to broad marketing cycles.</td>
      </tr>
    </tbody>
  </>
);

export default function HowPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-wide text-mh-accent">How We Work</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Structured mandate execution anchored by NCNDA</h1>
          <p className="text-lg text-mh-charcoal">
            Monthaven operates an institutional, five-step process to protect value while advancing your mandate. Step two codifies the NCNDA foundation before any diligence begins.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((step, index) => (
            <StepBox
              key={step.title}
              step={index + 1}
              title={step.title}
              description={step.description}
              className="cursor-pointer"
              analyticsStep={index + 1}
            >
              <p>{step.detail}</p>
            </StepBox>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <TableBox title="NCNDA: Foundation of trust" description="Formal protections for every party involved.">
            {ncnDaTable}
          </TableBox>
          <TableBox title="Off-Market vs Traditional" description="Why mandate-driven sourcing preserves value.">
            {compareTable}
          </TableBox>
        </div>
        <CalloutStrip>
          Strictly off-market, NCNDA-first. Curated matches, formal diligence, discreet execution.
        </CalloutStrip>
      </div>
    </div>
  );
}
