/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: "#FFD000",
          deep: "#F5B800",
          dark: "#E0A800",
        },
        ink: "#0A0A0A",
        navy: {
          DEFAULT: "#10182D",
          deep: "#0B1120",
        },
        offwhite: "#F7F7F5",
        "light-grey": "#E9EAEC",
        muted: "#686868",
      },
      fontFamily: {
        sans: ['"Inter Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Manrope Variable"', '"Inter Variable"', "sans-serif"],
      },
      maxWidth: {
        container: "100rem", // 1600px — global fluid content cap
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        offset: "10px 10px 0 0 #0A0A0A",
        "offset-sm": "6px 6px 0 0 #0A0A0A",
        "offset-yellow": "10px 10px 0 0 #FFD000",
        card: "0 1px 2px rgba(10,10,10,0.04), 0 12px 32px -12px rgba(10,10,10,0.12)",
        "card-hover": "0 1px 2px rgba(10,10,10,0.05), 0 24px 48px -16px rgba(10,10,10,0.22)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 36s linear infinite",
      },
    },
  },
  plugins: [],
};
