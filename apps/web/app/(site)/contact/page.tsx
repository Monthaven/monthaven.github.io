import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";
import CTA from "@/components/CTA";
import { contactEmails } from "@/lib/seo";

const sectors = ["Logistics", "Residential", "Healthcare", "Hospitality", "Data Infrastructure", "Other"];
const mandateTypes = ["Buy-Side", "Sell-Side", "Capital Formation", "Portfolio Intelligence", "Other"];

export default function ContactPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Contact</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Speak with Monthaven</h1>
          <p className="text-lg text-mh-charcoal">
            Share your firm&apos;s objectives, capital lanes, and confidentiality requirements. We respond within two business days to coordinate NCNDA onboarding and mandate scoping.
          </p>
        </header>
        <Box title="Mandate intake" eyebrow="Request a conversation">
          <form className="grid gap-6" action="/api/contact" method="post">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="text-mh-charcoal900">Name</span>
                <input name="name" type="text" required className="mt-2 w-full rounded-xl border border-[var(--mh-sage)] bg-white px-3 py-2" />
              </label>
              <label className="text-sm">
                <span className="text-mh-charcoal900">Firm</span>
                <input name="firm" type="text" required className="mt-2 w-full rounded-xl border border-[var(--mh-sage)] bg-white px-3 py-2" />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="text-mh-charcoal900">Email</span>
                <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-[var(--mh-sage)] bg-white px-3 py-2" />
              </label>
              <label className="text-sm">
                <span className="text-mh-charcoal900">Role</span>
                <input name="role" type="text" className="mt-2 w-full rounded-xl border border-[var(--mh-sage)] bg-white px-3 py-2" />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="text-mh-charcoal900">Mandate type</span>
                <select name="mandateType" className="mt-2 w-full rounded-xl border border-[var(--mh-sage)] bg-white px-3 py-2">
                  {mandateTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <span className="text-mh-charcoal900">Sector focus</span>
                <select name="sector" className="mt-2 w-full rounded-xl border border-[var(--mh-sage)] bg-white px-3 py-2">
                  {sectors.map((sector) => (
                    <option key={sector}>{sector}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                <span className="text-mh-charcoal900">Geography</span>
                <input name="geo" type="text" className="mt-2 w-full rounded-xl border border-[var(--mh-sage)] bg-white px-3 py-2" />
              </label>
              <label className="text-sm">
                <span className="text-mh-charcoal900">Target ticket size</span>
                <input name="ticket" type="text" className="mt-2 w-full rounded-xl border border-[var(--mh-sage)] bg-white px-3 py-2" />
              </label>
            </div>
            <label className="text-sm">
              <span className="text-mh-charcoal900">Timing</span>
              <input name="timing" type="text" className="mt-2 w-full rounded-xl border border-[var(--mh-sage)] bg-white px-3 py-2" />
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input name="nda" type="checkbox" className="h-4 w-4 rounded border-[var(--mh-sage)]" />
            <span>I am ready to execute an NCNDA to receive confidential materials.</span>
            </label>
            <button
              type="submit"
              className="w-full rounded-2xl bg-[var(--mh-accent)] px-5 py-3 text-sm font-semibold text-[var(--mh-cream)] shadow-[var(--mh-shadow-soft)]"
            >
              Submit mandate details
            </button>
          </form>
        </Box>
        <CalloutStrip>
          <span>
            Routing to CRM; auto-reply includes NCNDA steps. Direct questions can be sent to {" "}
            <a className="underline" href={`mailto:${contactEmails.info}`}>
              {contactEmails.info}
            </a>{" "}
            or {" "}
            <a className="underline" href={`mailto:${contactEmails.legal}`}>
              {contactEmails.legal}
            </a>
            .
          </span>
        </CalloutStrip>
        <div className="flex flex-wrap gap-3">
          <CTA href={`mailto:${contactEmails.info}`} label="Email info@" variant="secondary" />
          <CTA href="/request-access" label="Request Access" />
        </div>
      </div>
    </div>
  );
}
