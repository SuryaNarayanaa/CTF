const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
 
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = theme("colors");
  let flattenedColors = flattenColors(allColors);
  let newVars = Object.fromEntries(
    Object.entries(flattenedColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

function flattenColors(colors, prefix = '') {
  return Object.keys(colors).reduce((acc, key) => {
    const value = colors[key];
    const newKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object') {
      Object.assign(acc, flattenColors(value, newKey));
    } else {
      acc[newKey] = value;
    }

    return acc;
  }, {});
}