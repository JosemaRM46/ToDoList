import { Verified } from '@mui/icons-material';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000d10',
        background2: '#04161a',
        bgTab: '#00262f',
        bgBlack: '#000d10',
        customGrey: '#d8edf2',
      }
    },
  },
  plugins: [],
}

