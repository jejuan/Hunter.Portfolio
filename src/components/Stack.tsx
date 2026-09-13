import Reveal from "./Reveal";

const groups = [
  {
    label: "Languages & Frameworks",
    items: ["C# / .NET 10", "TypeScript", "React", "Next.js", "Node.js", "ASP.NET"],
  },
  {
    label: "AI & LLM APIs",
    items: [
      "Anthropic Claude API",
      "OpenAI API",
      "Agentic orchestration",
      "RAG & embeddings",
    ],
  },
  {
    label: "Deployment & Pipelines",
    items: ["Vercel", "Railway", "GitHub Actions", "Docker"],
  },
  {
    label: "Data & Storage",
    items: ["PostgreSQL", "pgvector", "EF Core", "Hangfire"],
  },
  {
    label: "Integrations & Services",
    items: [
      "Stripe — payments",
      "Resend — transactional email",
      "Twilio — SMS",
      "Polygon.io — market data",
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-sm text-accent">Stack &amp; integrations</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          The tools I ship and operate with
        </h2>
        <p className="mt-4 text-muted">
          End-to-end delivery: I don&apos;t just write the code — I wire up the
          deployment pipelines, payment and email integrations, and data layer that make
          a system production-ready.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal
            key={g.label}
            delay={i * 70}
            className="h-full rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-2">
              {g.label}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-surface-2 px-2.5 py-1.5 font-mono text-xs text-foreground/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
