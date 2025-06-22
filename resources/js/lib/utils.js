import { clsx } from 'clsx'
import { addDays, format, parseISO, startOfMonth, subMonths } from 'date-fns'
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

export const todayDate = () => {
    return formatStandartDate(new Date())
}

export const formatDateTime = (date) => {
    if (isEmpty(date)) {
        return ''
    }
    return format(date, 'dd/MM/yyyy HH:mm:ss')
}

export const converToDate = (date) => {
    if (isEmpty(date)) {
        return ''
    }
    return new Date(date)
}

export const getZonePrice = (prices, zone, column) => {
    const price = prices.find((p) => p.zone_id === zone.id)
    if (isEmpty(price) === true) {
        return 0
    }
    return price[column]
}

/**
 *
 * @param {*} date
 * @returns yyyy-MM-ddd
 */
export const formatStandartDate = (date) => {
    if (isEmpty(date)) {
        return ''
    }
    return format(date, 'yyyy-MM-dd')
}

export const getDateLastMonth = () => {
    return startOfMonth(subMonths(new Date(), 1))
}

export const standartDateAddDays = (date, days) => {
    const parsedDate = parseISO(date)
    const newDate = addDays(parsedDate, days)
    const result = format(newDate, 'yyyy-MM-dd')

    return result
}

export const extract_nasted_to_lists = (obj, indent = 0) => {
    const lists = []
    const styles = {
        0: {
            text: 'ml-0 font-bold',
            color: 'bg-primary',
        },
        1: {
            text: 'ml-4 font-semibold',
            color: 'bg-sky-500',
        },
        2: {
            text: 'ml-8',
            color: 'bg-blue-500',
        },
    }
    for (const key in obj) {
        if (key === 'counter') continue

        const current = obj[key]
        if (current && typeof current === 'object' && 'counter' in current) {
            lists.push({
                name: key,
                counter: current.counter,
                indent: indent,
                ...styles[indent],
            })

            lists.push(...extract_nasted_to_lists(current, indent + 1))
        }
    }

    return lists
}
