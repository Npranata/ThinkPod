// tailwind.config.js
module.exports = {
  content: [
    "./index.html",                 
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  plugins: [
    require("@tailwindcss/typography"),
  ],
  theme: {
    extend: {
      colors:{
        'gray-rgba': 'rgba(245,228,204,0.5)',
        'soft-white': 'rgba(255, 255, 255, 1)',
        'soft-gray': 'rgba(238,238,228, 1)'
      },
      fontFamily:{
        gruppo: ['Gruppo']
      },
      keyframes:{
        fadeIn: {
          '0%': {opacity : '0'},
          '100%': {opacity : '1'}
        },
        fadeOut: {
          '100%': {opacity : '1'},
          '0%': {opacity : '0'}
        }
      },
      animation:{
        fadeIn: 'fadeIn 0.25s ease-in',
        fadeOut: 'fadeOut 0.5s ease-out'
      }
    },
  },
  plugins: [],
};
