import { Head } from '@inertiajs/react'

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import AppLayout from '@/layouts/app-layout'
import { formatIDR } from '@/lib/utils'

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
]

export default function Dashboard(props) {
    const { user_count, role_count } = props

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid grid-cols-2 gap-2 rounded-xl md:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            <div>Users</div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatIDR(user_count)}</div>
                    </CardContent>
                </Card>
                <Card className="shadow">
                    <CardHeader>
                        <CardDescription>
                            <span>Roles </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatIDR(role_count)}</div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
