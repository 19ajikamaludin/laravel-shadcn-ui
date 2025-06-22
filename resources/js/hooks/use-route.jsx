import { Ziggy } from '@/ziggy.js'
import { useRoute } from 'ziggy-js'

let route = null
// this condition only happen on npm run build
if (import.meta.env.VITE_APP_ENV === 'production') {
    route = useRoute(Ziggy)
    console.log(['using generated ziggy prod'])
} else {
    route = useRoute()
    console.log(['using generated ziggy from header script'])
}

export { route }
