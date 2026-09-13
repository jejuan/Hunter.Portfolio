import Reveal from "./Reveal";

export default function Contact() {
  return (
    <footer id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-surface p-10 text-center sm:p-14">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "var(--accent-glow)" }}
          />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s build something.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              I architect and ship real systems end-to-end — from clean-architecture
              backends to ML pipelines and full-stack products. If you&apos;d like to talk
              shop or work together, reach out.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:jayhuntersr@gmail.com"
                className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5"
              >
                jayhuntersr@gmail.com
              </a>
            </div>
          </div>
        </Reveal>

        <p className="mt-10 text-center text-sm text-muted-2">
          © {2026} Jay Hunter · Built solo with agentic development · Next.js &amp; React
        </p>
      </div>
    </footer>
  );
}
