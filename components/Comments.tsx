'use client';

export default function Comments() {
  // Giscus 댓글 기능은 GitHub 저장소 설정이 필요합니다.
  // 설정 방법:
  // 1. https://giscus.app/ko 방문
  // 2. GitHub 저장소에 Discussions 활성화
  // 3. Giscus 앱 설치
  // 4. 생성된 설정을 아래 코드에 적용

  return null; // 임시로 비활성화

  /*
  // Giscus 활성화 시 아래 코드 사용:
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'YOUR_USERNAME/YOUR_REPO');
    script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="mt-16">
      <h3 className="text-xl font-semibold mb-6">Comments</h3>
      <div ref={commentsRef} className="giscus" />
    </div>
  );
  */
}
