import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";

const updated = "March 31, 2024";

export default function AccessibilityPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Legal</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Accessibility Statement</h1>
          <p className="text-sm text-mh-sage700">Version effective {updated}</p>
        </header>
        <Box title="Our commitment">
          <p>
            Monthaven is committed to providing a website that is accessible to the widest possible audience, regardless of
            technology or ability. We follow WCAG 2.1 AA guidelines where practicable and review our digital properties
            regularly.
          </p>
        </Box>
        <Box title="Ongoing efforts">
          <p>
            Accessibility improvements include semantic markup, keyboard navigation support, alternative text for imagery, and
            contrast ratios that meet or exceed AA thresholds. We welcome feedback to improve user experience.
          </p>
        </Box>
        <Box title="Contact">
          <p>
            If you experience difficulty accessing content, please email accessibility@monthaven.capital or call +1 (615)
            555-0199. We will respond promptly to provide the requested information through an accessible channel.
          </p>
        </Box>
        <CalloutStrip>
          Accessibility initiatives are reviewed at least annually and tracked as part of Monthaven&apos;s governance program.
        </CalloutStrip>
      </div>
    </div>
  );
}
