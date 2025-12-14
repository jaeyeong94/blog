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
        bg: '#12100f',
        bgCard: '#1a1816',
        bgCardHover: '#1f1c1a',
        bgElevated: '#211e1c',
        bgCode: '#0d0c0b',
        text: '#ede8e3',
        textMuted: '#a39e98',
        textDim: '#5c5552',
        accent: '#7eb8ff',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'IBM Plex Sans KR', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
