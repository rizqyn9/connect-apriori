import { defineConfig } from 'vite'
import { resolve } from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    root: '.',
    assetsInclude: ['*'],
    // build: {
    //     rollupOptions: {
    //         output: {
    //             entryFileNames: `assets/[name].js`,
    //             chunkFileNames: `assets/[name].js`,
    //             assetFileNames: `src/static/[name].[ext]`,
    //         },
    //     },
    // },
})
