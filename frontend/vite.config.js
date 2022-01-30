import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
    plugins: [reactRefresh()],
    root: '.',
    // assetsInclude: ['*'],
    envDir: '/',
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
