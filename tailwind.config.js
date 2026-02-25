export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'summa-indigo': '#20126E',
        'summa-fuchsia': '#D50057',
        'summa-aqua': '#00C8C8',
        'summa-blue': '#0064D2',
        'summa-green': '#00AA5B',
        'summa-white': '#FFFFFF',
        'summa-light': '#F4F4F4',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
