/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#010113',    // Deep Navy/Black background
        accent: '#E6B35C',     // Gold/Yellow accent
        secondary: 'rgba(255, 255, 255, 0.7)', // Muted text
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
