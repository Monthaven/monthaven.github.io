import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";

const pillars = [
  {
    title: "Off-market sourcing at scale",
    copy:
      "We maintain mandate-specific intelligence across operators, developers, and family offices, enabling introductions before assets reach broad marketing.",
    proof: "68% of introductions in Q1 2024 were off-market and NCNDA-bound.",
  },
  {
    title: "Institutional underwriting & diligence support",
    copy:
      "Dedicated underwriting resources pressure-test assumptions, build committee-ready cases, and coordinate third-party diligence.",
    proof: "Underwriting memos delivered within five business days on average for live mandates.",
  },
  {
    title: "Confidential, NCNDA-first process",
    copy:
      "Formal NCNDA execution precedes every information exchange, protecting investors, owners, and Monthaven relationships.",
    proof: "NCNDAs executed within 48 hours across priority lanes in 2023–2024.",
  },
  {
    title: "Mandate alignment over volume",
    copy:
      "We curate introductions around explicit capital objectives, avoiding distribution lists and maintaining scarcity value.",
    proof: "87% client renewal rate within 12 months underscores mandate alignment.",
  },
];

const testimonials = [
  {
    quote:
      "Monthaven delivered diligence-ready materials and a curated buyer set. The process felt institutional yet highly discreet.",
    attribution: "Managing Director, Institutional Real Asset Platform (March 2024)"
  }
];

export default function WhyPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Why Monthaven</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Institutional-grade process, confidential posture</h1>
          <p className="text-lg text-mh-charcoal">
            Clients engage Monthaven to bridge mandate clarity with deal intelligence. Our advisory model blends sourcing, underwriting,
            and execution support while preserving confidentiality at every stage.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <Box key={pillar.title} title={pillar.title}>
              <p>{pillar.copy}</p>
              <p className="mt-4 text-sm text-mh-charcoal900">Proof: {pillar.proof}</p>
            </Box>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <Box key={item.quote} title="Client perspective">
              <blockquote className="text-mh-charcoal">
                “{item.quote}”
              </blockquote>
              <p className="mt-3 text-sm text-mh-sage700">{item.attribution}</p>
            </Box>
          ))}
          <CalloutStrip>
            Monthaven maintains an approvals log for all published materials. Confidential case studies and metrics remain available to qualified clients under NDA.
          </CalloutStrip>
        </div>
      </div>
    </div>
  );
}
