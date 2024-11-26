/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true, //center container by default
    },
    // screens: { //App breakpoints
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1280px',
    //   '2xl': '1536px',
    // },
    extend: {},
  },
  plugins: [],
}

