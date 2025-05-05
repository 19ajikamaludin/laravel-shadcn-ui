import { useEffect, useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { EllipsisVertical, Pencil, Trash } from 'lucide-react'

import AppLayout from '@/layouts/app-layout'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import {
    Button,
    SearchInput,
    Pagination,
    HasPermission,
    ModalConfirm,
} from '@/components/index'
import { useModal } from '@/hooks/use-modal'

import FormModal from './form-modal'

const breadcrumbs = [
    {
        title: 'Permission',
        href: route('permissions.index'),
    },
]

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const formModal = useModal()
    const confirmModal = useModal()

    const toggleFormModal = (permission = null) => {
        formModal.setData(permission)
        formModal.toggle()
    }

    const handleDeleteClick = (permission) => {
        confirmModal.setData(permission)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('permissions.destroy', confirmModal.data.id))
        }
    }

    const params = { q: search }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permission" />

            <div>
                <Card>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex justify-between">
                                <HasPermission p="create-permission">
                                    <Button onClick={() => toggleFormModal()}>
                                        Tambah
                                    </Button>
                                </HasPermission>
                                <div className="flex items-center">
                                    <SearchInput
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        value={search}
                                    />
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Label</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((permission) => (
                                        <TableRow key={permission.id}>
                                            <TableCell className="font-medium">
                                                {permission.name}
                                            </TableCell>
                                            <TableCell>
                                                {permission.label}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <EllipsisVertical />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <HasPermission p="update-permission">
                                                            <DropdownMenuItem
                                                                asChild
                                                            >
                                                                <div
                                                                    className="flex space-x-2"
                                                                    onClick={() =>
                                                                        toggleFormModal(
                                                                            permission
                                                                        )
                                                                    }
                                                                >
                                                                    <Pencil />
                                                                    <span>
                                                                        Edit
                                                                    </span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        </HasPermission>
                                                        <HasPermission p="delete-permission">
                                                            <DropdownMenuItem
                                                                asChild
                                                            >
                                                                <div
                                                                    className="flex space-x-2"
                                                                    onClick={() =>
                                                                        handleDeleteClick(
                                                                            permission
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash />
                                                                    <span>
                                                                        Delete
                                                                    </span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        </HasPermission>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                links={links}
                                params={params}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <ModalConfirm
                modalState={confirmModal}
                onConfirm={onDelete}
            />
            <FormModal modalState={formModal} />
        </AppLayout>
    )
}
