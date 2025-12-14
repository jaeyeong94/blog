import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-[rgba(126,184,255,0.08)] mt-10">
      <div className="max-w-[1200px] mx-auto px-8 py-10 flex justify-between items-center">
        <span className="font-mono text-xs text-textDim">
          © 2024 Observatory · Built with curiosity
        </span>
        <div className="flex gap-5 text-[13px]">
          {['GitHub', 'Twitter', 'RSS'].map((link) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-textMuted hover:text-accent transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
