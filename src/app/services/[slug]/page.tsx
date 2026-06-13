import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { services, getService } from "@/content/services";
import { getCaseStudy } from "@/content/case-studies";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) {
    notFound();
  }
  const caseStudy = service.caseStudySlug
    ? getCaseStudy(service.caseStudySlug)
    : undefined;

  return (
    <>
      <article className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <h1 className="font-display text-4xl sm:text-5xl">
                {service.title}
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="text-ember mt-12 text-sm font-medium tracking-widest uppercase">
                Sound familiar?
              </h2>
              <p className="text-ash mt-3 text-lg">{service.problem}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <h2 className="text-ember mt-10 text-sm font-medium tracking-widest uppercase">
                What we do
              </h2>
              {service.whatWeDo.map((p) => (
                <p key={p} className="mt-3">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.24}>
              <h2 className="text-ember mt-10 text-sm font-medium tracking-widest uppercase">
                What you get
              </h2>
              <ul className="mt-3 space-y-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden className="text-ember">
                      —
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>

            {caseStudy ? (
              <Reveal delay={0.32}>
                <aside className="bg-iron mt-12 rounded-2xl p-7">
                  <p className="text-ash text-sm font-medium tracking-widest uppercase">
                    {caseStudy.client}
                  </p>
                  <p className="mt-3 text-sm">{caseStudy.solution}</p>
                  <p className="font-display text-ember mt-3 text-lg">
                    {caseStudy.outcome}
                  </p>
                </aside>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </article>
      <CtaBand />
    </>
  );
}
