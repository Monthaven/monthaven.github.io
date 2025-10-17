import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";
import { contactEmails } from "@/lib/seo";

const version = "v2_2025-08-27";
const effective = "August 27, 2025";

type SectionContent = string | { type: "list"; items: string[] } | { type: "table"; rows: string[][] };

const sections: Array<{ title: string; content: SectionContent[] }> = [
  {
    title: "1) Who We Are & Scope",
    content: [
      "Monthaven Capital Inc. is a private investment advisory and deal-intelligence firm serving sophisticated and institutional investors.",
      {
        type: "list",
        items: [
          "Directly from you (e.g., contact forms, investor profile/intake questionnaires, meeting requests).",
          "Automatically via cookies and similar technologies when you use the Site.",
          "From third parties in the context of diligence, KYC/AML, or business development.",
        ],
      },
      "Offline & Contracted Services: Engagements governed by a signed agreement or a sector-specific notice (e.g., GLBA) are covered by those documents. This website Policy does not replace any such notices.",
    ],
  },
  {
    title: "2) Information We Collect",
    content: [
      "A. Information You Provide",
      {
        type: "list",
        items: [
          "Identity & contact: name, company/organization, job title, work email, phone, address, preferred contact method.",
          "Investor profile data: investor type (e.g., Family Office, REIT), acquisition strategy, markets, asset classes, risk/return thresholds, equity check size, AUM ranges, leverage preferences, holding period, exit preferences, ESG priorities, deal-breakers, notes.",
          "Scheduling & meetings: call requests, in-person meeting preferences, availability windows.",
          "Communications: messages, attachments, feedback, and correspondence.",
        ],
      },
      "B. Information Collected Automatically",
      {
        type: "list",
        items: [
          "Technical: IP address, device identifiers, browser type, operating system, referring/exit pages, time stamps, pages viewed, and approximate geolocation.",
          "Cookies/Tags: session cookies, preference cookies, analytics tags, and similar technologies. See Cookie Notice below.",
        ],
      },
      "C. Information From Third Parties",
      {
        type: "list",
        items: [
          "Public sources, data providers, social/business networks (e.g., LinkedIn).",
          "Referral partners and service providers supporting diligence, compliance, or outreach.",
        ],
      },
    ],
  },
  {
    title: "3) How We Use Information",
    content: [
      {
        type: "list",
        items: [
          "Operate the Site & deliver services: respond to inquiries, process investor intake, match opportunities to stated criteria, schedule and conduct consultations.",
          "Deal curation & communications: send opportunities that align with your profile; contact you about updates, events, and thought leadership; manage preferences.",
          "Improve & secure the Site: debugging, analytics, quality assurance, and security monitoring.",
          "Compliance & risk management: KYC/AML screens (where applicable), conflict checks, sanctions screening, recordkeeping.",
          "Legal & safety: enforce terms, protect rights, comply with subpoenas, court orders, or lawful requests.",
        ],
      },
      "Purpose limitation: we do not use personal information for materially different, unrelated, or incompatible purposes without obtaining your consent or identifying another lawful basis.",
    ],
  },
  {
    title: "4) Legal Bases (EEA/UK only)",
    content: [
      "Where GDPR/UK GDPR applies, our processing relies on:",
      {
        type: "list",
        items: [
          "Contractual necessity (responding to your requests, providing the Site/services).",
          "Legitimate interests (deal curation, security, analytics, proportionate B2B communications).",
          "Consent (cookie categories that are not strictly necessary; marketing where required).",
          "Legal obligation (tax, accounting, sanctions compliance).",
        ],
      },
      "Basis-by-Category Matrix (illustrative):",
      {
        type: "table",
        rows: [
          ["Data Category", "Contract", "Legitimate Interests", "Consent", "Legal Obligation"],
          ["Identity & Contact", "✔︎", "✔︎", "–", "✔︎ (where required for compliance)"],
          ["Investor Profile", "✔︎ (intake)", "✔︎ (matching)", "✔︎ (optional marketing)", "–"],
          ["Technical/Analytics", "–", "✔︎ (security, basic analytics)", "✔︎ (non-essential analytics)", "–"],
          ["Compliance/KYC", "–", "✔︎ (risk mgmt)", "–", "✔︎"],
        ],
      },
    ],
  },
  {
    title: "5) How We Share Information",
    content: [
      "We do not sell personal information. We may disclose information to:",
      {
        type: "list",
        items: [
          "Service providers/processors: hosting, cloud storage, email/SMS, forms/CRM, analytics, security (bound by contracts restricting use to our instructions). A current list of sub-processors is available on request and will be published at /legal/subprocessors once live.",
          "Professional advisors: legal, audit, compliance, tax, insurers.",
          "Transaction counterparties: under NDA/CA during curated introductions or data-room access, subject to confidentiality restrictions.",
          "Authorities: where required by law or to protect rights, security, or property.",
          "Corporate events: in connection with an investment, merger, acquisition, or reorganization.",
        ],
      },
    ],
  },
  {
    title: "6) Sensitive Personal Information",
    content: [
      "We may process investment-profile data (e.g., AUM bands, strategy) that could be considered sensitive in certain jurisdictions. We restrict use to curation, diligence, and compliance and do not use such data to infer characteristics unrelated to investment suitability.",
    ],
  },
  {
    title: "7) Data Retention",
    content: [
      "We retain information only as long as reasonably necessary for the purposes described:",
      {
        type: "list",
        items: [
          "Website/contact inquiries: 24 months after last interaction.",
          "Investor profile records: 7 years after last transaction or 5 years after last activity (whichever is later), unless law requires longer.",
          "Compliance/KYC materials: 5–7 years (or as required by law).",
          "Cookie consent logs: 13 months.",
          "Server/security logs: up to 12 months.",
          "DSAR (privacy request) records: 5 years.",
        ],
      },
      "Deletion may be delayed in backups for limited periods.",
    ],
  },
  {
    title: "8) Security",
    content: [
      "We employ administrative, technical, and physical safeguards proportionate to the sensitivity of the data, including encryption in transit and at rest, access controls, least-privilege, MFA for administrator access, and logging/monitoring. No method is 100% secure; transmission is at your own risk. Where required by law, we will notify you and/or authorities of a data breach without undue delay.",
    ],
  },
  {
    title: "9) International Transfers",
    content: [
      "We may transfer/process information outside your jurisdiction (e.g., to the U.S.). Where required, we rely on adequacy decisions or Standard Contractual Clauses (SCCs) with supplemental measures for EEA/UK data and, where appropriate, the UK IDTA/UK Addendum. For participating vendors, we may also rely on the EU-U.S./UK-U.S. Data Privacy Framework.",
    ],
  },
  {
    title: "10) Your Privacy Rights",
    content: [
      "Subject to applicable law, you may request to access, correct, delete, or port your data and to restrict or object to certain processing (including direct marketing). Where processing is based on consent, you may withdraw consent at any time.",
      "How to exercise your rights:",
      {
        type: "list",
        items: [
          "Email legal@monthavencapital.com with your request and the jurisdiction you reside in.",
          "Verification: we may verify by matching your email/phone and, if needed, request limited documentation to confirm identity/authority (e.g., authorization for an agent).",
          "Timelines: we aim to respond within 45 days; we may extend once by up to 45 days where reasonably necessary and will notify you of the reason.",
          "Appeals: if we deny your request, reply “Appeal” to our decision email; we will respond within 45 days (or the shorter period required by your state law).",
        ],
      },
    ],
  },
  {
    title: "11) U.S. State Disclosures (CA/CO/CT/VA, etc.)",
    content: [
      "We do not sell or share personal information as defined under California law and do not engage in cross-context behavioral advertising.",
      "Opt-out signals: We recognize Global Privacy Control (GPC) and Colorado’s Universal Opt-Out Mechanism signals where applicable and treat them as opt-outs of sale/share/targeted advertising.",
      "We process sensitive personal information only for operational purposes you would reasonably expect (investment intake, compliance).",
      "You may exercise rights via the methods in Your Privacy Rights.",
    ],
  },
  {
    title: "12) Cookie Notice",
    content: [
      "We use cookies and similar technologies to operate the Site, remember preferences, and (with consent where required) understand aggregate usage.",
      "Your controls:",
      {
        type: "list",
        items: [
          "Manage cookies via your browser settings and, where presented, our cookie banner/manager.",
          "We honor applicable consent requirements by region. We do not currently respond to legacy “Do Not Track,” but see Opt-out signals above.",
        ],
      },
      "Representative Cookie Table (subject to change)",
      {
        type: "table",
        rows: [
          ["Name", "Purpose", "Category", "Provider", "Expiry"],
          ["session_id", "Maintains session state and security", "Strictly Necessary", "First-party", "Session"],
          ["consent_record", "Stores your cookie preferences", "Functional", "First-party", "12 months"],
          ["locale", "Remembers language/region", "Functional", "First-party", "12 months"],
          ["page_view_count", "Counts page views for aggregate analytics", "Analytics (consent-based where required)", "First-party", "13 months"],
          ["visit_id", "Distinguishes visits for aggregate analytics", "Analytics (consent-based where required)", "First-party", "13 months"],
        ],
      },
      "A more detailed Cookie Table will be maintained at /legal/cookies once live.",
    ],
  },
  {
    title: "13) Third-Party Links & Embedded Content",
    content: [
      "The Site may link to external resources (e.g., calendar scheduling, market intel, data rooms). We are not responsible for third-party privacy practices. Review those policies before submitting data.",
    ],
  },
  {
    title: "14) Children’s Privacy",
    content: [
      "The Site is not intended for individuals under 16 (or the minimum age required in your jurisdiction). We do not knowingly collect such data. If you believe a minor has provided information, contact us to delete it.",
    ],
  },
  {
    title: "15) SMS Communications",
    content: [
      "If you opt in to receive text messages from Monthaven Capital Inc., we will use your phone number to send messages related to investment opportunities, meeting reminders, and account/portal notifications. Message frequency may vary. Message & data rates may apply. Reply STOP to opt out and HELP for help. SMS consent is not shared with third parties or affiliates other than service providers that send messages on our behalf (they may not use your number for their own purposes). See our SMS Terms & Conditions for details.",
    ],
  },
  {
    title: "16) Contact Us (Primary Contact)",
    content: [
      "Monthaven Capital Inc., 30 N Gould St Ste R, Sheridan, WY 82801, USA",
      "+1-646-964-9686",
      "Email: info@monthavencapital.com",
      "Optional secondary: legal@monthavencapital.com",
      "When contacting us to exercise rights, please specify your name, contact information, the request type, and the jurisdiction you reside in. Authorized agents may submit requests with valid authorization.",
    ],
  },
  {
    title: "17) U.S. State Notice at Collection (CA-style Summary)",
    content: [
      "Categories we collect: Identifiers (name, email, phone), professional info (company, title), commercial preferences (investment criteria), internet activity (Site usage), and limited inferences for investment curation.",
      "Purposes: Site operation, investor intake/matching, security/compliance, communications, analytics.",
      "Retention: See Section 7.",
      "Disclosure: Service providers/processors; professional advisors; counterparties under NDA; authorities as required.",
      "Sale/Share: No.",
      "Sensitive data: Used only for limited operational purposes expected by you (intake/compliance).",
      "Opt-out signals: We recognize GPC and applicable universal opt-out signals.",
      "Contact: legal@monthavencapital.com.",
    ],
  },
  {
    title: "18) Jurisdiction-Specific Addenda (If Applicable)",
    content: [
      "GDPR/UK GDPR Addendum: Details of SCCs, DPO/UK Rep (if appointed), and lawful basis mappings.",
      "Virginia/Colorado/Connecticut/Utah Addendum: State-specific definitions and opt-out mechanisms (if any advertising/cross-context sharing is introduced).",
      "Nevada: We do not sell covered information as defined by Nevada law.",
    ],
  },
  {
    title: "19) Financial-Sector Note (Informational)",
    content: [
      "If we become a \"financial institution\" under GLBA due to the nature of client relationships, a separate GLBA Privacy Notice may apply to certain data. This website Policy is complementary and does not replace any required sectoral notices.",
    ],
  },
  {
    title: "20) Automated Decision-Making & Profiling",
    content: [
      "We do not make decisions based solely on automated processing that produce legal or similarly significant effects. Investment matching includes human review.",
    ],
  },
  {
    title: "21) Plain-English Summary",
    content: [
      "We collect what you give us (contact + investor preferences), what your browser shares (basic analytics), and what partners share during diligence. We use it to match you to opportunities, run the Site, and meet legal obligations. We don’t sell your data. You control your info—ask to see it, fix it, delete it, or limit it. Email legal@monthavencapital.com anytime.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Legal</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Privacy Policy</h1>
          <p className="text-sm text-mh-sage700">Version {version} · Effective {effective}</p>
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

                if (entry.type === "table") {
                  return (
                    <div key={index} className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-mh-cream100">
                          <tr>
                            {entry.rows[0].map((header, headerIndex) => (
                              <th key={`${section.title}-header-${headerIndex}`} className="px-3 py-2 font-semibold text-mh-charcoal900">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {entry.rows.slice(1).map((row, rowIndex) => (
                            <tr key={row.join("-")} className={rowIndex % 2 === 0 ? "bg-white" : "bg-mh-cream100"}>
                              {row.map((cell, cellIndex) => (
                                <td key={`${section.title}-${rowIndex}-${cellIndex}`} className="px-3 py-2 align-top">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </Box>
        ))}
        <CalloutStrip>
          Questions about privacy practices may be directed to {" "}
          <a className="underline" href={`mailto:${contactEmails.legal}`}>
            {contactEmails.legal}
          </a>
          . Monthaven updates this notice as regulatory requirements evolve and maintains prior versions for recordkeeping.
        </CalloutStrip>
      </div>
    </div>
  );
}
