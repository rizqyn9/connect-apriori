const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'dark-1': '#252836',
                'dark-2': '#1F1D2B',
                'dark-line': '#393C49',
                form: '#2D303E',
                primary: '#EA7C69',
                secondary: '#9288E0',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                active: '0 0px 10px #EA7C69',
            },
        },
    },
    plugins: [
        // eslint-disable-next-line global-require
        require('@tailwindcss/aspect-ratio'),
    ],
}
