import containerQueriesPlugin from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,ts,tsx}'],
  plugins: [containerQueriesPlugin],
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
        'orange-12': '#582D1D',

        'crimson-1': '#FFFCFD',
        'crimson-2': '#FEF7F9',
        'crimson-3': '#FFE9F0',
        'crimson-4': '#FEDCE7',
        'crimson-5': '#FACEDD',
        'crimson-6': '#F3BED1',
        'crimson-7': '#EAACC3',
        'crimson-8': '#E093B2',
        'crimson-9': '#E93D82',
        'crimson-10': '#DF3478',
        'crimson-11': '#CB1D63',
        'crimson-12': '#621639',

        'purple-1': '#FEFCFE',
        'purple-2': '#FBF7FE',
        'purple-3': '#F7EDFE',
        'purple-4': '#F2E2FC',
        'purple-5': '#EAD5F9',
        'purple-6': '#E0C4F4',
        'purple-7': '#D1AFEC',
        'purple-8': '#BE93E4',
        'purple-9': '#8E4EC6',
        'purple-10': '#8347B9',
        'purple-11': '#8145B5',
        'purple-12': '#402060',

        'jade-1': '#FBFEFD',
        'jade-2': '#F4FBF7',
        'jade-3': '#E6F7ED',
        'jade-4': '#D6F1E3',
        'jade-5': '#C3E9D7',
        'jade-6': '#ACDEC8',
        'jade-7': '#8BCEB6',
        'jade-8': '#56BA9F',
        'jade-9': '#29A383',
        'jade-10': '#26997B',
        'jade-11': '#208368',
        'jade-12': '#1D3B31',

        'green-1': '#FBFEFC',
        'green-2': '#F4FBF6',
        'green-3': '#E6F6EB',
        'green-4': '#D6F1DF',
        'green-5': '#C4E8D1',
        'green-6': '#ADDDC0',
        'green-7': '#8ECEAA',
        'green-8': '#5BB98B',
        'green-9': '#30A46C',
        'green-10': '#2B9A66',
        'green-11': '#218358',
        'green-12': '#193B2D',

        'red-1': '#FFFCFC',
        'red-2': '#FFF7F7',
        'red-3': '#FEEBEC',
        'red-4': '#FFDBDC',
        'red-5': '#FFCDCE',
        'red-6': '#FDBDBE',
        'red-7': '#F4A9AA',
        'red-8': '#EB8E90',
        'red-9': '#E5484D',
        'red-10': '#DC3E42',
        'red-11': '#CE2C31',
        'red-12': '#641723',
      },
      fontFamily: {
        nexa: ['var(--font-nexa)', ...defaultTheme.fontFamily.sans],
        inter: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        sourceSerif4: ['var(--font-sourceSerif4)', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        90: '5.625rem',
        26: '1.625rem',
        32: '2rem',
      },
      lineHeight: {
        18: '1.125rem',
        14: '0.875rem',
      },
      keyframes: {
        confetti: {
          '0%, 100%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        confetti: 'confetti 2s ease-in-out infinite',
      },
    },
  },
} satisfies Config;
