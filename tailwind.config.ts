import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-success-DEFAULT", "bg-warning-DEFAULT", "bg-danger-DEFAULT", "bg-ai-DEFAULT",
    "text-success-DEFAULT", "text-warning-DEFAULT", "text-danger-DEFAULT", "text-ai-DEFAULT",
    "border-success-DEFAULT", "border-warning-DEFAULT", "border-danger-DEFAULT", "border-ai-DEFAULT",
    { pattern: /(bg|text|border|accent)-(success|warning|danger|ai)-DEFAULT(\/\d+)?/ },
    { pattern: /(from|to|via)-(success|warning|danger|ai)-DEFAULT/ },
    { pattern: /accent-(success|warning|danger|ai)-DEFAULT/ },
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Accent - warm gold for hospitality
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Surface colors for dark theme
        surface: {
          950: '#0a0a0f',
          900: '#0f0f1a',
          850: '#13131f',
          800: '#1a1a2e',
          750: '#1e1e35',
          700: '#252540',
          600: '#2e2e50',
          500: '#3d3d6b',
        },
        // Status colors
        success: {
          light: '#22c55e',
          DEFAULT: '#16a34a',
          dark: '#15803d',
        },
        warning: {
          light: '#facc15',
          DEFAULT: '#eab308',
          dark: '#ca8a04',
        },
        danger: {
          light: '#f87171',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        ai: {
          light: '#a78bfa',
          DEFAULT: '#7c3aed',
          dark: '#6d28d9',
          glow: 'rgba(124,58,237,0.3)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        'brand-gradient': 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
        'ai-gradient': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
        'success-gradient': 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
        'danger-gradient': 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)',
        'accent-gradient': 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0f0f1a 0%, #13131f 100%)',
      },
      boxShadow: {
        'glow-brand': '0 0 20px rgba(99,102,241,0.4)',
        'glow-ai': '0 0 20px rgba(124,58,237,0.5)',
        'glow-success': '0 0 15px rgba(22,163,74,0.4)',
        'glow-danger': '0 0 15px rgba(239,68,68,0.4)',
        'glow-accent': '0 0 15px rgba(245,158,11,0.4)',
        'glass': '0 8px 32px 0 rgba(0,0,0,0.37)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
        'elevated': '0 8px 40px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
