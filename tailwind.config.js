/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#94BDC9',
          2: '#4D90A4',
          3: '#90D0D9'
        },
        main: '#00008C',
        btn: '#140AAA',
        grays: '#A0A0A0',
        table: '#F5F5F5'
      },
      fontFamily: {
        'CenturyGothic': ['CenturyGothic'],
        'HiraginoKakuGothicProNW3': ['HiraginoKakuGothicProNW3'],
        'NotoSansCJKjp-Regular': ['NotoSansCJKjp-Regular'],
      },
      screens: {
        'sp': { 'max': '768px' }
      },
      extend: {},
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

