/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*/*.{html,js}",
  "./html/*/*.{html,js}",
  './index.html'],
  theme: {
    extend: {
      colors:{
        'regal-blue': '#091e42',
      },
      keyframes: {
        opac: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation:{
        'opac': 'opac 500ms ease-in-out',
      }
    },
  },
  plugins: [],
}