import { Transition } from '@headlessui/react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'

import { Button } from '@/components/button'
import { TextInput } from '@/components/text-input'
import { route } from '@/hooks/use-route'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'

const breadcrumbs = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
]

export default function Profile({ mustVerifyEmail, status }) {
    const { auth } = usePage().props

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    })

    const submit = (e) => {
        e.preventDefault()

        patch(route('profile.update'), {
            preserveScroll: true,
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <header>
                        <h3 className="mb-0.5 text-base font-medium">Profile information</h3>
                        <p className="text-muted-foreground text-sm">Update your name and email address</p>
                    </header>
                    <form
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <TextInput
                            name="name"
                            value={data.name}
                            label="Name"
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            className="mt-1 block w-full"
                        />

                        <div className="grid gap-2">
                            <TextInput
                                name="email"
                                value={data.email}
                                label="Email address"
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                className="mt-1 block w-full"
                            />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button loading={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}
