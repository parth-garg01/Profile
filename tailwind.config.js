/** @type {import('tailwindcss').Config} */
// Design tokens. Ultramarine base, cream type, sun / coral / mint / pink panels, navy ink on light colours.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        blue: '#1D2DE0',
        deep: '#1522A8',
        ink: '#0D1240',
        cream: '#FFF4E0',
        mist: '#C3CAFF',
        sun: '#FFD43B',
        coral: '#FF5B3A',
        peach: '#FFB385',
        mint: '#3BF0B0',
        pink: '#FF9BE0',
        violet: '#7A3CF0',
        teal: '#0B6E6A',
      },
      fontFamily: {
        display: ['"Anybody Variable"', 'Impact', 'sans-serif'],
        sans: ['"Instrument Sans Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      fontSize: {
        name: ['clamp(88px, 20.5vw, 340px)', { lineHeight: '0.8' }],
        poster: ['clamp(56px, 10vw, 168px)', { lineHeight: '0.88' }],
        section: ['clamp(40px, 5.6vw, 88px)', { lineHeight: '0.95' }],
        title: ['clamp(30px, 3.4vw, 52px)', { lineHeight: '1' }],
        lead: ['clamp(19px, 1.6vw, 24px)', { lineHeight: '1.4' }],
        body: ['17px', { lineHeight: '1.6' }],
        small: ['15px', { lineHeight: '1.5' }],
        tag: ['13px', { lineHeight: '1.3' }],
      },
      maxWidth: {
        page: '1440px',
        read: '38rem',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
