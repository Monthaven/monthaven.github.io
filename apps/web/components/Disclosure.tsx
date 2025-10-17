import { ReactNode } from "react";

export default function Disclosure({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs text-[var(--mh-sage700)]">{children}</p>
  );
}
