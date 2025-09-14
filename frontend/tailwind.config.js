/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./styling/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        backgroundGreen: "#9FB4B0",
        okGreen: "#5caa3dff",
        lighterGreen: "#C8DAD7",
        primary: "#19493aff", 
        secondary: "#1E4496", 
        accent: "#EC4899",
      },
    },
  },
  plugins: [],
}

