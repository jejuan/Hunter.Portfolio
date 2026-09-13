import Reveal from "./Reveal";

const pillars = [
  {
    title: "Architect first",
    body: "I lead with system design — clean/hexagonal architecture, clear domain boundaries, and testable seams. Agents write more code faster, so the design discipline is what keeps it maintainable.",
  },
  {
    title: "Orchestrate, don't just prompt",
    body: "I direct fleets of AI agents across planning, implementation, review, and verification — decomposing work, running parallel tracks, and adversarially checking output before it lands.",
  },
  {
    title: "Ship and operate",
    body: "These aren't demos. They're deployed platforms with real data, ML pipelines, publishing loops, and governance — built, monitored, and iterated by one person.",
  },
  {
    title: "Verify relentlessly",
    body: "Walk-forward evaluation, shadow deployments, calibration checks, and code review gates. Speed only matters if the result is correct — so correctness is engineered in, not hoped for.",
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      className="scroll-mt-20 border-y border-border bg-surface/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-sm text-accent">How I build</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Agentic development, done like an engineer
          </h2>
          <p className="mt-4 text-muted">
            Agentic development means using AI agents as a force multiplier across the
            whole lifecycle — not as an autocomplete. The hard part isn&apos;t generating
            code; it&apos;s designing the system, orchestrating the agents, and verifying
            the output. That&apos;s where I focus, and it&apos;s how one person ships work
            that normally takes a team.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className="h-full rounded-xl border border-border bg-surface p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 font-mono text-sm text-accent ring-1 ring-accent/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
