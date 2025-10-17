import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";
import { contactEmails } from "@/lib/seo";

const updated = "August 27, 2025";

const sections: Array<{ title: string; content: (string | { type: "list"; items: string[] })[] }> = [
  {
    title: "1) Acceptance",
    content: [
      "By accessing this website, you agree to these Terms. If you do not agree, do not use the site.",
    ],
  },
  {
    title: "2) Informational Only — No Offers",
    content: [
      "Content is for informational purposes only and does not constitute an offer to sell or a solicitation to buy any security or real estate. Any offer will be made only via definitive documentation to qualified parties and in compliance with applicable laws.",
    ],
  },
  {
    title: "3) Not a Broker-Dealer or Brokerage",
    content: [
      "Monthaven Capital Inc. is not a broker-dealer, investment adviser, or real estate brokerage. We make no representation of future performance. You are responsible for your own due diligence and professional advice.",
    ],
  },
  {
    title: "4) Eligibility & Accounts",
    content: [
      "You must be 18+ and legally able to contract. If you create an account or submit forms, you are responsible for the accuracy of information and safeguarding any credentials.",
    ],
  },
  {
    title: "5) Prohibited Uses",
    content: [
      {
        type: "list",
        items: [
          "Engaging in unlawful activities or violating regulations.",
          "Scraping, crawling, or harvesting data without consent.",
          "Introducing malware or attempting to compromise security.",
          "Infringing intellectual property rights.",
          "Interfering with site operations or infrastructure.",
        ],
      },
    ],
  },
  {
    title: "6) Intellectual Property",
    content: [
      "All content is owned by Monthaven Capital Inc. or its licensors. A limited, revocable license is granted for personal or internal business use to view the site. No reproduction, distribution, or derivative works without prior written permission.",
    ],
  },
  {
    title: "7) Third-Party Links",
    content: [
      "We may link to third-party sites. We are not responsible for their content or practices.",
    ],
  },
  {
    title: "8) Disclaimers",
    content: [
      "THE SITE IS PROVIDED “AS IS” AND “AS AVAILABLE.” WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
    ],
  },
  {
    title: "9) Limitation of Liability",
    content: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, MONTHAVEN CAPITAL INC. WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOST PROFITS OR DATA, ARISING FROM YOUR USE OF THE SITE.",
    ],
  },
  {
    title: "10) Indemnity",
    content: [
      "You agree to indemnify and hold harmless Monthaven Capital Inc. and its affiliates, officers, employees, and agents from claims arising out of your use of the site or violation of these Terms.",
    ],
  },
  {
    title: "11) Privacy",
    content: [
      "Your use of the site is subject to our Privacy Policy.",
    ],
  },
  {
    title: "12) Governing Law & Venue",
    content: [
      "These Terms are governed by the laws of the State of North Carolina, without regard to conflict-of-law rules. Exclusive venue lies in state or federal courts located in North Carolina, and you consent to jurisdiction there.",
    ],
  },
  {
    title: "13) Changes & Termination",
    content: [
      "We may update these Terms at any time by posting a new version. We may suspend or terminate access to the site at our discretion.",
    ],
  },
  {
    title: "14) Contact",
    content: [
      "Monthaven Capital Inc., 30 N Gould St Ste R, Sheridan, WY 82801",
      {
        type: "list",
        items: ["Email: info@monthavencapital.com", "Legal: legal@monthavencapital.com"],
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Legal</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Terms of Use</h1>
          <p className="text-sm text-mh-sage700">Version effective {updated}</p>
        </header>
        {sections.map((section) => (
          <Box key={section.title} title={section.title}>
            <div className="space-y-4">
              {section.content.map((entry, index) => {
                if (typeof entry === "string") {
                  return <p key={index}>{entry}</p>;
                }

                if (entry.type === "list") {
                  return (
                    <ul key={index} className="list-disc space-y-2 pl-5">
                      {entry.items.map((item, itemIndex) => (
                        <li key={`${section.title}-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return null;
              })}
            </div>
          </Box>
        ))}
        <CalloutStrip>
          Questions about these Terms can be directed to {" "}
          <a className="underline" href={`mailto:${contactEmails.legal}`}>
            {contactEmails.legal}
          </a>
          . Revisions are maintained as part of Monthaven&apos;s books and records.
        </CalloutStrip>
      </div>
    </div>
  );
}
