import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#top" className="group flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-accent/15 font-mono text-sm text-accent ring-1 ring-accent/30">
            JH
          </span>
          <span className="text-foreground">Jay Hunter</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <a
            href="mailto:jayhuntersr@gmail.com"
            className="rounded-md bg-accent/15 px-3 py-2 text-sm font-medium text-accent ring-1 ring-accent/30 transition-colors hover:bg-accent/25"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
