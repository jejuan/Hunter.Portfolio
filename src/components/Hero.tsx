import Link from "next/link";

const stats = [
  { value: "6", label: "production platforms" },
  { value: ".NET 10", label: "primary stack" },
  { value: "Solo", label: "architect & builder" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--accent-glow)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32">
        <div className="hero-in inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          AI &amp; Machine Learning · Full-Stack · Agentic Development
        </div>

        <h1
          className="hero-in mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          <span className="text-gradient">Jay Hunter</span>
          <span className="block text-foreground">
            I architect and ship real systems — solo, with agentic development.
          </span>
        </h1>

        <p
          className="hero-in mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={{ animationDelay: "160ms" }}
        >
          Software engineer specializing in AI and machine-learning platforms. I use
          agentic AI development to design, build, and operate production systems
          end-to-end — from clean-architecture backends to ML pipelines and full-stack
          products.
        </p>

        <div
          className="hero-in mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="#work"
            className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5"
          >
            View my work
          </Link>
          <Link
            href="#approach"
            className="rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            How I build
          </Link>
        </div>

        <dl
          className="hero-in mt-14 grid max-w-lg grid-cols-3 gap-6"
          style={{ animationDelay: "320ms" }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-2xl font-semibold text-foreground">{s.value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-muted-2">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
