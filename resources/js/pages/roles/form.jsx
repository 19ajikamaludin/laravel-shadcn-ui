import { Head, Link, router, usePage } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'

import { Button, InputError, TextInput } from '@/components/index'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { route } from '@/hooks/use-route'
import AppLayout from '@/layouts/app-layout'

const breadcrumbs = [
    {
        title: 'Roles',
        href: route('roles.index'),
    },
    {
        title: 'Form',
        href: '#',
    },
]

export default function Role(props) {
    const {
        props: { errors },
    } = usePage()
    const { permissions, role } = props

    const [processing, setProcessing] = useState(false)

    const [name, setName] = useState('')
    const [permins, setPermins] = useState(permissions)

    const handleCheckPermission = (g, n) => {
        setPermins(
            Object.fromEntries(
                Object.entries(permins).map(([group, items]) => [
                    group,
                    items.map((item) => ({
                        ...item,
                        checked: g === group && item.name === n ? !item.checked : item.checked,
                    })),
                ]),
            ),
        )
    }

    const handleCheckAll = (checked) => {
        setPermins(
            Object.fromEntries(
                Object.entries(permins).map(([group, items]) => [
                    group,
                    items.map((item) => ({
                        ...item,
                        checked: checked,
                    })),
                ]),
            ),
        )
    }

    const handleCheckGroup = (g, checked) => {
        setPermins(
            Object.fromEntries(
                Object.entries(permins).map(([group, items]) => [
                    group,
                    items.map((item) => ({
                        ...item,
                        checked: g === group ? checked : item.checked,
                    })),
                ]),
            ),
        )
    }

    const handleSubmit = () => {
        const payload = {
            name: name,
            permissions: Object.values(permins)
                .flat()
                .filter((item) => item.checked),
        }

        if (isEmpty(role) === false) {
            router.put(route('roles.update', role), payload, {
                onStart: () => setProcessing(true),
                onFinish: (e) => {
                    setProcessing(false)
                },
            })
            return
        }
        router.post(route('roles.store'), payload, {
            onStart: () => setProcessing(true),
            onFinish: (e) => {
                setProcessing(false)
            },
        })
    }

    useEffect(() => {
        if (!isEmpty(role)) {
            setName(role.name)
            setPermins(
                Object.fromEntries(
                    Object.entries(permissions).map(([group, items]) => [
                        group,
                        items.map((item) => {
                            return {
                                ...item,
                                checked: role.permissions.find((permit) => permit.name === item.name) !== undefined,
                            }
                        }),
                    ]),
                ),
            )
        }
    }, [role])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div>
                <Card>
                    <CardContent>
                        <div className="flex flex-col justify-between gap-4">
                            <TextInput
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label="Nama"
                                error={errors.name}
                            />
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center space-x-3 pl-2">
                                    <Checkbox
                                        id="check-all"
                                        onCheckedChange={handleCheckAll}
                                    />
                                    <Label htmlFor="check-all">Check All</Label>
                                </div>
                                {Object.keys(permins).map((group) => (
                                    <div
                                        key={group}
                                        className="flex flex-col gap-2 rounded border border-gray-400 p-2"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id={`check-${group}`}
                                                onCheckedChange={(e) => handleCheckGroup(group, e)}
                                            />
                                            <Label
                                                htmlFor={`check-${group}`}
                                                className="font-extrabold opacity-60"
                                            >
                                                {group}
                                            </Label>
                                        </div>
                                        <div
                                            className={`grid grid-cols-1 gap-2 md:grid-cols-4 ${
                                                errors.permissions ? 'border-red-600' : 'border-gray-400 dark:border-gray-700'
                                            }`}
                                        >
                                            {permins[group].map((item) => (
                                                <div
                                                    className="flex items-center space-x-3"
                                                    key={item.id}
                                                >
                                                    <Checkbox
                                                        id={item.label}
                                                        checked={item.checked}
                                                        onCheckedChange={() => handleCheckPermission(group, item.name)}
                                                    />
                                                    <Label
                                                        htmlFor={item.label}
                                                        className={'font-light'}
                                                    >
                                                        {item.label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <InputError message={errors.permissions} />
                            </div>

                            <div className="flex items-center">
                                <div className="flex space-x-2">
                                    <Button
                                        onClick={handleSubmit}
                                        loading={processing}
                                    >
                                        Save
                                    </Button>
                                    <Link href={route('roles.index')}>
                                        <Button variant="secondary">Back</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
