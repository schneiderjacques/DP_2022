/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*/*.{html,js}",
  "./html/*/*.{html,js}",
  './index.html'],
  theme: {
    extend: {
      animation: {
        opac: {
          '0%': { opacity: '0' },
          '100%': { opacity: '100' },
        },
      },
    },
  },
  plugins: [],
}