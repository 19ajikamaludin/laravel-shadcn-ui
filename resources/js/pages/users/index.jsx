import { Head, router } from '@inertiajs/react'
import { EllipsisVertical, Pencil, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePrevious } from 'react-use'

import { Button, HasPermission, ModalConfirm, Pagination, SearchInput } from '@/components/index'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useModal } from '@/hooks/use-modal'
import AppLayout from '@/layouts/app-layout'

import { route } from '@/hooks/use-route'
import FormModal from './form-modal'

const breadcrumbs = [
    {
        title: 'Users',
        href: route('users.index'),
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

    const toggleFormModal = (user = null) => {
        formModal.setData(user)
        formModal.toggle()
    }

    const handleDeleteClick = (product) => {
        confirmModal.setData(product)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('users.destroy', confirmModal.data.id))
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
            <Head title="Users" />

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex justify-between">
                                <HasPermission p="create-user">
                                    <Button onClick={() => toggleFormModal()}>Tambah</Button>
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
                                        <TableHead>Role</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.role ? user.role.name : 'System'}</TableCell>
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
                                                        <HasPermission p="update-user">
                                                            <DropdownMenuItem asChild>
                                                                <div
                                                                    className="flex space-x-2"
                                                                    onClick={() => toggleFormModal(user)}
                                                                >
                                                                    <Pencil />
                                                                    <span>Edit</span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        </HasPermission>
                                                        <HasPermission p="delete-user">
                                                            <DropdownMenuItem asChild>
                                                                <div
                                                                    className="flex space-x-2"
                                                                    onClick={() => handleDeleteClick(user)}
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
            <FormModal modalState={formModal} />
        </AppLayout>
    )
}
