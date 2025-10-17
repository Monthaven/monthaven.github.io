import type { ComponentType } from "react";
import MarketSignals from "@/content/market-signals-q1.mdx";
import DispositionCase from "@/content/discreet-disposition-case.mdx";
import PortfolioLift from "@/content/portfolio-intelligence-brief.mdx";

export type IntelEntry = {
  slug: string;
  title: string;
  date: string;
  abstract: string;
  category: "Market Note" | "Case Study";
  component: ComponentType;
};

export const intelEntries: IntelEntry[] = [
  {
    slug: "market-signals-q1",
    title: "Q1 2024 Real Asset Market Signals",
    date: "March 2024",
    abstract:
      "Select institutional buyers are reallocating to income-resilient real assets; Monthaven tracks price discipline across our mandate lanes.",
    category: "Market Note",
    component: MarketSignals,
  },
  {
    slug: "discreet-disposition-case",
    title: "Discreet Disposition for a Sunbelt Logistics Portfolio",
    date: "February 2024",
    abstract: "Mandate-driven process delivered three vetted buyers and a 34-day diligence window under NCNDA.",
    category: "Case Study",
    component: DispositionCase,
  },
  {
    slug: "portfolio-intelligence-brief",
    title: "Portfolio Intelligence: Stabilized Housing Platform",
    date: "January 2024",
    abstract: "Integrated underwriting support helped an operator reforecast NOI and secure recapitalization pathways.",
    category: "Case Study",
    component: PortfolioLift,
  },
];
