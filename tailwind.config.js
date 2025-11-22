/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans SC"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', '"Segoe UI"', 'Roboto', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        serif: ['"Noto Serif SC"', '"Noto Sans SC"', 'serif'],
        display: ['"Noto Sans SC"', 'sans-serif'],
      },
      colors: {
        mexico: {
          green: '#006847',
          white: '#FFFFFF',
          red: '#CE1126',
          gold: '#FFD700',
          'green-dark': '#004d33',
          'red-dark': '#9b0d1c',
        },
      },
    },
  },
  plugins: [],
}

