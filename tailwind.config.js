/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Korean (Toss-style) — default
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['Pretendard', 'sans-serif'],
        mono: ['Pretendard', 'sans-serif'],
        // English (Abraham.com-style) — prestige serif
        display: ['"Playfair Display"', 'Georgia', '"Times New Roman"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        // Gold palette (Abraham.com prestige accent)
        gold: {
          50:  '#FBF6E8',
          100: '#F5EDD0',
          200: '#EBDBA2',
          300: '#E0C97A',
          400: '#D4BA6A',   // light gold — hover / secondary
          500: '#C9A84C',   // main gold — primary accent
          600: '#A88330',   // dark gold — pressed
          700: '#8B6D1C',
          800: '#6E5412',
          900: '#4A370A',
        },
      },
      letterSpacing: {
        // Toss-style tight tracking for Korean headings
        'toss-tight': '-0.03em',
        'toss-tighter': '-0.04em',
        'en-display': '-0.015em',
      },
      lineHeight: {
        // Toss-style generous body line height
        'toss': '1.7',
        'toss-heading': '1.15',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
