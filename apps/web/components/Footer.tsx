import Link from "next/link";
import Disclosure from "@/components/Disclosure";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--mh-sage)] bg-[var(--mh-cream100)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-[var(--mh-charcoal)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-[var(--mh-charcoal-900)]">Monthaven Capital Group</p>
            <p>Confidential advisory for real assets. Mandate-driven sourcing and execution.</p>
            <p className="text-xs text-[var(--mh-sage700)]">Nashville, TN · 214 Elm Street, Suite 500</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/accessibility">Accessibility</Link>
            <Link href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </Link>
            <Link href="mailto:info@monthaven.capital">info@monthaven.capital</Link>
            <Link href="mailto:mandates@monthaven.capital">mandates@monthaven.capital</Link>
            <Link href="/client-login">Client Login</Link>
          </div>
        </div>
        <Disclosure>
          Informational only; not investment advice or an offer; confidential opportunities to qualified clients under NDA; securities or placement activities, if any, conducted via a registered broker-dealer or exempt adviser.
        </Disclosure>
        <p className="text-xs text-[var(--mh-sage700)]">© {year} Monthaven Capital Group. All rights reserved.</p>
      </div>
    </footer>
  );
}
