const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {},
      keyframes: {},
      dropShadow: {
        brShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        a: {
          blue: "#32449C",
          orange: "#EF8B16",
          green: "#01C875",
          red: "#E2445B",
          white: "#F9F9F9",
          black: "#393939",
          grey: "#D9D9D9",
          darkgrey: "#C2C2C2",
          lightgrey: "#f0f0f0",
        },
        h: {
          blue: "#253375",
          orange: "#b7690d",
          green: "#019658",
          red: "#bf1e35",
          white: "#bbbbbb",
          black: "#2b2b2b",
          grey: "#a3a3a3",
          darkgrey: "#919191",
          lightgrey: "#575757",
        },
      },
    },
    screens: {
      xs: "375px",
      ss: "425px",
      sm: "768px",
      md: "1024px",
      lg: "1440px",
      xl: "1560px",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
