/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B10',
        bg2: '#101018',
        card: '#14131D',
        gold: '#D4AF7C',
        purple: '#9B7BFF',
        ink: '#F5F2FA',
        ink2: '#A6A2AF',
        muted: '#777381',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      spacing: { 18: '4.5rem', 22: '5.5rem' },
    },
  },
  plugins: [],
};
