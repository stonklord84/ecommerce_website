import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders Markdown written in Supabase. Raw HTML in the text is shown as plain text and
// never executed, so content from the database can't inject scripts or break the layout.
export default function Markdown({ children, components }: { children: string; components?: Components }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: MarkdownLink, ...components }}>
      {children}
    </ReactMarkdown>
  );
}

function MarkdownLink({ href = "", children }: { href?: string; children?: ReactNode }) {
  const className = "border-b border-gold text-ink transition duration-300 ease-silk hover:text-gold";
  // Internal links ("/products/…") navigate client-side; external ones open in a new tab.
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
