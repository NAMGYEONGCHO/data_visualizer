/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dblue': '#1E213A',
        'light-blue': '#3C47E9',
        'light-gray': '#A09FB1',
        darkSidebar: {
          text: 'white',
          background: 'black',
        },
        sidebar: {
          text: 'black',
          background: ' #f3e5bc',
        },
      },
      backgroundColor: {
        light: '#f3e5bc',
        sunlight: 'FFFF07',
      },
      backgroundImage: theme => ({
        //'img': "url('/src/assets/img.svg')",
      }),
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}

