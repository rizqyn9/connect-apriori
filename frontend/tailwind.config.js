const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                violet: colors.violet,
                blue: {
                    50: '#f3f8f9',
                    100: '#daf1fa',
                    200: '#afe0f5',
                    300: '#7cc2e7',
                    400: '#479ed3',
                    500: '#357dc0',
                    600: '#2d62a9',
                    700: '#254a87',
                    800: '#1b3260',
                    900: '#101f3f',
                },
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.5' }],
                sm: ['0.875rem', { lineHeight: '1.5715' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
                lg: [
                    '1.125rem',
                    { lineHeight: '1.5', letterSpacing: '-0.01em' },
                ],
                xl: [
                    '1.25rem',
                    { lineHeight: '1.5', letterSpacing: '-0.01em' },
                ],
                '2xl': [
                    '1.5rem',
                    { lineHeight: '1.33', letterSpacing: '-0.01em' },
                ],
                '3xl': [
                    '1.88rem',
                    { lineHeight: '1.33', letterSpacing: '-0.01em' },
                ],
                '4xl': [
                    '2.25rem',
                    { lineHeight: '1.25', letterSpacing: '-0.02em' },
                ],
                '5xl': [
                    '3rem',
                    { lineHeight: '1.25', letterSpacing: '-0.02em' },
                ],
                '6xl': [
                    '3.75rem',
                    { lineHeight: '1.2', letterSpacing: '-0.02em' },
                ],
            },
            screens: {
                xs: '480px',
            },
            borderWidth: {
                3: '3px',
            },
            minWidth: {
                36: '9rem',
                44: '11rem',
                56: '14rem',
                60: '15rem',
                72: '18rem',
                80: '20rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            zIndex: {
                60: '60',
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
