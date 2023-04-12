/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "item-green": "rgba(183, 255,165, .6)",
      },
    },
  },
  plugins: [],
};
