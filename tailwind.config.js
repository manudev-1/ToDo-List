/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'opac': 'rgba(0, 0, 0, 0.25)'
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif']
      },
      backgroundImage: {
        'add': 'url(./assets/plus.png)'
      },
      backgroundSize: {
        '5': '1.25rem/* 20px */'
      },
      backgroundPosition: {
        'right-m': 'calc(100% - 10px)'
      },
      dropShadow: {
        'glowing': '0 0 10px #000',
      },
      boxShadow: {
        'insideShadow': 'inset 0 2px 10px #000'
      }
    },
  },
  plugins: [],
}
