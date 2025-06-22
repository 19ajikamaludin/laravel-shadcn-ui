import { Head, Link, router } from '@inertiajs/react'
import { EllipsisVertical, Pencil, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePrevious } from 'react-use'

import { Button, HasPermission, ModalConfirm, Pagination, SearchInput } from '@/components/index'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useModal } from '@/hooks/use-modal'
import { route } from '@/hooks/use-route'
import AppLayout from '@/layouts/app-layout'

const breadcrumbs = [
    {
        title: 'Roles',
        href: route('roles.index'),
    },
]

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModal()

    const handleDeleteClick = (product) => {
        confirmModal.setData(product)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('roles.destroy', confirmModal.data.id))
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
                },
            )
        }
    }, [search])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />

            <div>
                <Card>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex justify-between">
                                <HasPermission p="create-role">
                                    <Link href={route('roles.create')}>
                                        <Button>Tambah</Button>
                                    </Link>
                                </HasPermission>
                                <div className="flex items-center">
                                    <SearchInput
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                    />
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell className="font-medium">{role.name}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                        >
                                                            <EllipsisVertical />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <HasPermission p="update-role">
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    href={route('roles.edit', role.id)}
                                                                    className="flex space-x-2"
                                                                >
                                                                    <Pencil />
                                                                    <span>Edit</span>
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        </HasPermission>
                                                        <HasPermission p="delete-role">
                                                            <DropdownMenuItem asChild>
                                                                <div
                                                                    className="flex space-x-2"
                                                                    onClick={() => handleDeleteClick(role)}
                                                                >
                                                                    <Trash />
                                                                    <span>Delete</span>
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
        </AppLayout>
    )
}
