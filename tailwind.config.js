/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      Poppins: "Poppins"
    },
    extend: {
      colors: {
        Teal: "#2F6C6D",
        HummingBird: "#d1f1ee",
        yellow: "#e4d63b",
        Solitude: "#e9e9ea",
        // gray: "#4B4B4C"
      },
      animation: {
        slide: "slide 25s linear infinite"
      },
      keyframes: {
        slide: {
          "0%,100%" : {transform: "translateX(5%)"},
          "50%": {transform: "translateX(-120%)"}
        }
      }
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
}