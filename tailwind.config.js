/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rock: {
          bg: 'var(--armory-void)',
          night: 'var(--armory-night)',
          panel: 'var(--armory-surface)',
          panel2: 'var(--armory-surface-raised)',
          panel3: 'var(--armory-surface-strong)',
          border: 'var(--armory-border)',
          gold: 'var(--armory-teal)',
          goldstrong: 'var(--armory-teal-strong)',
          goldlight: 'var(--armory-teal-soft)',
          kingdom: 'var(--armory-gold)',
          kingdomstrong: 'var(--armory-gold-strong)',
          ember: 'var(--armory-violet)',
          emberlight: 'var(--armory-pink)',
          cream: 'var(--armory-text)',
          muted: 'var(--armory-text-muted)',
          muted2: 'var(--armory-text-subtle)',
          success: 'var(--armory-success)',
          warning: 'var(--armory-warning)',
          danger: 'var(--armory-danger)',
          info: 'var(--armory-info)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        italic: ['"Playfair Display"', 'serif'],
      },
      fontSize: {
        hero: 'clamp(2.75rem, 7vw, 5.75rem)',
        'display-4': 'clamp(2.25rem, 5vw, 4rem)',
        'display-3': 'clamp(1.875rem, 3vw, 2.5rem)',
        'display-2': 'clamp(1.5rem, 2vw, 1.875rem)',
      },
      backgroundImage: {
        'grad-gold': 'var(--gradient-brand)',
        'grad-kingdom': 'var(--gradient-surface)',
        'grad-gold-accent': 'var(--gradient-gold)',
        'hero-radial': 'var(--gradient-hero)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'glow-teal': 'var(--shadow-glow-teal)',
        focus: 'var(--shadow-focus)',
      },
      borderRadius: {
        armory: '24px',
        panel: '18px',
      },
    },
  },
  plugins: [],
}
