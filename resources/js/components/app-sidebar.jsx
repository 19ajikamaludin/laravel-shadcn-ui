import { Link, usePage } from '@inertiajs/react'

import AppLogo from '@/components/app-logo'
import { NavFooter } from '@/components/nav-footer'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { filterAllowedMenu } from '@/lib/utils'

const footerNavItems = [
    //
]

export function AppSidebar() {
    const {
        props: {
            auth: { user },
            navigation,
        },
    } = usePage()

    const menus = navigation.filter((item) => {
        return filterAllowedMenu(user, item)
    })

    return (
        <Sidebar
            // collapsible="icon" // disable this to maximize sidebar
            variant="inset"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                        >
                            <Link href="/dashboard">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={menus} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter
                    items={footerNavItems}
                    className="mt-auto"
                />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
