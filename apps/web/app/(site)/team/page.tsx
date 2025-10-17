import Box from "@/components/Box";
import CalloutStrip from "@/components/CalloutStrip";

const principals = [
  {
    name: "Avery Holt",
    role: "Managing Partner",
    prior: "Former Head of Real Assets Coverage, Crestline Partners",
    boards: "Board observer, Sunbelt Logistics REIT",
    education: "MBA, Wharton School; BBA, Vanderbilt University",
  },
  {
    name: "Jordan Blake",
    role: "Partner, Capital Advisory",
    prior: "Prior roles at Brookfield and Goldman Sachs Real Estate Principal Investment Area",
    boards: "Advisory Council, Urban Infill Housing Coalition",
    education: "BS, University of Virginia",
  },
  {
    name: "Morgan Reyes",
    role: "Partner, Intelligence & Diligence",
    prior: "Led Portfolio Intelligence at Blackstone Real Estate Income Strategies",
    boards: "Investment Committee, Community Workforce Housing Fund",
    education: "MS Finance, Georgetown University; BA, Rice University",
  },
];

const advisors = [
  {
    name: "Priya Chauhan",
    role: "Senior Advisor",
    prior: "Former CIO, Meridian Healthcare Properties",
    focus: "Healthcare real assets, operator partnerships",
  },
  {
    name: "Liam Prescott",
    role: "Senior Advisor",
    prior: "Ex-Managing Director, Fortress Investment Group",
    focus: "Credit strategies and complex capital stacks",
  },
];

export default function TeamPage() {
  return (
    <div className="bg-mh-cream py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-wide text-mh-accent">Team</p>
          <h1 className="text-4xl font-semibold text-mh-charcoal900">Advisors with principal investing depth</h1>
          <p className="text-lg text-mh-charcoal">
            Monthaven&apos;s partners bring institutional investing, capital markets, and intelligence experience to every mandate. Advisors extend sector expertise and governance support.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {principals.map((person) => (
            <Box key={person.name} title={person.name} eyebrow={person.role}>
              <div className="space-y-3 text-sm">
                <p className="text-mh-charcoal"><span className="font-semibold text-mh-charcoal900">Prior:</span> {person.prior}</p>
                <p className="text-mh-charcoal"><span className="font-semibold text-mh-charcoal900">Boards:</span> {person.boards}</p>
                <p className="text-mh-charcoal"><span className="font-semibold text-mh-charcoal900">Education:</span> {person.education}</p>
              </div>
            </Box>
          ))}
        </div>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-mh-charcoal900">Advisors</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {advisors.map((advisor) => (
              <Box key={advisor.name} title={advisor.name} eyebrow={advisor.role}>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold text-mh-charcoal900">Prior:</span> {advisor.prior}</p>
                  <p><span className="font-semibold text-mh-charcoal900">Focus:</span> {advisor.focus}</p>
                </div>
              </Box>
            ))}
          </div>
        </section>
        <CalloutStrip>
          Additional team bios, references, and detailed track records are available to qualified clients under NDA.
        </CalloutStrip>
      </div>
    </div>
  );
}
