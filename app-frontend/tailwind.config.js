/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontFamily: {
      'nexa-thin': ['nexa-thin', 'sans-serif'],
      'nexa-light': ['nexa-light', 'sans-serif'],
      'nexa-book': ['nexa-book', 'sans-serif'],
      'nexa-regular': ['nexa-regular', 'sans-serif'],
      'nexa-bold': ['nexa-bold', 'sans-serif'],
      'nexa-x-bold': ['nexa-x-bold', 'sans-serif'],
      'nexa-heavy': ['nexa-heavy', 'sans-serif'],
      'nexa-black': ['nexa-black', 'sans-serif'],

      'nexa-thin-i': ['nexa-thin-i', 'sans-serif'],
      'nexa-light-i': ['nexa-light-i', 'sans-serif'],
      'nexa-book-i': ['nexa-book-i', 'sans-serif'],
      'nexa-regular-i': ['nexa-regular-i', 'sans-serif'],
      'nexa-bold-i': ['nexa-bold-i', 'sans-serif'],
      'nexa-x-bold-i': ['nexa-x-bold-i', 'sans-serif'],
      'nexa-heavy-i': ['nexa-heavy-i', 'sans-serif'],
      'nexa-black-i': ['nexa-black-i', 'sans-serif'],
    },
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/component/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('@tailwindcss/container-queries'),
    // ...
  ],
}
