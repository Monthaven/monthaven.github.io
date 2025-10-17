import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";

const updated = "March 31, 2024";

export default function PrivacyPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Legal</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Privacy Notice</h1>
          <p className="text-sm text-mh-sage700">Version effective {updated}</p>
        </header>
        <Box title="Information we collect">
          <p>
            Monthaven collects contact details, firm affiliation, mandate preferences, and communications necessary to provide
            advisory services. Additional information may be gathered through NDAs, data rooms, and diligence portals.
          </p>
        </Box>
        <Box title="How we use information">
          <p>
            Data is used to evaluate mandates, coordinate NCNDA execution, deliver analytics, and comply with legal and
            regulatory obligations. We do not sell personal information. Sharing is limited to vendors supporting mandate delivery
            under confidentiality agreements.
          </p>
        </Box>
        <Box title="Your choices">
          <p>
            You may update or request deletion of your information by contacting privacy@monthaven.capital. Certain records must
            be retained to comply with legal obligations and engagement terms.
          </p>
        </Box>
        <Box title="Security">
          <p>
            We maintain administrative, technical, and physical safeguards designed to protect information submitted through this
            site and associated portals. Access is limited to personnel with a legitimate need to know.
          </p>
        </Box>
        <CalloutStrip>
          Questions about privacy practices may be directed to privacy@monthaven.capital. Monthaven updates this notice as
          regulatory requirements evolve and maintains prior versions for recordkeeping.
        </CalloutStrip>
      </div>
    </div>
  );
}
