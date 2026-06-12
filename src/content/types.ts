export type Service = {
  slug: string;
  title: string;
  summary: string; // card text (~1 sentence)
  problem: string; // detail page: the situation
  whatWeDo: string[]; // detail page: paragraphs
  deliverables: string[];
  caseStudySlug?: string;
};

export type CaseStudy = {
  slug: string;
  client: string; // anonymized descriptor
  problem: string;
  solution: string;
  outcome: string; // measurable result, short
};

export type ProcessStep = {
  title: string;
  description: string;
};
