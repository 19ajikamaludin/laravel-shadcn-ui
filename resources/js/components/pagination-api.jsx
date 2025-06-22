import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Pagination as BasePagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { SelectArray } from './select-option'

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

export const PaginationApi = ({ links: { links, data, per_page, from, to, total }, page, onPageChange, limit = false }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length <= 3) return null

    const indexOfActive = links.findIndex((i) => i.active)

    return (
        <div className={`flex w-full flex-col justify-start gap-1 md:flex-row ${limit ? 'md:justify-between' : 'md:justify-center'}`}>
            {from && to && total && limit && (
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <div className="text-sm text-gray-500">
                        Menampilkan {from} hinga {to} dari {total}
                    </div>
                </div>
            )}
            <div className={`flex flex-row items-center gap-2`}>
                <BasePagination>
                    <PaginationContent>
                        {links
                            .filter((link, index) => {
                                const labelNum = parseInt(link.label)

                                // Keep navigation buttons (Next, Previous, etc.)
                                if (isNaN(labelNum)) return true

                                // Keep first 3, last 2, and current page +/- 1
                                return (
                                    labelNum <= 1 ||
                                    link.active ||
                                    index === indexOfActive - 1 ||
                                    index === indexOfActive + 1 ||
                                    index === indexOfActive - 2 ||
                                    index === indexOfActive + 2 ||
                                    index === links.length - 2
                                )
                            })
                            .map(({ active, label, url }, index) => {
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
                {limit && (
                    <div className="flex flex-row items-center gap-1">
                        <SelectArray
                            value={per_page}
                            options={[...new Set([20, 50, 100, per_page])].sort((x, y) => x - y)}
                            onChange={(limit) => {
                                onPageChange(1, { limit })
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
