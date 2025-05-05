import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Pagination as BasePagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'

const PageLink = ({ active, label, page, onPageChange }) => {
    if (label === '&laquo; Previous') {
        return (
            <PaginationItem>
                <Button
                    variant="ghost"
                    onClick={() => onPageChange(+page - 1)}
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
                    onClick={() => onPageChange(+page + 1)}
                >
                    <ChevronRightIcon />
                </Button>
            </PaginationItem>
        )
    }

    return (
        <PaginationItem>
            <Button
                onClick={() => onPageChange(label)}
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

export const PaginationApi = ({ links, page, onPageChange }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.links.length === 3) return null
    return (
        <BasePagination>
            <PaginationContent>
                {links.links.map(({ active, label, url }, index) => {
                    return url === null ? (
                        <PageInactive
                            key={`${label}-${index}`}
                            label={label}
                        />
                    ) : (
                        <PageLink
                            key={`${label}-${index}`}
                            label={label}
                            active={active}
                            page={page}
                            onPageChange={onPageChange}
                        />
                    )
                })}
            </PaginationContent>
        </BasePagination>
    )
}
