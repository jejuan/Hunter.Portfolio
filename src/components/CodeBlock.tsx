import { codeToHtml } from "shiki";

export type CodeSnippet = {
  /** Optional file name / label shown in the title bar. */
  filename?: string;
  language: string;
  code: string;
  /** One-line explanation of what the snippet demonstrates. */
  note?: string;
};

export default async function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const html = await codeToHtml(snippet.code.trim(), {
    lang: snippet.language,
    theme: "github-dark-default",
  });

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-[#0d1117]">
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {snippet.filename && (
          <span className="ml-2 font-mono text-xs text-muted">{snippet.filename}</span>
        )}
      </div>
      <div
        className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {snippet.note && (
        <figcaption className="border-t border-border/70 px-4 py-3 text-xs leading-relaxed text-muted">
          {snippet.note}
        </figcaption>
      )}
    </figure>
  );
}
