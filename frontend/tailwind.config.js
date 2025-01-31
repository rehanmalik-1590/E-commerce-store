/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        heart: "heart 0.5s ease-in-out", // Custom heart animation
      },
      keyframes: {
        heart: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "25%": { transform: "scale(1.2) rotate(15deg)" },
          "50%": { transform: "scale(1.4) rotate(-15deg)" },
          "75%": { transform: "scale(1.2) rotate(15deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
