const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        lime: colors.lime,
      },
    },
  },
  variants: {},
  plugins: [],
};
