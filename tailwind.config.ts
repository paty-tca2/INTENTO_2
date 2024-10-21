import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'coneria': ['Coneria Script', 'cursive'],
        'geometos': ['Geometos Soft', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif']
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
      }
    },
  },
  plugins: [],


  
};
export default config;
