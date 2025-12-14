'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CodeCopyButton from './CodeCopyButton';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  h1: (props: any) => (
    <h1
      className="text-[28px] font-semibold mt-10 mb-4.5 flex items-center gap-2.5"
      {...props}
    >
      <span className="w-1 h-[22px] bg-accent rounded-sm" />
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2
      id={props.id}
      className="text-[22px] font-semibold mt-10 mb-4.5 flex items-center gap-2.5 scroll-mt-[90px]"
      {...props}
    >
      <span className="w-1 h-[22px] bg-accent rounded-sm" />
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3
      id={props.id}
      className="text-[17px] font-semibold mt-7 mb-3.5 scroll-mt-[90px]"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="mb-4.5 text-textMuted leading-relaxed" {...props} />
  ),
  code: ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    if (!match) {
      return (
        <code
          className="font-mono text-[0.88em] bg-bgElevated px-1.5 py-0.5 rounded border border-[rgba(126,184,255,0.08)] text-[#82aaff]"
          {...props}
        >
          {children}
        </code>
      );
    }

    const codeString = String(children).replace(/\n$/, '');

    return (
      <div className="bg-bgCode rounded-lg overflow-hidden border border-[rgba(126,184,255,0.08)] mb-6">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-bgCard border-b border-[rgba(126,184,255,0.08)]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27ca40]" />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] text-textDim px-2 py-0.5 bg-bgElevated rounded">
              {language}
            </span>
            <CodeCopyButton code={codeString} />
          </div>
        </div>

        {/* Code */}
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '16px',
            background: '#0d0c0b',
            fontSize: '13px',
            lineHeight: '1.65',
          }}
          showLineNumbers
          lineNumberStyle={{
            color: '#5c5552',
            paddingRight: '16px',
            borderRight: '1px solid rgba(126, 184, 255, 0.08)',
            marginRight: '16px',
          }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  },
  blockquote: (props: any) => (
    <blockquote
      className="my-7 px-5 py-4.5 bg-bgCard border-l-[3px] border-accent rounded-r-lg italic text-textMuted"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="mb-7 pl-5 text-textMuted space-y-2.5" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-7 pl-5 text-textMuted space-y-2.5 list-decimal" {...props} />
  ),
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  table: (props: any) => (
    <div className="bg-bgCard rounded-lg overflow-hidden border border-[rgba(126,184,255,0.08)] mb-7">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-bgElevated" {...props} />
  ),
  th: (props: any) => (
    <th className="px-4 py-3 text-left font-semibold text-textMuted" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-3 text-text border-t border-[rgba(126,184,255,0.08)]" {...props} />
  ),
  a: (props: any) => (
    <a className="text-accent hover:underline" {...props} />
  ),
  strong: (props: any) => (
    <strong className="text-text font-semibold" {...props} />
  ),
};

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
