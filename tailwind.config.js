module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    color: {},
    colors: {
      "gray-1": "#a1a6b6",
      "gray-2": "#6b7185",
      "gray-3": "#ff49db",
      "gray-4": "#282b39",
      "gray-5": "#242735",
      "gray-6": "#11131b",
      "primary-1": "#99c1f8",
      "primary-2": "#6ea7f5",
      "primary-3": "#3a3f50",
      "primary-4": "#046cfc",
      "primary-5": "#004eba",
      "primary-6": "#1c2f50",
      black: "000",
      yellow: "#ffc82c",
      white: "#ffffff",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
      spacing: {
        /* Customize spacing */
      },
      screens: {
        sm: "100px",
        // => @media (min-width: 640px) { ... }

        md: "768px",

        "2md": "900px",
        // => @media (min-width: 768px) { ... }

        lg: "1120px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};

/*
    --space-0: 0px;
    --space-4: 4px;
    --space-8: 8px;
    --space-12: 12px;
    --space-16: 16px;
    --space-20: 20px;
    --space-24: 24px;
    --space-28: 28px;
    --space-32: 32px;
    --space-36: 36px;
    --space-40: 40px;
    --font-size-10: 10px;
    --font-size-12: 12px;
    --font-size-14: 14px;
    --font-size-16: 16px;
    --font-size-20: 20px;
    --font-size-24: 24px;
    --font-size-28: 28px;
    --font-size-40: 40px;
    --line-height-14: 14px;
    --line-height-16: 16px;
    --line-height-20: 20px;
    --line-height-24: 24px;
    --line-height-28: 28px;
    --line-height-32: 32px;
    --line-height-42: 42px;
    --letter-spacing-1: 1px;

    */
