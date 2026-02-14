/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hope Education Brand Colors
        primary: '#8B388D', // Hope Purple (main brand color)
        'primary-dark': '#280F2E', // Deep Purple
        'primary-light': '#E1CBE0', // Light Lavender
        secondary: '#FFC05C', // Orange/Gold accent
        cream: '#FAFAF7', // Off-white background
        danger: '#ef4444', // Red (keep for warnings)
        warning: '#f59e0b', // Orange
        success: '#10b981', // Green
      },
      fontFamily: {
        'sans': ['Source Sans Pro', 'Sofia Pro', 'system-ui', 'sans-serif'],
        'heading': ['Oswald', 'Karla', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
