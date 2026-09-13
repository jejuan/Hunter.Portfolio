import Link from "next/link";
import type { Project } from "@/lib/projects";
import { getCaseStudy } from "@/lib/caseStudies";
import Highlights from "./Highlights";

const accentRing: Record<Project["accent"], string> = {
  blue: "before:bg-[#5b8cff]",
  violet: "before:bg-[#8b5cf6]",
  teal: "before:bg-[#2dd4bf]",
  amber: "before:bg-[#f5a524]",
};

const statusStyle: Record<Project["status"], string> = {
  Live: "text-emerald-300 bg-emerald-400/10 ring-emerald-400/20",
  "Private beta": "text-violet-300 bg-violet-400/10 ring-violet-400/20",
  "In development": "text-sky-300 bg-sky-400/10 ring-sky-400/20",
};

export default function ProjectCard({ project }: { project: Project }) {
  const domain = project.href?.replace("https://", "");
  const hasCaseStudy = Boolean(getCaseStudy(project.slug));

  return (
    <div
      className={`card-hover group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface p-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:opacity-70 ${accentRing[project.accent]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>
          <p className="mt-0.5 text-sm text-muted">{project.tagline}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusStyle[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-2">
        {project.category}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

      <Highlights items={project.highlights} />

      <div className="mt-6 flex flex-wrap gap-2 pt-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {(hasCaseStudy || project.href) && (
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {hasCaseStudy && (
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
            >
              Read case study
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          )}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Visit {domain}
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
