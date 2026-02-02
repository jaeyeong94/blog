import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Paper Theme (어두운 종이)
        paper: {
          50: '#2a2725',
          100: '#252220',
          200: '#201d1b',
          300: '#1a1816',
          400: '#151312',
          500: '#0f0e0d',
        },
        wood: {
          300: '#c9a87c',
          400: '#b8956a',
          500: '#a68358',
          600: '#8b6d48',
        },
        ink: {
          50: '#faf8f5',
          100: '#f0ebe4',
          200: '#e0d8cd',
          300: '#c4b8a8',
          400: '#9c9080',
          500: '#7a7068',
          600: '#5c5450',
          700: '#3d3835',
          800: '#2a2725',
          900: '#1a1816',
        },
        accent: {
          warm: '#d4a574',
          link: '#c9a87c',
          hover: '#b8956a',
        },
        // 호환성
        bg: '#1a1816',
        bgCard: '#201d1b',
        bgCardHover: '#252220',
        bgElevated: '#2a2725',
        bgCode: '#151312',
        text: '#f0ebe4',
        textMuted: '#9c9080',
        textDim: '#5c5450',
      },
      fontFamily: {
        sans: ['Pretendard', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif KR', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'paper': '0 2px 8px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)',
        'paper-hover': '0 8px 24px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.3)',
        'paper-lg': '0 12px 32px rgba(0,0,0,0.5), 0 6px 12px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
