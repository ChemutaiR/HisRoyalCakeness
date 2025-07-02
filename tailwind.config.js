/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          primary: '#92400e', // amber-800
          secondary: '#fef3c7', // amber-100
          dark: '#78350f', // amber-900
        },
      },
      fontFamily: {
        'work-sans': ['var(--font-work-sans)'],
        'pacifico': ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
} 