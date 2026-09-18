export type Highlight = {
  /** The precise, technical one-liner. */
  text: string;
  /** Optional plain-English "what this means" for non-technical readers. */
  plain?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  /** Public URL, if the product has one. Omit for private/beta work. */
  href?: string;
  status: "Live" | "Private beta" | "In development";
  /** One-paragraph summary framed for an engineering audience. */
  summary: string;
  /** 3–5 concrete engineering highlights — what's hard about it. */
  highlights: Highlight[];
  stack: string[];
  /** Marks the hero / lead project. */
  featured?: boolean;
  accent: "blue" | "violet" | "teal" | "amber";
};

export const projects: Project[] = [
  {
    slug: "insightaide",
    name: "InsightAide",
    tagline: "AI-driven investment research & analysis platform",
    category: "AI Platform · Machine Learning",
    href: "https://insightaide.com",
    status: "Private beta",
    featured: true,
    summary:
      "A solo-built platform for quantitative investment research and analysis on .NET 10, structured as a 25-project clean architecture (Foundation → Services → Engines → Presentation). It runs an in-process ML.NET pipeline for signal generation and ranking, with a dual-LLM router that dispatches work across the Claude and OpenAI APIs for automated hypothesis generation. Research and analysis only — no live trading.",
    highlights: [
      {
        text: "Dual-LLM router that dispatches claude-* and gpt-* models across Anthropic and OpenAI, logging per-call token usage and cost to PostgreSQL",
        plain:
          "Automatically picks the right AI model (Claude or OpenAI) for each task and tracks exactly how much every call costs.",
      },
      {
        text: "117-feature ML.NET pipeline with purged K-fold walk-forward validation and time-based embargoes to prevent lookahead bias",
        plain:
          "The model learns from 117 signals and is tested the way it would really run — on future data, with safeguards so it can never accidentally peek at information it wouldn't have had at the time.",
      },
      {
        text: "LambdaRank cross-sectional ranking model, gated on an out-of-sample spread t-stat before a model is saved",
        plain:
          "Ranks stocks best-to-worst each day, and only keeps a model if its top picks statistically beat its bottom picks on data it never trained on.",
      },
      {
        text: "25-project clean architecture on .NET 10, deployed on Railway via Docker with PostgreSQL + pgvector storage",
        plain:
          "Organized into 25 cleanly separated modules so the system stays maintainable and testable as it grows.",
      },
    ],
    stack: [
      ".NET 10",
      "ASP.NET Core",
      "PostgreSQL + pgvector",
      "EF Core",
      "ML.NET / LightGBM",
      "Claude API",
      "OpenAI API",
      "Polygon.io",
      "Railway / Docker",
    ],
    accent: "blue",
  },
  {
    slug: "hunter-metric",
    name: "Hunter Metric",
    tagline: "Applied ML platform for predictive sports analytics",
    category: "Machine Learning · Predictive Modeling",
    status: "Private beta",
    summary:
      "An applied-ML platform that models game outcomes across six professional sports. Each sport has a native win-probability model feeding a shared, Platt-calibrated probability assembler, backed by a multi-family ensemble (logistic regression + LightGBM + ELO) with agreement scoring. Models are evaluated with walk-forward backtesting and promoted through a shadow → active governance pipeline, so none reaches production without proving calibrated skill against real outcomes.",
    highlights: [
      {
        text: "Six native per-sport win-probability models feeding a shared Platt-calibrated probability assembler",
        plain:
          "A dedicated model for each of six sports, all producing probabilities that are corrected so a stated '70% chance' really happens about 70% of the time.",
      },
      {
        text: "Multi-family ensemble (logistic regression + LightGBM + ELO) with correlation-aware agreement scoring and outlier detection",
        plain:
          "Combines three different modeling approaches and measures how much they agree — flagging predictions where they disagree as less trustworthy.",
      },
      {
        text: "Walk-forward backtesting with expanding and rolling folds and strict chronological-leakage invariants",
        plain:
          "Every model is tested only on future games it never saw during training, so its track record reflects how it would actually perform going forward.",
      },
      {
        text: "Shadow → active model governance: models accrue data silently and only graduate after calibration and walk-forward gates pass",
        plain:
          "New models run invisibly on real games first, and only go live once they've proven they're accurate against real outcomes.",
      },
    ],
    stack: [
      ".NET 8",
      "React 19 + TS",
      "PostgreSQL",
      "EF Core",
      "ML.NET / LightGBM",
      "Hangfire",
      "Claude API",
      "Railway / Docker",
    ],
    accent: "violet",
  },
  {
    slug: "bookingaide",
    name: "BookingAide",
    tagline: "Full-stack booking & scheduling platform",
    category: "Full-Stack SaaS",
    href: "https://bookingaide.com",
    status: "Live",
    summary:
      "A full-stack booking and scheduling SaaS — an ASP.NET Core 8 API behind a Next.js 16 / React front end. It handles appointments, rentals, and events with Stripe payments, automated email (Resend) and SMS (Twilio) reminders, and multi-staff, multi-location availability, with double-booking prevented at the database level.",
    highlights: [
      {
        text: "Database-level double-booking prevention via a PostgreSQL EXCLUDE constraint over time ranges — no app-level locking",
        plain:
          "The database itself makes it impossible to book the same resource for two overlapping times, so double-bookings can't slip through even under heavy traffic.",
      },
      {
        text: "Idempotent Stripe payment handling keyed on payment-intent IDs to survive webhook redelivery without double-charging",
        plain:
          "If Stripe sends the same payment notification twice, the system recognizes it and never charges a customer twice.",
      },
      {
        text: "Tiered availability engine: staff hours and blackout dates override business defaults, with location-aware conflict detection",
        plain:
          "Open time slots respect each staff member's hours, days off, and location, so customers only ever see genuinely bookable times.",
      },
      {
        text: "Automated email + SMS reminder pipeline driven by a background worker with per-send idempotency markers",
        plain:
          "Automatically sends appointment reminders by email and text, tracking each send so no one gets duplicate messages.",
      },
    ],
    stack: [
      "ASP.NET Core 8",
      "Next.js 16",
      "React 19 + TS",
      "PostgreSQL",
      "EF Core",
      "Stripe",
      "Resend",
      "Twilio",
      "Railway / Vercel",
    ],
    accent: "teal",
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
