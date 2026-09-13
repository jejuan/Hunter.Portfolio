# Hunter.Portfolio

Personal portfolio site for **Jay Hunter** — software engineer specializing in AI and
machine-learning platforms built with **agentic development**.

Live at **[hunterapplications.com](https://hunterapplications.com)**.

## About this site

A single-page showcase of production systems I've architected and shipped solo. It
leads with the engineering — clean architecture, ML pipelines, model governance, and
end-to-end automation — and with the way I work: directing AI agents across planning,
implementation, review, and verification rather than treating them as autocomplete.

Featured work:

- **InsightAide** — AI-driven investment research & analysis platform (.NET 10, 24-project clean architecture, ML pipeline + LLM reasoning).
- **Hunter Metric** — applied ML platform for predictive sports analytics (six native per-sport models, calibration, shadow → active governance).
- **BookingAide** — full-stack booking & scheduling platform.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Deployed on Vercel

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Project content lives in [`src/lib/projects.ts`](src/lib/projects.ts) — edit that file
to update the showcased work.

## Built with agentic development

This site — like the products it showcases — was designed and built through agentic
development: AI agents orchestrated across the full lifecycle, with a human architect
directing the design and verifying the output.
