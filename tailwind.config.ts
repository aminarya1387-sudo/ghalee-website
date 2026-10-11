import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#ffffff',
          surface: '#f5f5f7',
          surfaceDark: '#121214',
          cardDark: '#1c1c1e',
          text: '#1d1d1f',
          textMuted: '#6e6e73',
          textDark: '#f5f5f7',
          textDarkMuted: '#86868b',
          border: '#e5e5ea',
          borderDark: '#2c2c2e',
          accent: 'var(--color-accent, #0066cc)',
          accentHover: 'var(--color-accent-hover, #0077ed)',
          accentLight: 'rgba(0, 102, 204, 0.08)',
          cardGlow: 'rgba(0, 102, 204, 0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'apple': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'apple-hover': '0 12px 32px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 40px -10px var(--color-accent, #0066cc)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
