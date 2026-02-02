import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-[#2a2725] mt-16 bg-[#151312]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <span className="text-sm text-[#5c5450]">
            © 2024 불편하면 자세를 고쳐앉아
          </span>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { name: 'GitHub', href: 'https://github.com/jaeyeong94' },
              { name: 'Twitter', href: 'https://x.com/ted_ryu_o' },
              { name: 'RSS', href: '/rss.xml' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-[#5c5450] hover:text-[#c9a87c] transition-colors"
                target={link.href.startsWith('http') ? '_blank' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
