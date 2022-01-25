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
        },
    },
    plugin: [
        // eslint-disable-next-line global-require
        require('@tailwindcss/forms'),
        require('@savvywombat/tailwindcss-grid-areas'),

        // add custom variant for expanding sidebar
        plugin(({ addVariant, e }) => {
            addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
                modifySelectors(
                    ({ className }) =>
                        `.sidebar-expanded .${e(
                            `sidebar-expanded${separator}${className}`
                        )}`
                )
            })
        }),
    ],
}
