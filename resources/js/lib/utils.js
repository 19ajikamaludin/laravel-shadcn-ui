import { clsx } from 'clsx'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const filterAllowedMenu = (user, item) => {
    // item is without permission posible access
    if (item.permission === false) {
        return item
    }

    // user with no role
    if (user.role === null) {
        return item
    }

    // check match permission name
    if ('permission' in item) {
        return user.role.permissions.find((p) => p.name === item.permission) ? item : null
    }

    // check sub item match permission name
    if ('items' in item && item.items) {
        let items = []
        items = item.items.filter((item) => {
            if (item.permission === false) {
                return item
            }

            const exist = user.role.permissions.find((p) => p.name === item.permission)
            if (exist) {
                return item
            }
            return null
        })

        // make parent item open if any sub item is active
        if (items.length > 0) {
            item.active = items.find((item) => item.active === true) ? true : false
            item.items = items
            return item
        }
    }
}

export const hasPermission = (auth, permission) => {
    const { user } = auth
    if (user.role === null) {
        return false
    }

    let has = user.role.permissions.find((item) => item.name === permission)

    if (has) {
        return true
    }

    return false
}

export const showToast = (message, type) => {
    if (type === 'success') {
        toast.success(message)
        return
    }
    if (type === 'error') {
        toast.error(message)
        return
    }
    toast(message)
}

export function formatIDR(amount) {
    if (isEmpty(amount)) {
        return ''
    }
    const idFormatter = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
    return idFormatter.format(amount)
}

export const isEmpty = (value) => {
    return value === '' || value === undefined || value === null
}

export const formatDate = (date) => {
    if (isEmpty(date)) {
        return ''
    }
    return format(date, 'dd/MM/yyyy')
}

export const formatStandartDate = (date) => {
    if (isEmpty(date)) {
        return ''
    }
    return format(date, 'yyyy-mm-dd')
}

export const formatDateTime = (date) => {
    if (isEmpty(date)) {
        return ''
    }
    return format(date, 'DD/MM/YYYY HH:mm:ss')
}

export const converToDate = (date) => {
    if (isEmpty(date)) {
        return ''
    }
    return new Date(date)
}
