/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "txt-pri-color": "var(--txt-pri-color)",
        "btn-color": "var(--btn-color)",
        "btn-color-hover": "var(--btn-color-hover)",
      },
      height: {
        "10%": "10%",
        90: "90vh",
        95: "95vh",
      },
    },
  },
  plugins: [],
};
