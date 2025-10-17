import Link from "next/link";
import clsx from "clsx";

type CTAProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export default function CTA({ href, label, variant = "primary" }: CTAProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-medium transition",
    {
      "bg-[var(--mh-accent)] text-[var(--mh-cream)] shadow-[var(--mh-shadow-soft)] hover:opacity-90": variant === "primary",
      "border border-[var(--mh-sage)] bg-[var(--mh-cream)] text-[var(--mh-charcoal-900)] hover:border-[var(--mh-accent)]":
        variant === "secondary",
    }
  );

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
