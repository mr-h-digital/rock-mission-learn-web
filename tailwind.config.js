/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rock: {
          bg: '#101521',
          panel: '#18263a',
          panel2: '#223146',
          border: 'rgba(120, 244, 233, 0.2)',
          gold: '#20e3cf',
          goldlight: '#9af9f2',
          ember: '#ff2fa5',
          emberlight: '#ff8fd0',
          cream: '#f7fbff',
          muted: 'rgba(222, 241, 255, 0.76)',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        italic: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'grad-gold': 'linear-gradient(120deg, #20e3cf 0%, #30b7f2 50%, #ff2fa5 100%)',
        'hero-radial':
          'radial-gradient(circle at 18% 12%, rgba(255,47,165,0.22) 0%, transparent 44%), radial-gradient(circle at 84% 24%, rgba(32,227,207,0.26) 0%, transparent 48%), radial-gradient(circle at 48% 92%, rgba(48,183,242,0.16) 0%, transparent 46%)',
      },
    },
  },
  plugins: [],
}
