import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    extend: {
      screens: {
        'em': '10px',
        '3xs': '150px',
        '2xs': '250px',
        'xs': '350px',
      },
      colors: {
        'rich-sky': '#041825',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ],
        simiar: [
          "0 0px 5px rgba(255,255, 255, 0.35)",
          "0 0px 30px rgba(255, 255,255, 0.2)"
        ]
        
      },
      keyframes: {
        shift: {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(10px)' },
        },
        slide: {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(85%)' },
        },
        loading: {
          '0%': { transform: `rotate(0deg)` },
          '100%': { transform: `rotate(360deg)` },
        },
      },
      
      animation: {
        'shifting' : 'shift 2s linear infinite',
        'slide': 'slide 10s linear infinite',
        'loading-spin': 'slide 1s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
