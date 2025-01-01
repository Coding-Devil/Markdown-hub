import React from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import twemoji from 'twemoji';

interface PreviewProps {
  markdown: string;
}

export function Preview({ markdown }: PreviewProps) {
  const parseEmoji = (html: string) => {
    return twemoji.parse(html, {
      folder: 'svg',
      ext: '.svg',
      base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
      className: 'emoji',
      attributes: () => ({
        width: '1em',
        height: '1em'
      })
    });
  };

  marked.use({
    renderer: {
      codespan(text) {
        return `<code>${text}</code>`;
      }
    }
  });

  const html = parseEmoji(DOMPurify.sanitize(marked(markdown)));

  return (
    <div 
      className="h-full overflow-auto preview-container prose prose-invert prose-slate max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-headings:text-slate-100 
        prose-p:text-slate-300 prose-p:leading-relaxed
        prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
        prose-blockquote:border-indigo-500 prose-blockquote:bg-slate-800/50 prose-blockquote:rounded-r-lg
        prose-strong:text-indigo-300 prose-strong:font-semibold
        prose-code:text-indigo-300 prose-code:font-normal
        prose-th:text-slate-200 prose-td:text-slate-300
        prose-img:rounded-lg prose-img:shadow-lg
        prose-hr:border-indigo-500/30
        sm:px-6 md:px-8 lg:px-12"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}