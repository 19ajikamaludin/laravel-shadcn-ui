import { useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'

import { Button, Modal, TextInput } from '@/components/index'
import { route } from '@/hooks/use-route'

export default function FormModal(props) {
    const { modalState } = props
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        label: '',
    })

    const handleOnChange = (e) => {
        const { name, type, checked, value } = e.target
        setData(name, type === 'checkbox' ? (checked ? 1 : 0) : value)
    }

    const handleReset = () => {
        modalState.setData(null)
        reset()
        clearErrors()
    }

    const handleClose = () => {
        handleReset()
        modalState.toggle()
    }

    const handleSubmit = () => {
        const permission = modalState.data
        if (permission !== null) {
            put(route('permissions.update', permission), {
                onSuccess: () => handleClose(),
            })
            return
        }
        post(route('permissions.store'), {
            onSuccess: () => handleClose(),
        })
    }

    useEffect(() => {
        const permission = modalState.data
        if (isEmpty(permission) === false) {
            setData(permission)
            return
        }
    }, [modalState])

    return (
        <Modal
            modalState={modalState}
            onClose={handleClose}
            title={'Permission'}
        >
            <div className="space-y-6">
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    label="Nama"
                    error={errors.name}
                />
                <TextInput
                    name="label"
                    value={data.label}
                    onChange={handleOnChange}
                    label="Label"
                    error={errors.label}
                />
            </div>
            <div className="my-4 flex items-center space-x-2">
                <Button
                    onClick={handleSubmit}
                    loading={processing}
                >
                    Save
                </Button>
                <Button
                    onClick={handleClose}
                    variant="secondary"
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}
