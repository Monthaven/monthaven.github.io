"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import CTA from "@/components/CTA";

const navItems = [
  { href: "/", label: "About" },
  { href: "/why", label: "Why Monthaven" },
  { href: "/services", label: "Services" },
  { href: "/how", label: "How We Work" },
  { href: "/intel", label: "Intel" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--mh-sage)] bg-[var(--mh-cream100)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-[var(--mh-charcoal-900)]">
          Monthaven Capital
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--mh-charcoal-900)] lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "transition hover:text-[var(--mh-accent)]",
                pathname === item.href && "text-[var(--mh-accent)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <CTA href="/contact" label="Speak with the Team" variant="secondary" />
          <CTA href="/request-access" label="Request Access" />
          <Link
            href="/client-login"
            className="text-sm font-medium text-[var(--mh-charcoal-900)] hover:text-[var(--mh-accent)]"
          >
            Client Login
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[var(--mh-sage)] p-2 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="h-5 w-5">
            <span className="block h-[2px] w-full bg-[var(--mh-charcoal-900)]"></span>
            <span className="mt-[5px] block h-[2px] w-full bg-[var(--mh-charcoal-900)]"></span>
            <span className="mt-[5px] block h-[2px] w-full bg-[var(--mh-charcoal-900)]"></span>
          </span>
        </button>
      </div>
      {open && (
        <div className="border-t border-[var(--mh-sage)] bg-[var(--mh-cream100)] px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-[var(--mh-charcoal-900)]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/request-access" onClick={() => setOpen(false)}>
              Request Access
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Speak with the Team
            </Link>
            <Link href="/client-login" onClick={() => setOpen(false)}>
              Client Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
