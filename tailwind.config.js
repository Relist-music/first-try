/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        switzer: ['Switzer', 'sans-serif'],
        apfel: ['Apfel Grotezk', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
};
