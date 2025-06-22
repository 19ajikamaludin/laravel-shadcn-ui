import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { Spinner } from './spinner'

export const ModalPreviewFile = ({ modalState }) => {
    const [loading, setLoading] = useState(false)
    const [type, set_type] = useState('')
    const [base64File, setBase64File] = useState(null)
    const [error, setError] = useState(null)
    const [url, set_url] = useState(null)
    const [title, set_title] = useState('')

    const isBase64Image = (base64) => {
        const pattern = /^data:image\/[a-zA-Z]+;base64,/
        return pattern.test(base64)
    }

    useEffect(() => {
        if (modalState.isOpen === true) {
            set_url(modalState.data.url)
            set_title(modalState.data.title)
        }
        if (modalState.isOpen === false) {
            set_url(null)
            setBase64File(null)
            setError(null)
        }
    }, [modalState])

    useEffect(() => {
        const fetchAndConvertToBase64 = async () => {
            setLoading(true)
            try {
                const response = await fetch(url)
                const blob = await response.blob()

                const reader = new FileReader()
                reader.onloadend = () => {
                    const isImage = isBase64Image(reader.result)
                    set_type(isImage === true ? 'image' : 'other')
                    setBase64File(reader.result)
                    setLoading(false)
                }
                reader.readAsDataURL(blob)
                setError(null)
            } catch (error) {
                setLoading(false)
                setError(`'Error fetching image:' ${error}`)
            }
        }

        if (url !== null) {
            fetchAndConvertToBase64()
        }
    }, [url])

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
                    {loading && (
                        <div className="flex w-full justify-center">
                            <Spinner className="my-36 h-20 w-20" />
                        </div>
                    )}
                    {base64File !== null && (
                        <a
                            href={url}
                            target="_blank"
                        >
                            {type !== 'image' ? (
                                <iframe
                                    src={base64File}
                                    className="h-[80vh] w-full object-fill"
                                />
                            ) : (
                                <img
                                    src={base64File}
                                    className="h-[80vh] w-full object-fill"
                                />
                            )}
                        </a>
                    )}
                    {error && <span>{error}</span>}
                </div>
            </DialogContent>
        </Dialog>
    )
}
