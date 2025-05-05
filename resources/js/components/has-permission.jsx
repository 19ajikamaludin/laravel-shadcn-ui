import { hasPermission } from '@/lib/utils'
import { usePage } from '@inertiajs/react'

export function HasPermission({ p, children }) {
    const {
        props: { auth },
    } = usePage()

    const has = hasPermission(auth, p)

    if (has) {
        return children
    }
}
