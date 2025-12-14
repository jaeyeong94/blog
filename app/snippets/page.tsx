import { getAllSnippets, getAllLanguages } from '@/lib/snippets';
import Link from 'next/link';

export default function SnippetsPage() {
  const snippets = getAllSnippets();
  const languages = getAllLanguages();

  // 언어별로 스니펫 그룹화
  const snippetsByLanguage = languages.map(language => ({
    language,
    snippets: snippets.filter(snippet => snippet.language === language),
  }));

  const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Rust: '#f74c00',
    Go: '#00add8',
    Python: '#3776ab',
    Shell: '#89e051',
  };

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-[36px] font-semibold mb-4">Code Snippets</h1>
        <p className="text-textMuted text-base">
          자주 사용하는 유용한 코드 조각 모음 ({snippets.length}개)
        </p>
      </div>

      {snippets.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-textMuted mb-4">아직 스니펫이 없습니다.</p>
          <p className="text-sm text-textDim">
            snippets 폴더에 .mdx 파일을 추가하세요.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {snippetsByLanguage.map(({ language, snippets }) => {
            const languageColor = languageColors[language] || '#7eb8ff';

            return (
              <section key={language}>
                {/* Language Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-7 rounded"
                    style={{ backgroundColor: languageColor }}
                  />
                  <h2 className="text-[24px] font-semibold">{language}</h2>
                  <span className="text-sm text-textMuted">({snippets.length})</span>
                </div>

                {/* Snippets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {snippets.map((snippet) => (
                    <Link
                      key={snippet.slug}
                      href={`/snippets/${snippet.slug}`}
                      className="block p-5 bg-bgCard hover:bg-bgCardHover border border-[rgba(126,184,255,0.08)] rounded-lg transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-base font-medium group-hover:text-accent transition-colors">
                          {snippet.title}
                        </h3>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono flex-shrink-0"
                          style={{
                            backgroundColor: `${languageColor}15`,
                            color: languageColor,
                          }}
                        >
                          {snippet.language}
                        </span>
                      </div>
                      <p className="text-sm text-textMuted mb-3 line-clamp-2">
                        {snippet.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {snippet.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-bgElevated rounded text-[11px] text-textDim font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
