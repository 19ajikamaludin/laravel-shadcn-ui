import AppLayout from '@/layouts/app-layout'

const breadcrumbs = [
    {
        title: 'Maintenance',
        href: '/maintance',
    },
]

const Maintance = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full w-full">
                <div className="p-6 shadow-md">
                    <h2 className="text-2xl font-bold">System Status</h2>
                    <p className="mt-2 text-sm text-gray-600">This page is under maintenance, please check back later.</p>
                </div>
            </div>
        </AppLayout>
    )
}

export default Maintance
