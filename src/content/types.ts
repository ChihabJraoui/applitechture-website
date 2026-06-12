export type CaseStudySlug =
  | "logistics-dispatch"
  | "clinic-booking"
  | "retail-inventory";

export type Service = {
  slug: string;
  title: string;
  summary: string; // card text (~1 sentence)
  problem: string; // detail page: the situation
  whatWeDo: string[]; // detail page: paragraphs
  deliverables: string[];
  caseStudySlug?: CaseStudySlug;
};

export type CaseStudy = {
  slug: CaseStudySlug;
  client: string; // anonymized descriptor
  problem: string;
  solution: string;
  outcome: string; // measurable result, short
};

export type ProcessStep = {
  title: string;
  description: string;
};
