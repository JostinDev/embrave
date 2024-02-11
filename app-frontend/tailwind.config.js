/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'sand-1': '#FDFDFC',
        'sand-2': '#F9F9F8',
        'sand-3': '#F1F0EF',
        'sand-4': '#E9E8E6',
        'sand-5': '#E2E1DE',
        'sand-6': '#DAD9D6',
        'sand-7': '#CFCECA',
        'sand-8': '#BCBBB5',
        'sand-9': '#8D8D86',
        'sand-10': '#82827C',
        'sand-11': '#63635E',
        'sand-12': '#21201C'
      },
      fontSize: {
        '90': '5.625rem',
        '32': '2rem',
      },
      lineHeight: {
        '18': '1.125rem',
        '14': '0.875rem',
      },
    },
    fontFamily: {
      'nexa-light': ['nexa-light', 'sans-serif'],
      'nexa-book': ['nexa-book', 'sans-serif'],
      'nexa-bold': ['nexa-bold', 'sans-serif'],

      'nexa-black-i': ['nexa-black-i', 'sans-serif'],

      'inter-book': ['inter-book', 'sans-serif'],
      'inter-medium': ['inter-medium', 'sans-serif'],
      'inter-bold': ['inter-bold', 'sans-serif'],
      'inter-heavy': ['inter-heavy', 'sans-serif'],
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
