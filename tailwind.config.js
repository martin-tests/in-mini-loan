/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,vue}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter']
    },
    fontSize: {
      '8': '.5rem',
      '9': '.563rem',
      '10': '.625rem',
      '11': '.6875rem',
      '12': '.75rem',
      '13': '.8125rem',
      '14': '.875rem',
      '15': '.9375rem',
      base: '1rem', // 16px
      '17': '1.0625rem',
      '18': '1.125rem',
      '19': '1.1875rem',
      '20': '1.25rem',
      '21': '1.3125rem',
      '22': '1.375rem',
      '23': '1.438rem',
      '24': '1.5rem',
      '26': '1.625rem',
      '27': '1.688rem',
      '28': '1.75rem',
      '30': '1.875rem',
      '32': '2rem',
      '33': '2.063rem',
      '34': '2.125rem',
      '36': '2.25rem',
      '38': '2.375rem',
      '40': '2.5rem',
      '42': '2.625rem',
      '44': '2.75rem',
      '47': '2.938rem',
      '48': '3rem',
      '49': '3.063rem',
      '50': '3.125rem',
      '51': '3.1875rem',
      '54': '3.375rem',
      '55': '3.4375rem',
      '59': '3.6875rem',
      '60': '3.75rem',
      '64': '4rem',
      '65': '4.063rem',
      '68': '4.25rem',
      '70': '4.375rem',
      '72': '4.5rem',
      '80': '5rem',
      '85': '5.313rem',
      '94': '5.875rem',
      '100': '6.25rem'
    },
    lineHeight: (theme) => theme('fontSize'),
    extend: {
      boxShadow: {
        'whitebox': '0px 0px 40px rgba(0, 0, 0, 0.04)'
      },
      colors: {
        'almost-white-lighter': 'var(--color-almost-white-lighter)',
        'light-lavender': '#E3D2FF',
        'night-violet': 'var(--color-night-violet)',
        'pale-khaki': '#D9D4A7',
        'plump-purple': 'var(--color-plump-purple)',
        'plump-purple-lighter': '#BBA8FF',
        'plump-purple-darker': '#9F85FF'
      },
      screens: {
        lg: '1280px'
      },
      maxWidth: {
        xl: '1400px'
      }
    },
  },
  plugins: [],
}

