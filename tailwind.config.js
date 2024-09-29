/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        95: "95%", // Custom width for 95%
      },
    },
  },
  plugins: [],
};
