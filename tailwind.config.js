/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#352356",
        secondary: "#ffaa00",
        basic: "#EFE5DB",
        error: "#c92d59",
        cost: "#c32e58"
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['geakosa-regular', 'serif'],
        handwriting: ['Autography', 'sans-serif']
      }
    },
  },
  plugins: [],
}

