import type { CaseStudy } from "./types";

// DRAFT CONTENT: realistic anonymized placeholders.
// Replace problem/solution/outcome with real project details before launch.
export const caseStudies = [
  {
    slug: "logistics-dispatch",
    client: "A regional logistics company",
    problem:
      "Deliveries tracked across three spreadsheets and a whiteboard; dispatch errors were costing client relationships.",
    solution:
      "A dispatch and delivery-tracking app the whole team uses from one screen, with driver updates from their phones.",
    outcome: "Dispatch errors down 60% in the first quarter.",
  },
  {
    slug: "clinic-booking",
    client: "A healthcare clinic network",
    problem:
      "Phone-only appointment booking meant lost bookings after hours and a front desk drowning in calls.",
    solution:
      "An online booking platform with automated reminders, integrated with their existing patient records.",
    outcome:
      "No-shows down 35%; a third of bookings now happen outside office hours.",
  },
  {
    slug: "retail-inventory",
    client: "A specialty retail business",
    problem:
      "Manual stock counts and gut-feel reordering led to stockouts of bestsellers and cash tied up in slow movers.",
    solution:
      "Inventory automation with AI-assisted demand forecasting, plugged into their point of sale.",
    outcome:
      "Stockouts down 40%; reordering now takes one hour a week instead of a day.",
  },
] as const satisfies readonly CaseStudy[];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  const list: readonly CaseStudy[] = caseStudies;
  return list.find((c) => c.slug === slug);
}
