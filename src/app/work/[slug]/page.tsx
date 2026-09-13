import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CodeBlock from "@/components/CodeBlock";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { projects } from "@/lib/projects";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.intro.slice(0, 155),
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const project = projects.find((p) => p.slug === slug);
  if (!study || !project) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <span aria-hidden>←</span> All work
          </Link>

          <header className="mt-6">
            <p className="font-mono text-sm text-accent">{project.category}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-3 text-lg text-muted">{project.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">The problem</h2>
            <p className="mt-3 leading-relaxed text-muted">{study.intro}</p>
            <ul className="mt-5 space-y-2">
              {study.challenges.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-foreground/90">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight">Architecture</h2>
            <p className="mt-3 leading-relaxed text-muted">
              {study.architecture.description}
            </p>
            <div className="mt-6">
              <ArchitectureDiagram
                layers={study.architecture.layers}
                caption={study.architecture.caption}
              />
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight">Engineering in depth</h2>
            <p className="mt-3 text-sm text-muted-2">{study.codeNote}</p>
            <div className="mt-6 space-y-8">
              {study.snippets.map((snippet, i) => (
                <CodeBlock key={i} snippet={snippet} />
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight">Key decisions</h2>
            <div className="mt-6 space-y-4">
              {study.decisions.map((d) => (
                <div
                  key={d.title}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="font-semibold tracking-tight text-foreground">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <Link
              href="/#work"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              ← Back to all work
            </Link>
            <a
              href="mailto:jayhuntersr@gmail.com"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>
        </article>
      </main>
    </>
  );
}
