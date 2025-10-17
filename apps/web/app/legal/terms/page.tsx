import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";

const updated = "March 31, 2024";

export default function TermsPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Legal</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Terms of Use</h1>
          <p className="text-sm text-mh-sage700">Version effective {updated}</p>
        </header>
        <Box title="Use of Site">
          <p>
            This site is provided for informational purposes only. Monthaven Capital Group and its affiliates (collectively,
            “Monthaven”) reserve the right to modify content without notice. By accessing the site you agree not to reproduce,
            distribute, or exploit any materials without prior written consent.
          </p>
        </Box>
        <Box title="No Offer or Advice">
          <p>
            The materials on this site do not constitute an offer to sell or a solicitation of an offer to buy any securities or
            advisory services. Any investment advisory or placement activities are made only pursuant to applicable agreements
            and in compliance with regulatory requirements.
          </p>
        </Box>
        <Box title="Confidentiality">
          <p>
            Information provided through secure portals or data rooms is subject to executed NCNDA agreements. Users are
            responsible for maintaining the confidentiality of their credentials and information obtained through the site.
          </p>
        </Box>
        <Box title="Limitation of Liability">
          <p>
            Monthaven disclaims liability for any losses arising from reliance on this site. Content is provided “as is” without
            warranties of any kind. Certain jurisdictions may not allow limitations on implied warranties; these exclusions may not
            apply to you.
          </p>
        </Box>
        <CalloutStrip>
          Contact legal@monthaven.capital with any questions about these terms. Records of revisions are maintained as part of Monthaven&apos;s books and records.
        </CalloutStrip>
      </div>
    </div>
  );
}
