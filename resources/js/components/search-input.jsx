import { TextInput } from '@/components/text-input'
import { Search } from 'lucide-react'

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example:
 * <SearchInput
 *   onChange={(e) => setSearch(e.target.value)}
 *   value={search}
 * />
 */
export function SearchInput({ onChange, value }) {
    return (
        <TextInput
            onChange={onChange}
            value={value}
            type="search"
            placeholder="Search..."
            className="pl-8"
            icon={<Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />}
        />
    )
}
