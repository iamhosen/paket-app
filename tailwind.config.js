/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',

    },
    extend: {
      colors: {
        'primary-paket': '#EB5340',
        'box-paket': '#1F1F1F',
        'bg-paket': '#171717',
        'bg-input-paket': '#1C1C1E',
      },
    },
    fontFamily: {
      'xero': ['xero', 'sans-serif'],
    }
  },
  plugins: [],
}
