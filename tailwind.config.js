/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'system-ui', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'system-ui', 'serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'system-ui', 'sans-serif'],
        chinese: ['"Noto Sans SC"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"WenQuanYi Micro Hei"', 'sans-serif'],
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

