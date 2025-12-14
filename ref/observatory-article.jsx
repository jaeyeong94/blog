import React, { useState } from 'react';

export default function ObservatoryArticle() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const theme = {
    bg: '#12100f',
    bgCard: '#1a1816',
    bgElevated: '#211e1c',
    bgCode: '#0d0c0b',
    text: '#ede8e3',
    textMuted: '#a39e98',
    textDim: '#5c5552',
    accent: '#7eb8ff',
    accentGlow: 'rgba(126, 184, 255, 0.3)',
    accentSoft: 'rgba(126, 184, 255, 0.12)',
    border: 'rgba(126, 184, 255, 0.08)',
    syntax: {
      keyword: '#c792ea',
      function: '#82aaff',
      string: '#c3e88d',
      number: '#f78c6c',
      comment: '#5c5552',
      operator: '#89ddff',
      type: '#ffcb6b',
    }
  };

  const stars = [...Array(50)].map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.35 + 0.1,
    duration: Math.random() * 4 + 3,
  }));

  const tocItems = [
    { id: 'intro', label: '들어가며', level: 1 },
    { id: 'actix', label: 'Actix Web 살펴보기', level: 1 },
    { id: 'actix-setup', label: '프로젝트 설정', level: 2 },
    { id: 'actix-handler', label: '핸들러 구현', level: 2 },
    { id: 'axum', label: 'Axum 살펴보기', level: 1 },
    { id: 'benchmark', label: '벤치마크 결과', level: 1 },
    { id: 'conclusion', label: '결론', level: 1 },
  ];

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const CodeBlock = ({ language, code, filename, index, showLineNumbers = true }) => {
    const lines = code.trim().split('\n');
    
    return (
      <div style={{
        backgroundColor: theme.bgCode,
        borderRadius: '10px',
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        marginBottom: '24px',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: theme.bgCard,
          borderBottom: `1px solid ${theme.border}`,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27ca40' }} />
            </div>
            {filename && (
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                color: theme.textMuted,
              }}>
                {filename}
              </span>
            )}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px',
              color: theme.textDim,
              padding: '3px 8px',
              backgroundColor: theme.bgElevated,
              borderRadius: '4px',
            }}>
              {language}
            </span>
            <button
              onClick={() => handleCopy(code, index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                backgroundColor: copiedIndex === index ? theme.accentSoft : 'transparent',
                border: `1px solid ${copiedIndex === index ? theme.accent : theme.border}`,
                borderRadius: '4px',
                color: copiedIndex === index ? theme.accent : theme.textMuted,
                fontSize: '11px',
                fontFamily: "'IBM Plex Mono', monospace",
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {copiedIndex === index ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>
        
        {/* Code */}
        <div style={{ padding: '16px', overflowX: 'auto' }}>
          <pre style={{
            margin: 0,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px',
            lineHeight: '1.65',
          }}>
            {lines.map((line, i) => (
              <div key={i} style={{ display: 'flex', minHeight: '21px' }}>
                {showLineNumbers && (
                  <span style={{
                    color: theme.textDim,
                    width: '36px',
                    flexShrink: 0,
                    textAlign: 'right',
                    paddingRight: '16px',
                    userSelect: 'none',
                    borderRight: `1px solid ${theme.border}`,
                    marginRight: '16px',
                  }}>
                    {i + 1}
                  </span>
                )}
                <code style={{ color: theme.text }}>{line || ' '}</code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    );
  };

  const InlineCode = ({ children }) => (
    <code style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '0.88em',
      backgroundColor: theme.bgElevated,
      padding: '2px 7px',
      borderRadius: '4px',
      color: theme.syntax.function,
      border: `1px solid ${theme.border}`,
    }}>
      {children}
    </code>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: "'IBM Plex Sans', 'IBM Plex Sans KR', sans-serif",
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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .toc-item {
          transition: all 0.2s ease;
        }
        
        .toc-item:hover {
          color: ${theme.accent};
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
        }
        
        article h2, article h3 {
          scroll-margin-top: 90px;
        }
      `}</style>

      {/* Stars */}
      <div style={{
        position: 'fixed',
        inset: 0,
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

      {/* Glow */}
      <div style={{
        position: 'fixed',
        top: '10%',
        right: '15%',
        width: '280px',
        height: '280px',
        background: 'radial-gradient(circle, rgba(126,184,255,0.05) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: `${theme.bg}ee`,
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${theme.border}`,
      }}>
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '14px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.accent} 0%, #a78bfa 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 20px ${theme.accentGlow}`,
            }}>
              <span style={{ fontSize: '14px' }}>◐</span>
            </div>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>Observatory</span>
          </div>

          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }}>
            {['Articles', 'Snippets', 'About'].map((item) => (
              <a key={item} className="nav-link" style={{
                color: theme.textMuted,
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}>
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '40px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 240px',
        gap: '56px',
      }}>
        {/* Article */}
        <article style={{ animation: 'fadeIn 0.5s ease' }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            fontSize: '13px',
            color: theme.textDim,
          }}>
            <span style={{ cursor: 'pointer' }}>Articles</span>
            <span>/</span>
            <span style={{ color: theme.textMuted }}>Rust</span>
          </div>

          {/* Header */}
          <header style={{ marginBottom: '36px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px',
            }}>
              <span style={{
                padding: '5px 12px',
                backgroundColor: '#f7430015',
                border: '1px solid #f7430030',
                borderRadius: '4px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                color: '#f74300',
                fontWeight: '500',
              }}>
                RUST
              </span>
              <span style={{
                padding: '5px 12px',
                backgroundColor: theme.accentSoft,
                borderRadius: '4px',
                fontSize: '11px',
                color: theme.accent,
                fontWeight: '500',
              }}>
                Deep Dive
              </span>
            </div>

            <h1 style={{
              fontSize: '32px',
              fontWeight: '600',
              lineHeight: '1.35',
              marginBottom: '18px',
              letterSpacing: '-0.3px',
            }}>
              Rust로 구현하는 고성능 웹서버: Actix vs Axum 비교
            </h1>

            <p style={{
              fontSize: '16px',
              color: theme.textMuted,
              lineHeight: '1.75',
              marginBottom: '20px',
            }}>
              실제 벤치마크와 함께 두 프레임워크의 장단점을 분석합니다. 메모리 사용량부터 동시 처리 성능까지 꼼꼼히 살펴봅니다.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '14px 0',
              borderTop: `1px solid ${theme.border}`,
              borderBottom: `1px solid ${theme.border}`,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: theme.bgElevated,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                }}>
                  👨‍💻
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Ted</span>
              </div>
              
              <div style={{ width: '1px', height: '24px', backgroundColor: theme.border }} />
              
              <div style={{
                display: 'flex',
                gap: '12px',
                fontSize: '13px',
                color: theme.textMuted,
                fontFamily: "'IBM Plex Mono', monospace",
              }}>
                <span>2024.12.10</span>
                <span>·</span>
                <span>8분</span>
              </div>
            </div>
          </header>

          {/* Top Ad */}
          <div className="ad-slot" style={{
            height: '90px',
            borderRadius: '8px',
            marginBottom: '36px',
          }}>
            <span>AD BANNER — 728 × 90</span>
          </div>

          {/* Content */}
          <div style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: theme.text,
          }}>
            <h2 id="intro" style={{
              fontSize: '22px',
              fontWeight: '600',
              marginTop: '40px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '4px',
                height: '22px',
                backgroundColor: theme.accent,
                borderRadius: '2px',
              }} />
              들어가며
            </h2>

            <p style={{ marginBottom: '18px', color: theme.textMuted }}>
              Rust 생태계에서 웹 프레임워크를 선택할 때 가장 많이 비교되는 것이 바로 
              <InlineCode>Actix Web</InlineCode>과 <InlineCode>Axum</InlineCode>입니다. 
              두 프레임워크 모두 높은 성능과 안정성을 제공하지만, 설계 철학과 사용 방식에서 차이가 있습니다.
            </p>

            <p style={{ marginBottom: '28px', color: theme.textMuted }}>
              이 글에서는 실제 프로덕션 환경에서의 벤치마크 결과를 바탕으로 두 프레임워크를 
              비교 분석하고, 각각 어떤 상황에 적합한지 살펴보겠습니다.
            </p>

            {/* Blockquote */}
            <blockquote style={{
              margin: '28px 0',
              padding: '18px 20px',
              backgroundColor: theme.bgCard,
              borderLeft: `3px solid ${theme.accent}`,
              borderRadius: '0 8px 8px 0',
              fontStyle: 'italic',
              color: theme.textMuted,
            }}>
              <p style={{ marginBottom: '6px' }}>
                "The right tool depends on your specific requirements. Both frameworks are production-ready."
              </p>
              <cite style={{ fontSize: '12px', color: theme.textDim, fontStyle: 'normal' }}>
                — Rust Web Framework Comparison, 2024
              </cite>
            </blockquote>

            <h2 id="actix" style={{
              fontSize: '22px',
              fontWeight: '600',
              marginTop: '40px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '4px',
                height: '22px',
                backgroundColor: theme.accent,
                borderRadius: '2px',
              }} />
              Actix Web 살펴보기
            </h2>

            <p style={{ marginBottom: '20px', color: theme.textMuted }}>
              Actix Web은 Actix actor 프레임워크 위에 구축된 고성능 웹 프레임워크입니다. 
              오랜 역사와 안정성을 자랑하며, 다양한 미들웨어와 플러그인 생태계를 갖추고 있습니다.
            </p>

            <h3 id="actix-setup" style={{
              fontSize: '17px',
              fontWeight: '600',
              marginTop: '28px',
              marginBottom: '14px',
            }}>
              프로젝트 설정
            </h3>

            <p style={{ marginBottom: '14px', color: theme.textMuted }}>
              먼저 <InlineCode>Cargo.toml</InlineCode>에 의존성을 추가합니다:
            </p>

            <CodeBlock
              language="toml"
              filename="Cargo.toml"
              index={0}
              code={`[package]
name = "actix-server"
version = "0.1.0"
edition = "2021"

[dependencies]
actix-web = "4"
actix-rt = "2"
serde = { version = "1", features = ["derive"] }
tokio = { version = "1", features = ["full"] }`}
            />

            <h3 id="actix-handler" style={{
              fontSize: '17px',
              fontWeight: '600',
              marginTop: '28px',
              marginBottom: '14px',
            }}>
              핸들러 구현
            </h3>

            <p style={{ marginBottom: '14px', color: theme.textMuted }}>
              Actix Web에서 기본적인 REST API 핸들러를 구현하는 방법입니다:
            </p>

            <CodeBlock
              language="rust"
              filename="src/main.rs"
              index={1}
              code={`use actix_web::{web, App, HttpResponse, HttpServer};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
}

async fn get_user(path: web::Path<u32>) -> HttpResponse {
    let user_id = path.into_inner();
    
    let user = User {
        id: user_id,
        name: "John Doe".to_string(),
        email: "john@example.com".to_string(),
    };
    
    HttpResponse::Ok().json(user)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/users/{id}", web::get().to(get_user))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}`}
            />

            {/* In-article Ad */}
            <div className="ad-slot" style={{
              height: '100px',
              borderRadius: '8px',
              margin: '32px 0',
            }}>
              <span>IN-ARTICLE AD</span>
            </div>

            <h2 id="axum" style={{
              fontSize: '22px',
              fontWeight: '600',
              marginTop: '40px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '4px',
                height: '22px',
                backgroundColor: theme.accent,
                borderRadius: '2px',
              }} />
              Axum 살펴보기
            </h2>

            <p style={{ marginBottom: '20px', color: theme.textMuted }}>
              Axum은 Tokio 팀에서 개발한 웹 프레임워크로, Tower 생태계와의 완벽한 호환성이 특징입니다.
            </p>

            <CodeBlock
              language="rust"
              filename="src/main.rs"
              index={2}
              code={`use axum::{
    extract::Path,
    routing::get,
    Json, Router,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
}

async fn get_user(Path(user_id): Path<u32>) -> Json<User> {
    Json(User {
        id: user_id,
        name: "John Doe".to_string(),
        email: "john@example.com".to_string(),
    })
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/users/:id", get(get_user));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000")
        .await
        .unwrap();
        
    axum::serve(listener, app).await.unwrap();
}`}
            />

            <h2 id="benchmark" style={{
              fontSize: '22px',
              fontWeight: '600',
              marginTop: '40px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '4px',
                height: '22px',
                backgroundColor: theme.accent,
                borderRadius: '2px',
              }} />
              벤치마크 결과
            </h2>

            <p style={{ marginBottom: '20px', color: theme.textMuted }}>
              동일한 환경에서 <InlineCode>wrk</InlineCode>를 사용해 측정한 결과입니다:
            </p>

            {/* Table */}
            <div style={{
              backgroundColor: theme.bgCard,
              borderRadius: '10px',
              overflow: 'hidden',
              border: `1px solid ${theme.border}`,
              marginBottom: '28px',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
              }}>
                <thead>
                  <tr style={{ backgroundColor: theme.bgElevated }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: theme.textMuted }}>Metric</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: '#f74300' }}>Actix</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: theme.accent }}>Axum</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Requests/sec', '312,847', '298,421'],
                    ['Avg Latency', '1.02ms', '1.08ms'],
                    ['Memory (idle)', '8.2 MB', '7.8 MB'],
                    ['Memory (load)', '42 MB', '38 MB'],
                  ].map(([metric, actix, axum], i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${theme.border}` }}>
                      <td style={{ padding: '12px 16px', color: theme.text }}>{metric}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: "'IBM Plex Mono', monospace", color: theme.textMuted }}>{actix}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: "'IBM Plex Mono', monospace", color: theme.textMuted }}>{axum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="conclusion" style={{
              fontSize: '22px',
              fontWeight: '600',
              marginTop: '40px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '4px',
                height: '22px',
                backgroundColor: theme.accent,
                borderRadius: '2px',
              }} />
              결론
            </h2>

            <p style={{ marginBottom: '18px', color: theme.textMuted }}>
              두 프레임워크 모두 프로덕션 환경에서 충분한 성능을 제공합니다:
            </p>

            <ul style={{
              marginBottom: '28px',
              paddingLeft: '20px',
              color: theme.textMuted,
            }}>
              <li style={{ marginBottom: '10px' }}>
                <strong style={{ color: theme.text }}>Actix Web</strong>: 최고 성능, 풍부한 생태계
              </li>
              <li style={{ marginBottom: '10px' }}>
                <strong style={{ color: theme.text }}>Axum</strong>: Tower 호환성, 타입 안전성
              </li>
            </ul>

            {/* Tags */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: `1px solid ${theme.border}`,
            }}>
              {['Rust', 'Actix', 'Axum', 'Performance'].map((tag) => (
                <span key={tag} style={{
                  padding: '6px 12px',
                  backgroundColor: theme.bgCard,
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: theme.textMuted,
                  fontFamily: "'IBM Plex Mono', monospace",
                  border: `1px solid ${theme.border}`,
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author */}
          <div style={{
            marginTop: '40px',
            padding: '24px',
            backgroundColor: theme.bgCard,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            display: 'flex',
            gap: '16px',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: theme.bgElevated,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              flexShrink: 0,
            }}>
              👨‍💻
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>Ted</div>
              <p style={{ fontSize: '13px', color: theme.textMuted, lineHeight: '1.6', marginBottom: '10px' }}>
                Backend Engineer. Rust, Go, 시스템 프로그래밍에 관심이 많습니다.
              </p>
              <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: theme.accent }}>
                <span style={{ cursor: 'pointer' }}>GitHub</span>
                <span style={{ cursor: 'pointer' }}>Twitter</span>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside>
          <div style={{
            position: 'sticky',
            top: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            {/* TOC */}
            <div style={{
              padding: '20px',
              backgroundColor: theme.bgCard,
              borderRadius: '10px',
              border: `1px solid ${theme.border}`,
            }}>
              <h4 style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: '500',
                color: theme.textDim,
                marginBottom: '14px',
              }}>
                ON THIS PAGE
              </h4>
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="toc-item"
                    style={{
                      fontSize: '13px',
                      color: theme.textMuted,
                      textDecoration: 'none',
                      paddingLeft: item.level === 2 ? '14px' : '0',
                      borderLeft: item.level === 2 ? `1px solid ${theme.border}` : 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Ad */}
            <div className="ad-slot" style={{
              height: '250px',
              borderRadius: '8px',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div>SIDEBAR AD</div>
                <div style={{ marginTop: '4px', opacity: 0.6 }}>300 × 250</div>
              </div>
            </div>

            {/* Share */}
            <div style={{
              padding: '16px',
              backgroundColor: theme.bgCard,
              borderRadius: '10px',
              border: `1px solid ${theme.border}`,
            }}>
              <h4 style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: '500',
                color: theme.textDim,
                marginBottom: '12px',
              }}>
                SHARE
              </h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Twitter', 'LinkedIn', 'Copy'].map((p) => (
                  <button key={p} style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: theme.bgElevated,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '6px',
                    color: theme.textMuted,
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 1,
        borderTop: `1px solid ${theme.border}`,
        marginTop: '40px',
      }}>
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '36px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: theme.textDim,
          }}>
            © 2024 Observatory
          </span>
          <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
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
