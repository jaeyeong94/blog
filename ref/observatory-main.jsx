import React, { useState } from 'react';

export default function ObservatoryBlogMain() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const theme = {
    bg: '#12100f',
    bgCard: '#1a1816',
    bgCardHover: '#1f1c1a',
    bgElevated: '#211e1c',
    text: '#ede8e3',
    textMuted: '#a39e98',
    textDim: '#5c5552',
    accent: '#7eb8ff',
    accentGlow: 'rgba(126, 184, 255, 0.3)',
    accentSoft: 'rgba(126, 184, 255, 0.12)',
    border: 'rgba(126, 184, 255, 0.08)',
    borderHover: 'rgba(126, 184, 255, 0.2)',
  };

  const categories = ['ALL', 'RUST', 'GO', 'FRONTEND', 'DEVOPS', 'DATABASE'];

  const posts = [
    {
      id: 1,
      category: 'RUST',
      title: 'Rust로 구현하는 고성능 웹서버: Actix vs Axum 비교',
      excerpt: '실제 벤치마크와 함께 두 프레임워크의 장단점을 분석합니다. 메모리 사용량부터 동시 처리 성능까지 꼼꼼히 살펴봅니다.',
      date: '2024.12.10',
      readTime: '8분',
      featured: true,
    },
    {
      id: 2,
      category: 'DEVOPS',
      title: 'Kubernetes에서 GPU 워크로드 스케줄링 최적화',
      excerpt: 'NVIDIA Device Plugin과 함께 효율적인 ML 파이프라인을 구축하는 방법을 알아봅니다.',
      date: '2024.12.08',
      readTime: '12분',
      featured: false,
    },
    {
      id: 3,
      category: 'FRONTEND',
      title: 'React 19 Server Components 실전 가이드',
      excerpt: '새로운 렌더링 패러다임과 기존 프로젝트 마이그레이션 전략을 상세히 다룹니다.',
      date: '2024.12.05',
      readTime: '10분',
      featured: false,
    },
    {
      id: 4,
      category: 'DATABASE',
      title: 'PostgreSQL 파티셔닝으로 10억 건 데이터 다루기',
      excerpt: '실시간 분석 쿼리 성능을 100배 향상시킨 실제 운영 경험을 공유합니다.',
      date: '2024.12.01',
      readTime: '15분',
      featured: false,
    },
    {
      id: 5,
      category: 'GO',
      title: 'Go 제네릭으로 타입 안전한 데이터 파이프라인 구축',
      excerpt: 'Go 1.21의 제네릭을 활용해 재사용 가능한 ETL 파이프라인을 설계합니다.',
      date: '2024.11.28',
      readTime: '11분',
      featured: false,
    },
  ];

  const getCategoryColor = (cat) => {
    const colors = {
      RUST: '#f74c00',
      GO: '#00add8',
      FRONTEND: '#61dafb',
      DEVOPS: '#4caf50',
      DATABASE: '#336791',
    };
    return colors[cat] || theme.accent;
  };

  // Generate stars
  const stars = [...Array(60)].map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.1,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: "'IBM Plex Sans', sans-serif",
      position: 'relative',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        ::selection {
          background: ${theme.accentSoft};
          color: ${theme.accent};
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: var(--base-opacity); }
          50% { opacity: calc(var(--base-opacity) * 0.3); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .post-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .post-card:hover {
          background: ${theme.bgCardHover};
          border-color: ${theme.borderHover};
          transform: translateY(-2px);
        }
        
        .post-card:hover .post-title {
          color: ${theme.accent};
        }
        
        .category-btn {
          transition: all 0.2s ease;
        }
        
        .category-btn:hover {
          background: ${theme.accentSoft};
          color: ${theme.accent};
          border-color: ${theme.accent}50;
        }
        
        .nav-link {
          transition: color 0.2s ease;
        }
        
        .nav-link:hover {
          color: ${theme.accent};
        }
        
        .ad-slot {
          background: linear-gradient(135deg, ${theme.bgCard} 0%, ${theme.bgElevated} 100%);
          border: 1px dashed ${theme.border};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.textDim};
          font-size: 11px;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.5px;
        }

        input::placeholder {
          color: ${theme.textDim};
        }
        
        input:focus {
          outline: none;
          border-color: ${theme.accent};
          box-shadow: 0 0 0 3px ${theme.accentSoft};
        }
      `}</style>

      {/* Star Field */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: '#fff',
              borderRadius: '50%',
              '--base-opacity': star.opacity,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Ambient Glows */}
      <div style={{
        position: 'fixed',
        top: '15%',
        right: '10%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(126,184,255,0.06) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed',
        bottom: '20%',
        left: '5%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: `${theme.bg}ee`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.border}`,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.accent} 0%, #a78bfa 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 24px ${theme.accentGlow}`,
            }}>
              <span style={{ fontSize: '16px' }}>◐</span>
            </div>
            <div>
              <div style={{
                fontSize: '17px',
                fontWeight: '600',
                letterSpacing: '-0.3px',
              }}>
                Observatory
              </div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                color: theme.textMuted,
                letterSpacing: '0.5px',
              }}>
                TECH BLOG
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}>
            {['Articles', 'Snippets', 'About'].map((item) => (
              <a key={item} className="nav-link" style={{
                color: theme.textMuted,
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
              }}>
                {item}
              </a>
            ))}
            
            {/* Search */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: theme.bgCard,
              border: `1px solid ${theme.border}`,
            }}>
              <span style={{ color: theme.textDim, fontSize: '14px' }}>⌕</span>
              <span style={{ color: theme.textDim, fontSize: '13px' }}>Search...</span>
              <span style={{
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: theme.bgElevated,
                fontSize: '10px',
                color: theme.textDim,
                fontFamily: "'IBM Plex Mono', monospace",
              }}>⌘K</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '48px',
      }}>
        {/* Left Column */}
        <div>
          {/* Hero */}
          <section style={{
            marginBottom: '48px',
            animation: 'fadeInUp 0.6s ease',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              backgroundColor: theme.accentSoft,
              borderRadius: '6px',
              marginBottom: '20px',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: theme.accent,
              }} />
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                color: theme.accent,
                fontWeight: '500',
              }}>
                EXPLORING THE DEPTHS
              </span>
            </div>
            
            <h1 style={{
              fontSize: '42px',
              fontWeight: '600',
              lineHeight: '1.2',
              letterSpacing: '-1px',
              marginBottom: '20px',
              background: `linear-gradient(135deg, ${theme.text} 0%, ${theme.accent} 100%)`,
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 6s ease infinite',
            }}>
              기술의 깊은 곳을<br />탐험합니다
            </h1>
            
            <p style={{
              fontSize: '16px',
              color: theme.textMuted,
              lineHeight: '1.8',
              maxWidth: '460px',
            }}>
              복잡한 시스템의 본질을 파헤치고, 실무에서 바로 적용할 수 있는 인사이트를 공유합니다.
            </p>
          </section>

          {/* Top Ad */}
          <div className="ad-slot" style={{
            height: '90px',
            borderRadius: '10px',
            marginBottom: '40px',
          }}>
            <span>AD BANNER — 728 × 90</span>
          </div>

          {/* Category Filter */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '28px',
            flexWrap: 'wrap',
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="category-btn"
                style={{
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: activeCategory === cat 
                    ? `1px solid ${theme.accent}`
                    : `1px solid ${theme.border}`,
                  backgroundColor: activeCategory === cat 
                    ? theme.accentSoft 
                    : 'transparent',
                  color: activeCategory === cat 
                    ? theme.accent 
                    : theme.textMuted,
                  fontSize: '12px',
                  fontWeight: '500',
                  fontFamily: "'IBM Plex Mono', monospace",
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {posts.map((post, idx) => (
              <React.Fragment key={post.id}>
                <article
                  className="post-card"
                  style={{
                    padding: '24px',
                    backgroundColor: theme.bgCard,
                    borderRadius: '12px',
                    border: `1px solid ${theme.border}`,
                    cursor: 'pointer',
                    animation: `fadeInUp 0.5s ease ${idx * 0.08}s both`,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: `1px solid ${getCategoryColor(post.category)}40`,
                        backgroundColor: `${getCategoryColor(post.category)}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '9px',
                          fontWeight: '600',
                          color: getCategoryColor(post.category),
                        }}>
                          {post.category.slice(0, 2)}
                        </span>
                      </div>
                      
                      {post.featured && (
                        <div style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                          fontSize: '10px',
                          fontWeight: '600',
                          color: '#fff',
                        }}>
                          FEATURED
                        </div>
                      )}
                    </div>
                    
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px',
                      color: theme.textDim,
                    }}>
                      {post.date}
                    </span>
                  </div>
                  
                  <h2 className="post-title" style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    lineHeight: '1.45',
                    marginBottom: '10px',
                    color: theme.text,
                    transition: 'color 0.2s ease',
                  }}>
                    {post.title}
                  </h2>
                  
                  <p style={{
                    fontSize: '14px',
                    color: theme.textMuted,
                    lineHeight: '1.7',
                    marginBottom: '16px',
                  }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{
                      fontSize: '12px',
                      color: theme.textDim,
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}>
                      ◔ {post.readTime} read
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: theme.accent,
                      fontWeight: '500',
                    }}>
                      Read →
                    </span>
                  </div>
                </article>

                {/* In-feed Ad */}
                {idx === 1 && (
                  <div className="ad-slot" style={{
                    height: '120px',
                    borderRadius: '10px',
                  }}>
                    <span>IN-FEED AD — NATIVE</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Load More */}
          <button style={{
            width: '100%',
            padding: '16px',
            marginTop: '24px',
            borderRadius: '8px',
            border: `1px solid ${theme.border}`,
            backgroundColor: 'transparent',
            color: theme.textMuted,
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}>
            더 많은 글 탐색하기 →
          </button>
        </div>

        {/* Right Column - Sidebar */}
        <aside style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {/* Sidebar Ad */}
          <div className="ad-slot" style={{
            height: '250px',
            borderRadius: '10px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div>SIDEBAR AD</div>
              <div style={{ marginTop: '4px', opacity: 0.6 }}>300 × 250</div>
            </div>
          </div>

          {/* Newsletter */}
          <div style={{
            padding: '24px',
            backgroundColor: theme.bgCard,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: theme.accentSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              fontSize: '20px',
            }}>
              ✉
            </div>
            
            <h3 style={{
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '8px',
            }}>
              뉴스레터
            </h3>
            <p style={{
              fontSize: '13px',
              color: theme.textMuted,
              marginBottom: '16px',
              lineHeight: '1.6',
            }}>
              매주 엄선된 기술 인사이트를 받아보세요
            </p>
            
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '6px',
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.bg,
                color: theme.text,
                fontSize: '13px',
                fontFamily: "'IBM Plex Sans', sans-serif",
                marginBottom: '10px',
              }}
            />
            
            <button style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              background: `linear-gradient(135deg, ${theme.accent} 0%, #a78bfa 100%)`,
              color: '#fff',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: `0 4px 16px ${theme.accentGlow}`,
            }}>
              구독하기
            </button>
          </div>

          {/* Popular Tags */}
          <div style={{
            padding: '20px',
            backgroundColor: theme.bgCard,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
          }}>
            <h4 style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              fontWeight: '500',
              color: theme.textDim,
              marginBottom: '14px',
            }}>
              POPULAR TAGS
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              {['TypeScript', 'Docker', 'AWS', 'PostgreSQL', 'React', 'Rust', 'Go', 'K8s'].map((tag) => (
                <span key={tag} style={{
                  padding: '6px 12px',
                  backgroundColor: theme.bgElevated,
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: theme.textMuted,
                  fontFamily: "'IBM Plex Mono', monospace",
                  cursor: 'pointer',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sticky Sidebar Ad */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div className="ad-slot" style={{
              height: '600px',
              borderRadius: '10px',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div>SIDEBAR AD</div>
                <div style={{ marginTop: '4px', opacity: 0.6 }}>300 × 600</div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 1,
        borderTop: `1px solid ${theme.border}`,
        marginTop: '40px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: theme.textDim,
          }}>
            © 2024 Observatory · Built with curiosity
          </span>
          <div style={{
            display: 'flex',
            gap: '20px',
            fontSize: '13px',
          }}>
            {['GitHub', 'Twitter', 'RSS'].map((link) => (
              <a key={link} className="nav-link" style={{
                textDecoration: 'none',
                color: theme.textMuted,
                cursor: 'pointer',
              }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
