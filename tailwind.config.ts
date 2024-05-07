import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        }

      },
      animation: {
        'shifting' : 'shift 2s linear infinite',
        'slide': 'slide 10s linear infinite'
      },
    },
  },
  plugins: [],
};
export default config;
