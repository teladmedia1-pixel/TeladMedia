/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070D1F',
          900: '#0B132B',
          800: '#1C2541',
          700: '#243057',
          600: '#2D3D6E',
        },
        corporate: {
          blue: '#3A86C8',
          'blue-dark': '#2A6FAE',
          'blue-light': '#5B9FD8',
        },
        surface: {
          white: '#FFFFFF',
          gray: '#F8F9FA',
          'gray-mid': '#F1F3F5',
          border: '#E8ECF0',
          'border-dark': '#D0D8E4',
        },
        text: {
          primary: '#0B132B',
          secondary: '#3D4F6B',
          muted: '#6B7C99',
          light: '#9BACC0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
