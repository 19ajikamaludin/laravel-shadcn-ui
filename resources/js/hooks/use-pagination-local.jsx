import { useMemo, useState } from 'react'

export function usePaginationLocal(data, limit) {
    const [current_page, set_current_page] = useState(1)

    const total_pages = Math.ceil(data.length / limit)

    const paginated_data = useMemo(() => {
        const start = (current_page - 1) * limit
        return data.slice(start, start + limit)
    }, [data, limit, current_page])

    const links = useMemo(() => {
        const delta = 1
        const range = []
        const left = Math.max(2, current_page - delta)
        const right = Math.min(total_pages - 1, current_page + delta)

        range.push({ label: '&laquo; Previous', active: false, url: current_page === 1 ? null : 'prev' })
        range.push({ label: 1, active: current_page === 1, url: 1 })

        if (left > 2) range.push({ label: '...', active: false, url: null })
        for (let i = left; i <= right; i++) {
            range.push({ label: i, active: current_page === i, url: i })
        }
        if (right < total_pages - 1) range.push({ label: '...', active: false, url: null })
        if (total_pages > 1) range.push({ label: total_pages, active: current_page === total_pages, url: total_pages })
        range.push({ label: 'Next &raquo;', active: false, url: current_page === total_pages ? null : 'next' })

        return range
    }, [current_page, total_pages])

    const goToPage = (page) => {
        set_current_page(page)
    }

    return {
        paginated_data,
        current_page,
        total_pages,
        links,
        goToPage,
    }
}
