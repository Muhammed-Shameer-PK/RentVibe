/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0f172a',
          lighter: '#1e293b',
          darker: '#070b14'
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669'
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(16, 185, 129, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
