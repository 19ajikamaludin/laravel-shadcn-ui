import { usePage } from '@inertiajs/react'

export default function AppLogo() {
    const {
        props: {
            app: { app_name },
        },
    } = usePage()
    return (
        <>
            <div className="ml-1 grid flex-1">
                <span className="text-left text-3xl mb-0.5 truncate leading-none font-bold tracking-widest">
                    {app_name}
                </span>
            </div>
        </>
    )
}
