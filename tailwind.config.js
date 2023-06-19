/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        _main: '#000000',
        _white: '#ffffff',
        _gray: {
          808080: '#808080',
          C2C2C2: '#C2C2C2',
          F9F9F9: '#F9F9F9',
          F7F7F7: '#F7F7F7',
          border: '#F2F2F2',
          select: '#FCFBFC',
        }
      }
    },
  },
  plugins: [],
}
