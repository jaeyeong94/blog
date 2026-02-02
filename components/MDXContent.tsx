import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

interface MDXContentProps {
  source: string;
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
  pre: (props: any) => (
    <pre
      className="bg-bgCode rounded-lg overflow-x-auto border border-[rgba(126,184,255,0.08)] mb-6 p-4"
      {...props}
    />
  ),
  code: ({ children, className, ...props }: any) => {
    const isBlock = className?.includes('language-');
    
    if (!isBlock) {
      return (
        <code
          className="font-mono text-[0.88em] bg-bgElevated px-1.5 py-0.5 rounded border border-[rgba(126,184,255,0.08)] text-[#82aaff]"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        className="font-mono text-[13px] leading-relaxed text-[#c9d1d9]"
        {...props}
      >
        {children}
      </code>
    );
  },
  blockquote: (props: any) => (
    <blockquote
      className="my-7 px-5 py-4.5 bg-bgCard border-l-[3px] border-accent rounded-r-lg italic text-textMuted"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="mb-7 pl-5 text-textMuted space-y-2.5 list-disc" {...props} />
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
  hr: () => (
    <hr className="my-8 border-t border-[rgba(126,184,255,0.15)]" />
  ),
  em: (props: any) => (
    <em className="italic text-textMuted" {...props} />
  ),
};

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote 
        source={source} 
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
        }}
      />
    </div>
  );
}
