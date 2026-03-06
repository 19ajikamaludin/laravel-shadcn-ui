import inertia from '@inertiajs/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react({ fastRefresh: false }),
        tailwindcss(),
        inertia(),
    ],
    esbuild: {
        sourcemap: false,
        jsx: 'automatic',
    },
    build: {
        sourcemap: false, // no source maps
        rollupOptions: {
            output: {
                manualChunks: {
                    lodash: ['lodash'],
                    sonner: ['sonner'],
                    recharts: ['recharts'],
                },
            },
        },
        chunkSizeWarningLimit: '579kB',
    },
    server: {
        host: true,
        port: 5173,
        hmr: {
            host: 'localhost', // or your Docker host IP
        },
        watch: {
            usePolling: true,
            interval: 1000, // increase polling interval to reduce CPU
        },
    },
})
