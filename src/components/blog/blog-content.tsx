import type { ContentBlock } from "@/types/blog";
import type { TocItem } from "./blog-toc";

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ?? "https://admin.operis.vn";

function resolveImage(src: string): string {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${API_ORIGIN}/${src.replace(/^\//, "")}`;
}

/** Minimal inline markdown + strip [LINK-BAI-N] placeholders */
function parseInline(text: string): string {
  return text
    // Strip internal link placeholders [text][LINK-...] → text
    .replace(/\[([^\]]+)\]\[LINK-[^\]]*\]/g, "$1")
    // **bold** / *bold*
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
    // _italic_
    .replace(/_(.*?)_/g, "<em>$1</em>")
    // [text](url) real links
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
}

/* ------------------------------------------------------------------ */
/*  Extract TOC items from blocks                                      */
/* ------------------------------------------------------------------ */

export function extractTocFromBlocks(blocks: ContentBlock[]): {
  tocItems: TocItem[];
  idMap: Record<string, string>;
} {
  const tocItems: TocItem[] = [];
  const idMap: Record<string, string> = {};
  let counter = 0;

  blocks.forEach((block, i) => {
    const lvl = block.type === "h1" ? 2 : block.type === "h2" ? 2 : block.type === "h3" ? 3 : block.type === "h4" ? 4 : 0;
    if (lvl === 0) return;
    const id = `section-${counter++}`;
    idMap[String(i)] = id;
    tocItems.push({ id, text: block.content, level: lvl });
  });

  return { tocItems, idMap };
}

/* ------------------------------------------------------------------ */
/*  Block components                                                   */
/* ------------------------------------------------------------------ */

function BlockHeading({ level, id, children }: { level: 1 | 2 | 3 | 4; id?: string; children: string }) {
  const Tag = (level === 1 ? "h2" : `h${level}`) as "h2" | "h3" | "h4";
  const cls: Record<string, string> = {
    h2: "text-[1.6rem] font-black tracking-tight text-foreground mt-8 mb-4 pb-3 border-b-2 border-primary/25 scroll-mt-24",
    h3: "text-xl font-bold tracking-tight text-foreground mt-6 mb-3 scroll-mt-24",
    h4: "text-base font-bold text-foreground mt-4 mb-2 scroll-mt-24",
  };
  return <Tag id={id} className={cls[Tag]}>{children}</Tag>;
}

function BlockParagraph({ text }: { text: string }) {
  return (
    <p
      className="leading-[1.9] text-foreground/80 my-4"
      dangerouslySetInnerHTML={{ __html: parseInline(text) }}
    />
  );
}

function BlockImage({ src, alt }: { src: string; alt?: string }) {
  const resolved = resolveImage(src);
  if (!resolved) return null;
  return (
    <figure className="mt-8 mb-6 rounded-2xl overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={resolved} alt={alt ?? ""} className="w-full rounded-2xl shadow-md object-cover" loading="lazy" />
      {alt && (
        <figcaption className="text-center text-xs text-muted-foreground mt-3 italic leading-relaxed">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

function BlockList({ ordered, content }: { ordered: boolean; content: string }) {
  const items = content.split("\n").map((s) => s.trim()).filter(Boolean);
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`my-5 pl-6 space-y-1.5 ${ordered ? "list-decimal" : "list-disc"}`}>
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed text-foreground/80" dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
      ))}
    </Tag>
  );
}

function BlockTable({ content }: { content: string }) {
  let header: string[] = [];
  let rows: string[][] = [];

  try {
    const parsed = JSON.parse(content) as { header?: string[]; rows?: string[][] };
    header = parsed.header ?? [];
    rows = parsed.rows ?? [];
  } catch {
    // not JSON — try treating as pipe-delimited plain text
    const lines = content.trim().split("\n").filter((l) => l.trim() && !l.match(/^[\s|:-]+$/));
    if (lines.length > 0) {
      header = lines[0].split("|").map((s) => s.trim()).filter(Boolean);
      rows = lines.slice(1).map((l) => l.split("|").map((s) => s.trim()).filter(Boolean));
    }
  }

  if (header.length === 0 && rows.length === 0) return null;

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border/50">
      <table className="w-full text-sm">
        {header.length > 0 && (
          <thead className="bg-muted/50">
            <tr>
              {header.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold text-foreground border-b border-border/50">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/30 last:border-0 even:bg-muted/20">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-foreground/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: parseInline(cell) }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockQuote({ text }: { text: string }) {
  return (
    <blockquote className="border-l-4 border-primary/40 bg-primary/4 rounded-r-lg py-3 px-5 my-5 text-foreground/70">
      <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: parseInline(text) }} />
    </blockquote>
  );
}

function BlockCode({ content }: { content: string }) {
  return (
    <pre className="bg-muted/60 border border-border/50 rounded-xl p-4 overflow-x-auto my-5">
      <code className="text-sm text-foreground/80 font-mono whitespace-pre">{content}</code>
    </pre>
  );
}

/* ------------------------------------------------------------------ */
/*  Main renderer                                                      */
/* ------------------------------------------------------------------ */

interface BlogContentProps {
  blocks: ContentBlock[];
  idMap?: Record<string, string>;
}

export function BlogContent({ blocks, idMap = {} }: BlogContentProps) {
  return (
    <div>
      {blocks.map((block, i) => {
        const id = idMap[String(i)];

        switch (block.type) {
          case "h1": return <BlockHeading key={block.id} level={1} id={id}>{block.content}</BlockHeading>;
          case "h2": return <BlockHeading key={block.id} level={2} id={id}>{block.content}</BlockHeading>;
          case "h3": return <BlockHeading key={block.id} level={3} id={id}>{block.content}</BlockHeading>;
          case "h4": return <BlockHeading key={block.id} level={4} id={id}>{block.content}</BlockHeading>;
          case "p":  return <BlockParagraph key={block.id} text={block.content} />;
          case "img": return <BlockImage key={block.id} src={block.content} alt={block.alt} />;
          case "ul": return <BlockList key={block.id} ordered={false} content={block.content} />;
          case "ol": return <BlockList key={block.id} ordered={true} content={block.content} />;
          case "table": return <BlockTable key={block.id} content={block.content} />;
          case "blockquote": return <BlockQuote key={block.id} text={block.content} />;
          case "code": return <BlockCode key={block.id} content={block.content} />;
          case "hr": return <hr key={block.id} className="my-8 border-border/40" />;
          default:
            return block.content ? <BlockParagraph key={block.id} text={block.content} /> : null;
        }
      })}
    </div>
  );
}
