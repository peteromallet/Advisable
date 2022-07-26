const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/views/**/*",
    "./donut/src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["p22-mackinac-pro", defaultTheme.fontFamily.serif],
      },
      colors: {
        neutral50: "#F9F9F9",
        neutral100: "#EEEEF0",
        neutral200: "#E2E2E4",
        neutral300: "#CCCCD1",
        neutral400: "#AFAFB5",
        neutral500: "#8F8F97",
        neutral600: "#6A6A73",
        neutral700: "#51515E",
        neutral800: "#353541",
        neutral900: "#1C1C25",
        blue50: "#F0F5FF",
        blue100: "#DEE9FF",
        blue200: "#B2CDFF",
        blue300: "#759CF9",
        blue400: "#4374F0",
        blue500: "#0049E1",
        blue600: "#113ACB",
        blue700: "#0127A9",
        blue800: "#021D77",
        blue900: "#031142",
        purple50: "#F8F5FF",
        purple100: "#EEE8FF",
        purple200: "#D2C2FE",
        purple300: "#A587F3",
        purple400: "#8C69E8",
        purple500: "#6A33E7",
        purple600: "#4D1FC9",
        purple700: "#3B159F",
        purple800: "#2B0F76",
        purple900: "#1B0751",
      },
      borderRadius: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
      transitionProperty: {
        height: "height",
      },
      boxShadow: {
        feed: "0 2px 4px rgba(0, 0, 0, 0.08), 0px 4px 16px 0px rgba(0, 0, 0, 0.04)",
        articleCard:
          "0px 12px 40px -12px rgba(0, 0, 0, 0.12), 0px 2px 8px rgba(0, 0, 0, 0.04)",
        sm: "0 1px 2px 1px rgb(0 0 0 / 0.05)",
        base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 2px 6px -1px rgb(0 0 0 / 0.1), 0 0px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 3px 15px -3px rgb(0 0 0 / 0.1), 0 1px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 8px 25px -5px rgb(0 0 0 / 0.1), 0 3px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 10px 50px -12px rgb(0 0 0 / 0.25)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    // This snippet defines each color in the tailwind config as a CSS variable
    // on :root. This can be useful when you want to use a color outside of what
    // tailwind provides. e.g working with SVG's.
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};
