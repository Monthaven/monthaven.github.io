import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";
import { contactEmails } from "@/lib/seo";

export default function RequestAccessPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Request Access</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Onboard to your mandate lane</h1>
          <p className="text-lg text-mh-charcoal">
            Access confidential materials and data rooms after NDA. Provide your mandate details to receive curated opportunities, analytics, and diligence files specific to your capital objectives.
          </p>
        </header>
        <Box title="Onboarding steps" eyebrow="NCNDA-first">
          <ol className="list-decimal space-y-3 pl-5 text-sm">
            <li>Submit mandate overview and sign the Monthaven NCNDA.</li>
            <li>Confirm capital lanes, ticket size, and sector focus with the advisory team.</li>
            <li>Receive portal credentials and gated materials tailored to your objectives.</li>
          </ol>
        </Box>
        <CalloutStrip>
          Already executed the NCNDA? Email {" "}
          <a className="underline" href={`mailto:${contactEmails.info}`}>
            {contactEmails.info}
          </a>{" "}
          for expedited access or visit the client login portal.
        </CalloutStrip>
      </div>
    </div>
  );
}
