export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg-base': 'var(--dark-bg-base)',
        'accent-violet': 'var(--accent-violet)',
        'accent-indigo': 'var(--accent-indigo)',
        'accent-emerald': 'var(--accent-emerald)',
        'focus-ring': 'var(--focus-ring)'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      }
    }
  }
}
