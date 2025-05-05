import AuthLayoutTemplate from '@/layouts/auth/auth-card-layout'
import { usePage } from '@inertiajs/react'

export default function AuthLayout({ children, title, description, ...props }) {
    const {
        props: {
            app: { app_name },
        },
    } = usePage()
    return (
        <AuthLayoutTemplate
            title={app_name}
            description={description}
            {...props}
        >
            {children}
        </AuthLayoutTemplate>
    )
}
