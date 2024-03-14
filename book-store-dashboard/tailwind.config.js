/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    // Any additional plugins you want to include can be added here
  ],
  theme: {
    extend: {},
  },
};
