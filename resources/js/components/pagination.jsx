import { router } from '@inertiajs/react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import qs from 'qs'

import { Button } from '@/components/ui/button'
import { Pagination as BasePagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'

const PageLink = ({ active, label, url, params }) => {
    const onClick = () => {
        router.get(
            `${url}&${qs.stringify(params)}`,
            {},
            {
                replace: true,
                preserveState: true,
            },
        )
    }

    if (label === '&laquo; Previous') {
        return (
            <PaginationItem>
                <Button
                    variant="ghost"
                    onClick={onClick}
                >
                    <ChevronLeftIcon />
                </Button>
            </PaginationItem>
        )
    }
    if (label == 'Next &raquo;') {
        return (
            <PaginationItem>
                <Button
                    variant="ghost"
                    onClick={onClick}
                >
                    <ChevronRightIcon />
                </Button>
            </PaginationItem>
        )
    }

    return (
        <PaginationItem>
            <Button
                onClick={onClick}
                variant={`${active ? 'outline' : 'ghost'}`}
            >
                {label}
            </Button>
        </PaginationItem>
    )
}

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
    if (label === '&laquo; Previous') {
        return (
            <PaginationItem>
                <Button variant="ghost">
                    <ChevronLeftIcon className="opacity-30" />
                </Button>
            </PaginationItem>
        )
    }
    if (label == 'Next &raquo;') {
        return (
            <PaginationItem>
                <Button variant="ghost">
                    <ChevronRightIcon className="opacity-30" />
                </Button>
            </PaginationItem>
        )
    }
    return (
        <PaginationItem>
            <Button variant="ghost">{label}</Button>
        </PaginationItem>
    )
}

export const Pagination = ({ links = [], params = null }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length === 3) return null
    return (
        <BasePagination>
            <PaginationContent>
                {links.map(({ active, label, url }, index) => {
                    return url === null ? (
                        <PageInactive
                            key={`${label}-${index}`}
                            label={label}
                        />
                    ) : (
                        <PageLink
                            key={label}
                            label={label}
                            active={active}
                            url={url}
                            params={params}
                        />
                    )
                })}
            </PaginationContent>
        </BasePagination>
    )
}
