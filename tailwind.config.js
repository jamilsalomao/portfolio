/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
  content: ["./index.html", "./src//*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
            blue: {
                50: '#eef2ff',
                100: '#e0e7ff',
                200: '#c7d2fe',
                300: '#a5b4fc',
                400: '#818cf8',
                500: '#6366f1',
                600: '#4f46e5',
                700: '#4338ca',
                800: '#3730a3',
                900: '#312e81',
            }
        },
        animation: {
            'fade-in': 'fadeIn 1s ease-in-out',
            'slide-up': 'slideUp 0.5s ease-out',
            'slide-down': 'slideDown 0.5s ease-out',
            'slide-left': 'slideLeft 0.5s ease-out',
            'slide-right': 'slideRight 0.5s ease-out',
            'bounce-slow': 'bounce 3s infinite',
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
            },
            slideUp: {
                '0%': { transform: 'translateY(50px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            slideDown: {
                '0%': { transform: 'translateY(-50px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            slideLeft: {
                '0%': { transform: 'translateX(50px)', opacity: '0' },
                '100%': { transform: 'translateX(0)', opacity: '1' },
            },
            slideRight: {
                '0%': { transform: 'translateX(-50px)', opacity: '0' },
                '100%': { transform: 'translateX(0)', opacity: '1' },
            },
        }
    }
},

  plugins: [],
};
