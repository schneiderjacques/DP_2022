/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*/*.{html,js}",
  "./html/*/*.{html,js}",
  './index.html'],
  theme: {
    fontFamily: {
      famille: ['"Arial"', 'sans-serif'],
    },
    extend: {
      colors:{
        'regal-blue': '#091e42',
        'other-blue': '#007afb',
        'special-gray': '#787d86',
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