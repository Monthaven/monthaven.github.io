import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";
import { contactEmails } from "@/lib/seo";

const updated = "August 27, 2025";

const sections = [
  {
    title: "1) Program Description",
    content:
      "By opting in, you agree to receive SMS messages related to off-market opportunities, meeting reminders/confirmations, document access notifications, and account or preference updates.",
  },
  {
    title: "2) Opt-In",
    content:
      "You may opt in via our web forms, documented verbal consent with our team, or by texting START to our number.",
  },
  {
    title: "3) Message Frequency",
    content: "Message frequency may vary.",
  },
  {
    title: "4) Cost",
    content: "Message and data rates may apply.",
  },
  {
    title: "5) Opt-Out",
    content: "Text STOP at any time to stop receiving messages. You will receive a final confirmation SMS.",
  },
  {
    title: "6) Help",
    content:
      "Text HELP for assistance or contact us at info@monthavencapital.com for support with your messaging preferences.",
  },
  {
    title: "7) Carriers",
    content: "Wireless carriers are not liable for delayed or undelivered messages.",
  },
  {
    title: "8) Eligibility",
    content: "Must be 18+ to subscribe.",
  },
  {
    title: "9) Privacy",
    content:
      "Personal information is handled per our Privacy Policy. SMS consent is not shared with third parties.",
  },
  {
    title: "10) Changes",
    content:
      "We may update these terms; the effective date will be posted on this page.",
  },
  {
    title: "11) Contact",
    content:
      "For questions about SMS messaging, email info@monthavencapital.com or legal@monthavencapital.com, or mail Monthaven Capital Inc., 30 N Gould St Ste R, Sheridan, WY 82801.",
  },
];

export default function SmsTermsPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Legal</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">SMS Terms &amp; Conditions</h1>
          <p className="text-sm text-mh-sage700">Version effective {updated}</p>
          <p className="text-sm text-mh-charcoal">
            Provider/Brand: Monthaven Capital Inc. · Program Number(s): communicated during the opt-in process.
          </p>
        </header>
        {sections.map((section) => (
          <Box key={section.title} title={section.title}>
            <p>{section.content}</p>
          </Box>
        ))}
        <CalloutStrip>
          Need assistance with SMS preferences? Email {" "}
          <a className="underline" href={`mailto:${contactEmails.info}`}>
            {contactEmails.info}
          </a>{" "}
          or {" "}
          <a className="underline" href={`mailto:${contactEmails.legal}`}>
            {contactEmails.legal}
          </a>
          .
        </CalloutStrip>
      </div>
    </div>
  );
}
