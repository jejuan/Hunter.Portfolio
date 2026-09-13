import type { ArchLayer } from "@/lib/caseStudies";

const tints = [
  "border-[#5b8cff]/40 bg-[#5b8cff]/[0.07]",
  "border-[#8b5cf6]/40 bg-[#8b5cf6]/[0.07]",
  "border-[#2dd4bf]/40 bg-[#2dd4bf]/[0.07]",
  "border-[#f5a524]/40 bg-[#f5a524]/[0.07]",
];

export default function ArchitectureDiagram({
  layers,
  caption = "Dependencies point downward — inner layers never depend on outer ones.",
}: {
  layers: ArchLayer[];
  caption?: string;
}) {
  return (
    <div className="space-y-3">
      {layers.map((layer, i) => (
        <div key={layer.name}>
          <div
            className={`rounded-xl border p-4 ${tints[i % tints.length]}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h4 className="font-semibold tracking-tight text-foreground">
                {layer.name}
              </h4>
              <span className="text-xs uppercase tracking-wide text-muted-2">
                {layer.blurb}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-foreground/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          {i < layers.length - 1 && (
            <div className="flex justify-center py-1" aria-hidden>
              <span className="text-muted-2">↓</span>
            </div>
          )}
        </div>
      ))}
      <p className="pt-1 text-center text-xs text-muted-2">{caption}</p>
    </div>
  );
}
