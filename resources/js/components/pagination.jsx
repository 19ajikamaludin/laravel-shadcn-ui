import { router } from '@inertiajs/react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import qs from 'qs'

import { Button } from '@/components/ui/button'
import { Pagination as BasePagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { route } from '@/hooks/use-route'
import { SelectArray } from './select-option'

const PageLink = ({ active, label, url, params }) => {
    const onClick = () => {
        const { page: _, ...sqstring } = params

        router.get(
            `${url}&${qs.stringify(sqstring)}`,
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

export const Pagination = ({ links = [], params = null, data = null }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length <= 3) return null

    const indexOfActive = links.findIndex((i) => i.active)
    return (
        <div className={`flex w-full flex-col justify-start md:flex-row ${data === null ? 'md:justify-center' : 'md:justify-between'}`}>
            {data !== null && (
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <div className="text-sm text-gray-500">
                        Menampilkan {data.from} hinga {data.to} dari {data.total}
                    </div>
                </div>
            )}
            <div className="flex flex-row items-center gap-2">
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
                                        key={label}
                                        label={label}
                                        active={active}
                                        url={url}
                                        params={
                                            data !== null
                                                ? {
                                                      ...params,
                                                      limit: data.per_page,
                                                  }
                                                : params
                                        }
                                    />
                                )
                            })}
                    </PaginationContent>
                </BasePagination>
                {data !== null && (
                    <div className="flex flex-row items-center gap-1">
                        <SelectArray
                            value={data.per_page}
                            options={[...new Set([20, 50, 100, data.per_page])].sort((x, y) => x - y)}
                            onChange={(e) =>
                                router.get(
                                    route(route().current()),
                                    {
                                        ...params,
                                        limit: e,
                                    },
                                    {
                                        replace: true,
                                        preserveState: true,
                                    },
                                )
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
