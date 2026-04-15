/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#283370',
        secondary: '#1C2450',

        text_primary: '#F6F7F9'
      }
    }
  },
  plugins: []
}
