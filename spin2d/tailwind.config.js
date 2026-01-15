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
          50: '#fef7ee',
          100: '#fdecd7',
          200: '#fad5ae',
          300: '#f6b77b',
          400: '#f19046',
          500: '#ed7321',
          600: '#de5917',
          700: '#b84315',
          800: '#933619',
          900: '#772f18',
        },
        available: '#22c55e',
        reserved: '#eab308',
        sold: '#ef4444',
        selected: '#6b7280',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
