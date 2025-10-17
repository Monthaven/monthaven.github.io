import CalloutStrip from "@/components/CalloutStrip";

export default function ClientLoginPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-3xl space-y-8 px-6 text-center">
        <h1 className="text-4xl font-semibold text-mh-charcoal900">Client Login</h1>
        <p className="text-lg text-mh-charcoal">
          Access your confidential mandate workspace, diligence trackers, and analytics via the secure portal. Please refer to your onboarding email for credentials.
        </p>
        <CalloutStrip>
          For support, contact mandates@monthaven.capital. Access is limited to clients with active NCNDAs.
        </CalloutStrip>
      </div>
    </div>
  );
}
