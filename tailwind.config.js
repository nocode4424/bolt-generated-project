/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        secondary: '#3B82F6',
        accent: '#EFF6FF',
        text: '#334155',
      },
    },
  },
  plugins: [],
}
