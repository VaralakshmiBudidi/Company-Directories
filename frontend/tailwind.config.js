/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'textBlue': '#6D8EE8',
        'textDark': '#5B5B5B',
        'textBlack': '#3A3A3A',
        'sidebarBg': '#DBE6F8',
        'layoutBg': '#CCD5EC',
        'primary': '#0C3C73',    // Blue
        'secondary': '#10B981',  // Green
        'sideBg': '#DDE4EC',
      },
      fontSize: {
        'font10': 'clamp(0.625rem, 0.625rem + 0vw, 0.625rem)',
        'font11': 'clamp(0.6875rem, 0.6875rem + 0vw, 0.6875rem)',
        'font12': 'clamp(0.75rem, 0.75rem + 0vw, 0.75rem)',
        'font13': 'clamp(0.8125rem, 0.8125rem + 0vw, 0.8125rem)',
        'font14': 'clamp(0.875rem, 0.875rem + 0vw, 0.875rem)',
        'font15': 'clamp(0.9375rem, 0.9375rem + 0vw, 0.9375rem)',
        'font16': 'clamp(1rem, 1rem + 0vw, 1rem)',
        'font17': 'clamp(1.0625rem, 1.0625rem + 0vw, 1.0625rem)',
        'font18': 'clamp(1.125rem, 1.125rem + 0vw, 1.125rem)',
        'font19': 'clamp(1.1875rem, 1.1875rem + 0vw, 1.1875rem)',
        'font20': 'clamp(1.25rem, 1.25rem + 0vw, 1.25rem)',
        'font21': 'clamp(1.3125rem, 1.3125rem + 0vw, 1.3125rem)',
        'font22': 'clamp(1.375rem, 1.375rem + 0vw, 1.375rem)',
        'font23': 'clamp(1.4375rem, 1.4375rem + 0vw, 1.4375rem)',
        'font24': 'clamp(1.5rem, 1.5rem + 0vw, 1.5rem)',
      },
    },
  },
  plugins: [],
}
