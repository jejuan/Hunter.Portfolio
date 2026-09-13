"use client";

import { useState } from "react";
import type { Highlight } from "@/lib/projects";

function HighlightRow({ item }: { item: Highlight }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex gap-2 text-sm text-foreground/90">
      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
      <div className="min-w-0">
        <span>{item.text}</span>
        {item.plain && (
          <div className="mt-1">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="inline-flex items-center gap-1 text-xs font-medium text-accent/90 transition-colors hover:text-accent"
            >
              <span
                className={`transition-transform ${open ? "rotate-90" : ""}`}
                aria-hidden
              >
                ›
              </span>
              What this means
            </button>
            {open && (
              <p className="mt-1.5 rounded-md border-l-2 border-accent/40 bg-surface-2 px-3 py-2 text-xs leading-relaxed text-muted">
                {item.plain}
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default function Highlights({ items }: { items: Highlight[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <HighlightRow key={item.text} item={item} />
      ))}
    </ul>
  );
}
