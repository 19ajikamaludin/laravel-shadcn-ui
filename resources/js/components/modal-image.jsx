import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'

export const ModalImage = ({ modalState }) => {
    const [url, set_url] = useState(null)
    const [title, set_title] = useState('')

    useEffect(() => {
        if (modalState.isOpen === true) {
            set_url(modalState.data.url)
            set_title(modalState.data.title)
        }
        if (modalState.isOpen === false) {
            set_url(null)
        }
    }, [modalState])

    return (
        <Dialog
            open={modalState.isOpen}
            onOpenChange={modalState.toggle}
        >
            <DialogContent className="md:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div>
                    {url && (
                        <a
                            href={url}
                            target="_blank"
                        >
                            <img
                                src={url}
                                className="object-fill
"
                                alt="gambar sedang di proses"
                            />
                        </a>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
