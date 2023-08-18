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
        primary: {
          light: '#EBE5FC',
          DEFAULT: '#7749F8',
          dark: '#5227CC',
        },
        box: "#1C1C1E",
        back: "#171717",
        input: '#1C1C1E',
        black: '#000000',
      },
    },
    fontFamily: {
      'xero': ['xero', 'sans-serif'],
      'shabnam': ['shanam', 'sans-serif'],
    }
  },
  plugins: [],
}
