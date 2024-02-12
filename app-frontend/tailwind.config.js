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
        'sand-12': '#21201C',

        'sky-1': '#F9FEFF',
        'sky-2': '#F1FAFD',
        'sky-3': '#E1F6FD',
        'sky-4': '#D1F0FA',
        'sky-5': '#BEE7F5',
        'sky-6': '#A9DAED',
        'sky-7': '#8DCAE3',
        'sky-8': '#60B3D7',
        'sky-9': '#7CE2FE',
        'sky-10': '#74DAF8',
        'sky-11': '#00749E',
        'sky-12': '#1D3E56',

        'orange-1': '#FEFCFB',
        'orange-2': '#FFF7ED',
        'orange-3': '#FFEFD6',
        'orange-4': '#FFDFB5',
        'orange-5': '#FFD19A',
        'orange-6': '#FFC182',
        'orange-7': '#F5AE73',
        'orange-8': '#EC9455',
        'orange-9': '#F76B15',
        'orange-10': '#EF5F00',
        'orange-11': '#CC4E00',
        'orange-12': '#582D1D'
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
