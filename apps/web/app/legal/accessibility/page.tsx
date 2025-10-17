import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";
import { contactEmails } from "@/lib/seo";

const updated = "August 27, 2025";

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
            Monthaven Capital Inc. is committed to making our website accessible to everyone, including people with disabilities.
            We continually invest in accessibility so that every visitor can review mandate information, request access, and
            connect with our team without barriers.
          </p>
        </Box>
        <Box title="Our approach">
          <ul className="list-disc space-y-2 pl-5">
            <li>Aligning with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</li>
            <li>Using semantic HTML and ARIA roles to convey structure and navigation.</li>
            <li>Providing alternative text for images and meaningful link descriptions.</li>
            <li>Maintaining sufficient color contrast and scalable typography.</li>
            <li>Ensuring the site is navigable by keyboard and assistive technologies.</li>
          </ul>
        </Box>
        <Box title="Feedback & support">
          <p>
            If you encounter any accessibility barriers or have suggestions, please contact us at {" "}
            <a className="underline" href={`mailto:${contactEmails.info}`}>
              {contactEmails.info}
            </a>
            {" "}or mail Monthaven Capital Inc., 30 N Gould St Ste R, Sheridan, WY 82801. We aim to respond within two business
            days.
          </p>
        </Box>
        <CalloutStrip>
          Monthaven reviews accessibility initiatives at least annually and incorporates feedback into our governance program.
        </CalloutStrip>
      </div>
    </div>
  );
}
