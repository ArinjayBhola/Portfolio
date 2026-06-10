"use client";

import React from "react";

/**
 * A tiny, dependency-free Markdown renderer tuned for short chat replies.
 * Supports: **bold**, *italic*, `inline code`, [links](url),
 * bullet lists (-, *), numbered lists, and paragraph/line breaks.
 */

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Tokenize bold, italic, inline code, and links.
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const key = `${keyPrefix}-${i++}`;
    if (match[2] !== undefined) {
      nodes.push(<strong key={key} className="font-semibold">{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      nodes.push(<em key={key}>{match[3]}</em>);
    } else if (match[4] !== undefined) {
      nodes.push(
        <code key={key} className="px-1.5 py-0.5 rounded-md bg-secondary/70 text-[0.8em] font-mono">
          {match[4]}
        </code>
      );
    } else if (match[5] !== undefined && match[6] !== undefined) {
      nodes.push(
        <a
          key={key}
          href={match[6]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          {match[5]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export default function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuffer: { ordered: boolean; items: string[] } | null = null;

  const flushList = (key: string) => {
    if (!listBuffer) return;
    const { ordered, items } = listBuffer;
    const ListTag = ordered ? "ol" : "ul";
    blocks.push(
      <ListTag
        key={key}
        className={`my-1 space-y-1 ${ordered ? "list-decimal" : "list-disc"} pl-5`}
      >
        {items.map((it, idx) => (
          <li key={idx}>{renderInline(it, `${key}-${idx}`)}</li>
        ))}
      </ListTag>
    );
    listBuffer = null;
  };

  lines.forEach((line, idx) => {
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+\.\s+(.*)$/);

    if (bullet) {
      if (!listBuffer || listBuffer.ordered) flushList(`list-${idx}`);
      listBuffer = listBuffer ?? { ordered: false, items: [] };
      listBuffer.items.push(bullet[1]);
    } else if (numbered) {
      if (!listBuffer || !listBuffer.ordered) flushList(`list-${idx}`);
      listBuffer = listBuffer ?? { ordered: true, items: [] };
      listBuffer.items.push(numbered[1]);
    } else {
      flushList(`list-${idx}`);
      if (line.trim() === "") return;
      blocks.push(
        <p key={`p-${idx}`} className="leading-relaxed">
          {renderInline(line, `p-${idx}`)}
        </p>
      );
    }
  });
  flushList("list-end");

  return <div className="space-y-1.5">{blocks}</div>;
}
