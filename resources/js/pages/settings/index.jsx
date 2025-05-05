import { Head, useForm } from '@inertiajs/react'

import { Button, FormFile, TextInput } from '@/components/index'
import { Card, CardContent } from '@/components/ui/card'
import AppLayout from '@/layouts/app-layout'

const extractValue = (set, key) => {
    const find = set.find((s) => s.key === key)
    if (find) {
        if (find.type === 'image') {
            return find?.url
        }
        return find?.value
    }
    return ''
}

const breadcrumbs = [
    {
        title: 'Setting',
        href: '/setting',
    },
]

export default function Index({ settings }) {
    // const app_logo_url = extractValue(settings, 'app_logo')
    const { data, setData, post, processing, errors } = useForm({
        app_name: extractValue(settings, 'app_name') ?? '',
        app_logo: '',
    })

    const handleOnChange = (e) => {
        const { name, type, checked, value } = e.target
        setData(name, type === 'checkbox' ? (checked ? 1 : 0) : value)
    }

    const handleSubmit = () => {
        post(route('setting.update'))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Setting" />

            <div>
                <Card>
                    <CardContent>
                        <div className="text-base-content mb-4 text-xl font-bold">
                            Setting
                        </div>
                        <div className="space-y-6">
                            <TextInput
                                name="app_name"
                                value={data.app_name}
                                onChange={handleOnChange}
                                label="App Name"
                                error={errors.app_name}
                            />

                            <FormFile
                                label={'App Logo'}
                                onChange={(file_path) =>
                                    setData('app_logo', file_path)
                                }
                                error={errors.app_logo}
                                filemimes="image/jpg,image/jpeg,image/png"
                            />
                        </div>
                        <div className="mt-4">
                            <Button
                                loading={processing}
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
