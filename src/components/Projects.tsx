import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-sm text-accent">Selected work</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Production systems, built end-to-end
        </h2>
        <p className="mt-4 text-muted">
          Each of these is a real, working platform I designed, built, and operate —
          spanning AI, machine learning, automation, and full-stack product work.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 90} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
