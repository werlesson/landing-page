import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        accent: '#39ff14',
        textPrimary: '#f0f0f0',
        textMuted: '#6b7280',
        foreground: '#f5f5f7',
        card: '#121218',
        border: '#1f1f28',
        surface: '#1a1a22',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      keyframes: {
        'hero-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'hero-float-reverse': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(12px)' },
        },
        'hero-float-slow': {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translateY(-20px) scale(1.1)',
            opacity: '1',
          },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        dash: {
          to: { strokeDashoffset: '-16' },
        },
        'scroll-indicator': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.3' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'hero-hub-shine': {
          '0%': { transform: 'translateX(-120%) skewX(-14deg)', opacity: '0' },
          '35%': { opacity: '0.45' },
          '100%': { transform: 'translateX(220%) skewX(-14deg)', opacity: '0' },
        },
      },
      animation: {
        'hero-float': 'hero-float 5s ease-in-out infinite',
        'hero-float-reverse': 'hero-float-reverse 6s ease-in-out infinite',
        'hero-float-slow': 'hero-float-slow 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        dash: 'dash 1s linear infinite',
        'scroll-indicator': 'scroll-indicator 2s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        'hero-hub-shine': 'hero-hub-shine 4.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
