import { Link } from '@inertiajs/react'
import {
    AudioWaveform,
    BookOpen,
    Bot,
    ChevronRight,
    Command,
    Frame,
    GalleryVerticalEnd,
    LayoutGrid,
    Minus,
    PieChart,
    Plus,
    Settings2,
    SquareTerminal,
    TableProperties,
    UsersRound,
    BookText,
    CircleDollarSignIcon,
    Car,
    Bike,
    ShoppingCart,
    FileText,
    Warehouse,
} from 'lucide-react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'

const Icons = {
    AudioWaveform: AudioWaveform,
    BookOpen: BookOpen,
    Bot: Bot,
    ChevronRight: ChevronRight,
    Command: Command,
    Frame: Frame,
    GalleryVerticalEnd: GalleryVerticalEnd,
    LayoutGrid: LayoutGrid,
    Minus: Minus,
    PieChart: PieChart,
    Plus: Plus,
    Settings2: Settings2,
    SquareTerminal: SquareTerminal,
    UsersRound: UsersRound,
    TableProperties: TableProperties,
    BookText: BookText,
    CircleDollarSignIcon: CircleDollarSignIcon,
    Car: Car,
    Bike: Bike,
    ShoppingCart: ShoppingCart,
    FileText: FileText,
    Warehouse: Warehouse,
}

export const ItemIcon = ({ icon, ...rest }) => {
    const Component = Icons[icon]

    return <Component {...rest} />
}

const GroupMenu = ({ item }) => {
    return (
        <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.active}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <ItemIcon icon={item.icon} />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={subItem.active}
                                >
                                    <Link href={subItem.route}>
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}

const SingleMenu = ({ item }) => {
    return (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
                asChild
                isActive={item.active}
            >
                <Link
                    href={item.route}
                    prefetch
                >
                    {item.icon && <ItemIcon icon={item.icon} />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

const DefineMenu = ({ item }) => {
    if ('label' in item) {
        return <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
    }

    if ('items' in item) {
        return <GroupMenu item={item} />
    }

    return <SingleMenu item={item} />
}

export function NavMain({ items = [] }) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <DefineMenu
                        item={item}
                        key={item.title}
                    />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
