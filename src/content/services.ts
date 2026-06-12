import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "custom-apps",
    title: "Custom Web & Mobile Apps",
    summary:
      "The app your business actually needs — designed, built, and shipped end to end.",
    problem:
      "Off-the-shelf tools almost fit, spreadsheets are doing jobs they were never meant to do, and your team works around the software instead of with it.",
    whatWeDo: [
      "We start with how your business runs today, then design and build a web or mobile app around it — not the other way round.",
      "You see working software every week. Scope is fixed in writing before we start, and we ship something usable early so value lands before the final release.",
    ],
    deliverables: [
      "A production web or mobile app, deployed and documented",
      "Clean, tested code you own outright",
      "Training for your team and a handover you can build on",
    ],
    caseStudySlug: "logistics-dispatch",
  },
  {
    slug: "product-design",
    title: "Product & UX Design",
    summary:
      "Interfaces your customers understand on first use — prototyped and validated before a line of code.",
    problem:
      "You have the idea (or the app) but users get lost, drop off, or need hand-holding. Or you need a credible prototype before committing a dev budget.",
    whatWeDo: [
      "We map the user journeys that matter, design the screens around them, and put a clickable prototype in real users' hands before anything is built.",
      "If you already have a product, we audit where users struggle and redesign the flows that cost you customers.",
    ],
    deliverables: [
      "Clickable prototype tested with real users",
      "Full UI design system, ready for any dev team",
      "A prioritized list of UX fixes with expected impact",
    ],
    caseStudySlug: "clinic-booking",
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    summary:
      "Hand the repetitive work to software — from document processing to AI features inside your product.",
    problem:
      "Your team spends hours on work a machine should do: re-typing documents, triaging emails, answering the same questions, moving data between tools.",
    whatWeDo: [
      "We find the tasks where automation pays for itself fastest, then build it — workflow automation, document extraction, AI assistants trained on your business.",
      "We're honest about what AI can't do reliably yet. If a simple script beats a model, you get the script.",
    ],
    deliverables: [
      "Working automations integrated with your existing tools",
      "AI features with measurable accuracy, not demos",
      "A clear account of hours saved per week",
    ],
    caseStudySlug: "retail-inventory",
  },
  {
    slug: "strategy-consulting",
    title: "Digital Strategy & Consulting",
    summary:
      "Know what to build before you spend — a concrete technical roadmap, not a slide deck.",
    problem:
      "Something's holding the business back and software is probably the answer — but you don't know what to build, what it should cost, or who to trust.",
    whatWeDo: [
      "We spend focused time inside your operation, find where software moves the numbers, and give you a concrete plan: what to build, in what order, at what cost.",
      "The plan is yours. Build it with us, with someone else, or in-house — it's written to be executed, not to sell you a project.",
    ],
    deliverables: [
      "A technical roadmap with priorities, costs, and timelines",
      "Vendor-neutral build/buy recommendations",
      "A scoped first project you can start immediately",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
