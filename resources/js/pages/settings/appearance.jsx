import { Head } from '@inertiajs/react'

import AppearanceTabs from '@/components/appearance-tabs'

import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'

const breadcrumbs = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
]

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <header>
                        <h3 className="mb-0.5 text-base font-medium">Appearance settings</h3>
                        <p className="text-muted-foreground text-sm">Update your account's appearance settings</p>
                    </header>
                    <div className="w-fit rounded bg-neutral-100 dark:bg-neutral-800">
                        <AppearanceTabs />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}
