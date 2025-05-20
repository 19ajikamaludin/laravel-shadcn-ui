import { usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/button'
import { InputError } from '@/components/input-error'
import { Modal } from '@/components/modal'
import { PaginationApi } from '@/components/pagination-api'
import { SearchInput } from '@/components/search-input'
import { Spinner } from '@/components/spinner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useDebounce } from '@/hooks/use-debounce'
import { useModal } from '@/hooks/use-modal'
import { usePaginationApi } from '@/hooks/use-pagination-api'

/**
 *
 * @param {*} props
 * @returns
 *
 * Example :
 * <SelectModalInput
 *     label="Role"
 *     value={data.role}
 *     onChange={(item) =>
 *         setData({
 *             ...data,
 *             role_id: item ? item.id : null,
 *         })
 *     }
 *     onRemove={() => setData({...data, role_id: null })}
 *     error={errors.role_id}
 *     params={{
 *         table: 'roles',
 *         columns: 'id|name',
 *         orderby: 'updated_at.desc',
 *     }}
 * />
 */
export function ModalSelectInput(props) {
    const {
        props: { auth },
    } = usePage()

    const {
        label,
        error,
        value,
        onChange,
        onRemove,
        params,
        placeholder = '',
        readOnly = false,
        additionalButton = null,
        size = 'md',
    } = props

    const [headers] = useState(
        params.columns.split('|').filter((i) => i !== 'id')
    )

    const [table_headers, setTableHeaders] = useState([])
    const [table_header_alias, setTableHeaderAlias] = useState([])

    const [selected, setSelected] = useState('')

    const [search, setSearch] = useState('')
    const q = useDebounce(search, 750)

    const selectModal = useModal()

    const [data, fetch, loading] = usePaginationApi(auth, {
        table: params.table,
        display_name: params.columns,
        raw_query: params.raw_query,
        orderby: params.orderby,
        limit: params.limit,
        q: q,
        pagination: 'true',
    })

    const showRemoveBtn = typeof onRemove === 'function' && !isEmpty(selected)

    const handleItemSelected = (item) => {
        onChange(item)
        selectModal.toggle()
    }

    useEffect(() => {
        if (isEmpty(params.headers) === true) {
            setTableHeaders(params.columns.split('|').filter((i) => i !== 'id'))
            setTableHeaderAlias(
                params.columns.split('|').filter((i) => i !== 'id')
            )
            return
        }
        setTableHeaders(
            params.headers.split('|').map((_, index) => {
                return params.columns.split('|').filter((i) => i !== 'id')[
                    index
                ]
            })
        )
        setTableHeaderAlias(
            params.headers
                .split('|')

                .map((i) => {
                    if (i.includes('.')) {
                        return i.split('.')[1]
                    }
                    return i
                })
        )
    }, [params])

    // in state isOpen change
    useEffect(() => {
        if (selectModal.isOpen) {
            fetch(1)
        }
    }, [])

    // in searching
    useEffect(() => {
        fetch(1, { q })
    }, [q])

    useEffect(() => {
        if (isEmpty(value) === false) {
            let display_name = headers
            if (isEmpty(params.display_name) === false) {
                display_name = params.display_name.split('|')
            }

            setSelected(
                display_name
                    .filter((h) => isEmpty(value[h]) === false)
                    .map((h) => {
                        return value[h]
                    })
                    .join(' - ')
            )
        } else {
            setSelected('')
        }
    }, [value])

    const showRemoveBtnAndReadOnly = readOnly === false && showRemoveBtn

    return (
        <>
            <div className="grid gap-2">
                {label && (
                    <Label
                        htmlFor={label}
                        className={`${error && 'text-red-600'}`}
                    >
                        {label}
                    </Label>
                )}
                <div className="flex flex-row gap-1">
                    <Input
                        id={label}
                        value={selected}
                        onClick={readOnly ? null : selectModal.toggle}
                        placeholder={placeholder}
                        readOnly={true}
                    />

                    {showRemoveBtnAndReadOnly && (
                        <Button
                            onClick={onRemove}
                            variant="outline"
                            size="icon"
                        >
                            <X />
                        </Button>
                    )}

                    {additionalButton && <div>{additionalButton}</div>}
                </div>
                <InputError message={error} />
            </div>
            <Modal
                modalState={selectModal}
                title={label}
                size={size}
            >
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {loading ? (
                    <div className="mt-3 flex h-36 w-full items-center justify-center gap-4">
                        <Spinner />
                        <div>Loading </div>
                    </div>
                ) : (
                    <div className="w-full overflow-y-auto">
                        <Table className={'mt-3'}>
                            <TableHeader>
                                <TableRow>
                                    {table_header_alias.map((h) => (
                                        <TableHead
                                            className="capitalize"
                                            key={`header-${h}`}
                                        >
                                            {h}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.data?.map((item) => (
                                    <TableRow
                                        onClick={() => handleItemSelected(item)}
                                        key={item.id}
                                    >
                                        {table_headers.map((h) => (
                                            <TableCell key={`${item.id}-${h}`}>
                                                {item[h]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="mt-2 flex w-full justify-center overflow-x-clip">
                            <PaginationApi
                                links={data}
                                page={data.current_page}
                                onPageChange={fetch}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}
