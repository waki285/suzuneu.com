/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/js/**/*.tsx"],
  jit: true,
  darkMode: "class",
  theme: {
    extend: {
      height: {
        "dscreen": "100dvh",
      }
    },
  },
  plugins: [],
}
