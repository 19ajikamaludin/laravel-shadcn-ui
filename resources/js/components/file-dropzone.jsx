import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { cn, showToast } from '@/lib/utils'
import { usePage } from '@inertiajs/react'
import axios from 'axios'
import { Loader2, Upload } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

export function FileDropzone({ maxFiles = 20, onFilesAdded, className, dir = '/', mimes = '', filemimes = '', compress = false }) {
    const {
        props: { auth },
    } = usePage()

    const [isDragging, setIsDragging] = useState(false)
    const [percent, setPercent] = useState(0)
    const [loading, set_loading] = useState(false)
    const [files, setFiles] = useState([])
    const [error, setError] = useState(null)
    const fileInputRef = useRef(null)

    const handleFilesAdded = (newFiles) => {
        set_loading(true)
        const formData = new FormData()
        formData.append('filemimes', filemimes)
        formData.append('mimes', mimes)
        formData.append('dir', dir)
        formData.append('compress', compress)

        newFiles.map((f) => formData.append('uploads[]', f))

        axios
            .post(route('api.file.stores'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: auth.jwt_prefix + auth.jwt_token,
                },
                onUploadProgress: function (progressEvent) {
                    setPercent(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                },
            })
            .then((response) => {
                onFilesAdded(response.data)
            })
            .catch((error) => {
                setError(error.response.data.message)
            })
            .finally(() => {
                set_loading(false)
                if (fileInputRef.current) {
                    fileInputRef.current.value = '' // Reset the input
                }
            })
    }

    const handleDragEnter = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }, [])

    const handleDragOver = useCallback(
        (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (!isDragging) {
                setIsDragging(true)
            }
        },
        [isDragging],
    )

    const validateFiles = useCallback(
        (fileList) => {
            setError(null)

            if (loading) {
                showToast('sedang memperoses file mohon tunggu hingga selesai', 'error')
                return false
            }

            if (fileList.length > maxFiles) {
                showToast(`maksimal hanya dapat men-upload ${maxFiles} file secara bersamaan `, 'error')
                return false
            }
            // upload
            return true
        },
        [files.length, loading],
    )

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(false)

            const droppedFiles = Array.from(e.dataTransfer.files)

            if (validateFiles(droppedFiles)) {
                setFiles(droppedFiles)
                handleFilesAdded(droppedFiles)
            }
        },
        [files, handleFilesAdded, validateFiles],
    )

    const handleFileInputChange = useCallback(
        (e) => {
            if (e.target.files && e.target.files.length > 0) {
                const selectedFiles = Array.from(e.target.files)

                if (validateFiles(selectedFiles)) {
                    setFiles(selectedFiles)
                    handleFilesAdded(selectedFiles)
                }
            }
        },
        [files, handleFilesAdded, validateFiles],
    )

    const openFileDialog = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }, [])

    const handlePasteFromClipboard = useCallback(async () => {
        try {
            // Check if clipboard API is available
            if (!navigator.clipboard || !navigator.clipboard.read) {
                setError('Clipboard API tidak didukung di browser ini')
                return
            }

            // Read from clipboard
            const clipboardItems = await navigator.clipboard.read()
            const imageFiles = []

            for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                    if (type.startsWith('image/')) {
                        const blob = await clipboardItem.getType(type)

                        // Create a more descriptive filename for pasted images
                        const timestamp = new Date().toISOString().replace(/[-:.]/g, '').substring(0, 14)
                        const file = new File([blob], `screenshot-${timestamp}.png`, { type: blob.type })

                        imageFiles.push(file)
                    }
                }
            }

            // If we have valid images, validate and add them
            if (imageFiles.length > 0 && validateFiles(imageFiles)) {
                setFiles(imageFiles)
                handleFilesAdded(imageFiles)
            } else if (imageFiles.length === 0) {
                setError('Tidak ada gambar di clipboard')
            }
        } catch (err) {
            console.error('Error reading clipboard:', err)
            setError('Gagal membaca clipboard. Pastikan ada gambar di clipboard.')
        }
    }, [files, handleFilesAdded, validateFiles])

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <div
                        className={cn(
                            'relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
                            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50',
                            className,
                        )}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={openFileDialog}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileInputChange}
                            className="hidden"
                        />

                        {loading ? (
                            <>
                                <Loader2 className="text-primary mb-3 h-10 w-10 animate-spin" />
                                <p className="text-muted-foreground mb-2 text-center text-sm">
                                    <span className="font-semibold">Memproses file {percent}%...</span>
                                </p>
                                <p className="text-muted-foreground text-center text-xs">Mohon tunggu sebentar</p>
                            </>
                        ) : (
                            <>
                                <Upload className="text-muted-foreground mb-3 h-10 w-10" />
                                <p className="text-muted-foreground mb-2 text-center text-sm">
                                    <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                                </p>
                                <p className="text-muted-foreground text-center text-xs">
                                    Mendukung drop file dari aplikasi lain (WhatsApp, dll) atau klik kanan untuk paste
                                </p>
                            </>
                        )}

                        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={openFileDialog}>Pilih File</ContextMenuItem>
                    <ContextMenuItem onClick={handlePasteFromClipboard}>Paste Screenshot</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    )
}
