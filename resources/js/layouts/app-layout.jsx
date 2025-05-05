import { useEffect } from 'react'
import { Toaster } from 'sonner'

import { useAppearance } from '@/hooks/use-appearance'
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout'
import { showToast } from '@/lib/utils'
import { usePage } from '@inertiajs/react'

export default ({ children, breadcrumbs, ...props }) => {
    const {
        props: { flash },
    } = usePage()

    const { appearance } = useAppearance()

    useEffect(() => {
        if (flash.message !== null) {
            showToast(flash.message.message, flash.message.type)
        }
    }, [flash])

    return (
        <AppLayoutTemplate
            breadcrumbs={breadcrumbs}
            {...props}
        >
            {children}

            <Toaster
                theme={appearance}
                richColors="true"
                toastOptions={{
                    duration: 3000,
                    dismissible: true,
                }}
            />
        </AppLayoutTemplate>
    )
}
