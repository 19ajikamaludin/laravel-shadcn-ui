import { AppContent } from '@/components/app-content'
import { AppShell } from '@/components/app-shell'
import { AppSidebar } from '@/components/app-sidebar'
import { AppSidebarHeader } from '@/components/app-sidebar-header'

export default function AppSidebarLayout({ children, breadcrumbs = [] }) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="p-4">{children}</div>
            </AppContent>
        </AppShell>
    )
}
