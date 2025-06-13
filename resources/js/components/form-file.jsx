import { usePage } from '@inertiajs/react'
import axios from 'axios'
import { isEmpty } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { InputError } from '@/components/input-error'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Download } from 'lucide-react'

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <FormFile
 *    label={'App Logo'}
 *    onChange={(file_path) => setData('app_logo', file_path)}
 *    error={errors.app_logo}
 *    url={app_logo_url}
 *    filemimes="image"
 *    dir="tmp"
 * />
 *
 */
export function FormFile({ label, onChange, error, preview, help, url, filemimes = '', mimes = '', dir = null, compress = false }) {
    const {
        props: { auth },
    } = usePage()
    const inputRef = useRef()

    const className = error ? 'text-red-600' : ''

    const [name, setName] = useState('No file chosen')
    const [link, setLink] = useState(null)
    const [loading, setLoading] = useState(false)
    const [percent, setPercent] = useState(0)

    const handleClick = () => {
        if (loading) {
            return
        }
        inputRef.current.click()
    }

    const handleOnChange = (e) => {
        if (isEmpty(e.target.files)) {
            console.log(['FormFile', 'target file empty'])
            return
        }

        setLoading(true)

        const formData = new FormData()
        formData.append('filemimes', filemimes)
        formData.append('mimes', mimes)
        formData.append('file_binary', e.target.files[0])
        formData.append('dir', dir)
        formData.append('compress', compress)

        axios
            .post(route('api.file.store'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: auth.jwt_prefix + auth.jwt_token,
                },
                onUploadProgress: function (progressEvent) {
                    setPercent(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                },
            })
            .then((response) => {
                onChange(response.data.name)
                setLink(response.data.url)
                setName(response.data.name_original)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
            .finally(() => {
                setLoading(false)
                if (inputRef.current) {
                    inputRef.current.value = ''
                }
            })
    }

    useEffect(() => {
        setLink(url)
    }, [url])

    return (
        <div className="grid w-full gap-2">
            {label && (
                <Label
                    htmlFor={label}
                    className={className}
                >
                    {label}
                </Label>
            )}
            {preview && preview}

            <div className="flex w-full items-center">
                <Button
                    onClick={handleClick}
                    className="rounded-r-none"
                    variant="outline"
                >
                    {loading ? <Spinner /> : ' Choose File'}
                </Button>
                <Input
                    onClick={handleClick}
                    type="text"
                    id={label}
                    value={`${loading ? `${percent}% Uploading . . .` : name}`}
                    readOnly
                    className={`w-full rounded-l-none`}
                />
                {link && (
                    <a
                        className="ml-2 text-xs underline"
                        href={link}
                        target="_blank"
                        title="Download"
                    >
                        <Button
                            variant="outline"
                            size="icon"
                        >
                            <Download />
                        </Button>
                    </a>
                )}
            </div>

            <input
                id={label}
                className="hidden"
                type="file"
                onChange={handleOnChange}
                ref={inputRef}
            />
            {help && (
                <div>
                    <span className="text-xs underline">{help}</span>
                </div>
            )}
            <InputError message={error} />
        </div>
    )
}
