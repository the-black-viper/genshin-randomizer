/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const { fontFamily, screens } = require("tailwindcss/defaultTheme");
const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
      "-moz-backface-visibility": "visible",
      "-webkit-backface-visibility": "visible",
      "-ms-backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
      "-moz-backface-visibility": "hidden",
      "-webkit-backface-visibility": "hidden",
      "-ms-backface-visibility": "hidden",
    },
  });
});

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(0deg)",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".rotate-y-180n": {
      transform: "rotateY(-180deg)",
    },
  });
});

const perspective = plugin(function ({ addUtilities }) {
  addUtilities({
    ".perspective-800": {
      perspective: "800px",
    },
    ".perspective-1000": {
      perspective: "1000px",
    },
  });
});

const transform3d = plugin(function ({ addUtilities }) {
  addUtilities({
    ".transform3d-preserve": {
      transformStyle: "preserve-3d",
    },
  });
});

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        ...screens,
      },
      colors: {
        "card-back-amber": "#a09073",
        "card-front-amber": "#bda037",
        "primary-bg-dark": "#12021b",
      },
      fontFamily: {
        sans: ["var(--font-genshin)", ...fontFamily.sans],
      },
      translate: {
        "hide-toast": "-120%",
        "show-toast": "5%",
      },
      boxShadow: {
        "inner-white": "0 0 5px white",
      },
    },

    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      6: "6px",
      8: "8px",
      10: "10px",
    },
  },
  plugins: [backfaceVisibility, rotateY, transform3d, perspective],
};
