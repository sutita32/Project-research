/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./node_modules/tw-elements/dist/js/**/*.js', 
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '0': 'repeat(0, minmax(0, 1fr))'
      },
      colors: {
      'regal-red': '#7d0f3f',
        'regal-red2': '#873358',
        'regal-red-hover':'#690B33',
        "color-cut": "#333",
        "text-dark": "#000000",
        "regal-red-soft": "#C86F92",
        "regal-red-text": "#5A0026",
        "beige":"#D9B29C",
        "pistachio":"#7F7601",
        primary: {"50":"#ecfeff","100":"#cffafe","200":"#a5f3fc","300":"#67e8f9","400":"#22d3ee","500":"#06b6d4","600":"#0891b2","700":"#0e7490","800":"#155e75","900":"#164e63"},
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
}
