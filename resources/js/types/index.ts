export interface App {
    app_name: string
    app_logo: string
}
export interface Auth {
    user: User
    login_at: string
    jwt_token: string
    jwt_prefix: string
}

export interface BreadcrumbItem {
    title: string
    href: string
}

export interface NavGroup {
    title: string
    items: NavItem[]
}

export interface NavItem {
    title: string
    route: string
    icon?: string
    active?: boolean
    permission?: string | boolean
    items?: NavItem[]
    [key: string]: unknown // This allows for additional properties...
}

export interface FlashMessage {
    message?: string
    [key: string]: unknown // This allows for additional properties...
}

export interface SharedData {
    auth: Auth
    flash: FlashMessage
    app: App
    navigation: NavItem[]
    [key: string]: unknown // This allows for additional properties...
}

export interface Permission {
    name: string
    label: string
    [key: string]: unknown // This allows for additional properties...
}

export interface Role {
    name: string
    permissions: Permission[]
    [key: string]: unknown // This allows for additional properties...
}

export interface User {
    id: number
    name: string
    email: string
    avatar?: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
    role: Role
    [key: string]: unknown // This allows for additional properties...
}

export interface Setting {
    key: string
    value: string
    type: string
    url: string
    [key: string]: unknown // This allows for additional properties...
}
