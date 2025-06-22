import '../css/app.css'

import ErrorBoundary from '@/components/error-baundry'
import { initializeTheme } from '@/hooks/use-appearance'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import './bootstrap'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(
            <ErrorBoundary>
                <App {...props} />
            </ErrorBoundary>,
        )
    },
    progress: {
        color: 'oklch(0.505 0.213 27.518)',
    },
})

// This will set light / dark mode on load...
initializeTheme()
