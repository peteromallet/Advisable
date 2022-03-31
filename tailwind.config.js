module.exports = {
  content: [
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/views/**/*",
    "./donut/src/**/*.js",
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
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
