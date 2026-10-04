/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        viola: {
          deep: '#752092',
          plum: '#9f4dcc',
          pink: '#c957bc',
          lilac: '#e9a5e2',
          gold: '#ffc872',
          cream: '#ffe3b3',
          ink: '#090817',
          panel: '#121024',
          line: '#2b2648',
          text: '#f5f0ff',
          muted: '#b8b1d4',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(201,87,188,.18), 0 18px 50px rgba(117,32,146,.18)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '50%': { transform: 'translate3d(12px,-12px,0) rotate(4deg)' },
          '100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
