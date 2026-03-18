/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  // Gradient and colour classes that come from Contentful data at runtime
  // are never present as static strings in source files, so Tailwind's JIT
  // would strip them. The safelist patterns below force-include every
  // from-*, via-*, to-* and bg-* utility across all colour shades so that
  // any gradient string stored in Contentful renders correctly.
  safelist: [
    { pattern: /^from-/ },
    { pattern: /^via-/ },
    { pattern: /^to-/ },
    { pattern: /^bg-gradient-to-/ },
    { pattern: /^bg-/ },
  ],
  theme: {
    extend: {
      colors: {
        'kkw-pink': '#E8006F',
        'kkw-black': '#0a0a0a',
        'kkw-gray': '#f4f4f4',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'display': '0.15em',
        'nav': '0.12em',
        'label': '0.1em',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
}
