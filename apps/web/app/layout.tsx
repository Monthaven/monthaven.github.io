import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://monthaven.capital"),
  title: {
    default: "Monthaven — Capital Advisory & Deal-Intelligence",
    template: "%s | Monthaven",
  },
  description:
    "Monthaven is a capital advisory and deal-intelligence partner focused on mandate-driven sourcing, institutional underwriting, and confidential execution.",
  openGraph: {
    title: "Monthaven — Capital Advisory & Deal-Intelligence",
    description:
      "Monthaven is a capital advisory and deal-intelligence partner focused on mandate-driven sourcing, institutional underwriting, and confidential execution.",
    type: "website",
    url: "https://monthaven.capital",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-mh-cream">
      <body className="min-h-screen font-sans text-mh-charcoal">
        <Header />
        <main className="min-h-[60vh] bg-mh-cream">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
