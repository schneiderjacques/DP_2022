/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-regal-blue": "#091e42",
        "other-blue": "#007afb",
        "special-gray": "#787d86",
      },
    },
  },
  plugins: [],
};
