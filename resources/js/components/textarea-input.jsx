import { forwardRef } from 'react'

import { InputError } from '@/components/input-error'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

/**
 * Example :
 * <TextareaInput
 *     name="name"
 *     value={name}
 *     label="Name"
 *     onChange={(e) => setName(e.target.value)}
 * />
 *
 */
const TextareaInput = forwardRef((props, ref) => {
    const { label, error, icon, ...inputProps } = props

    const className = error ? 'text-red-600' : ''

    return (
        <div className="grid w-full gap-1.5">
            {label && (
                <Label
                    htmlFor={label}
                    className={className}
                >
                    {label}
                </Label>
            )}

            <Textarea
                id={label}
                {...inputProps}
            />

            <InputError message={error} />
        </div>
    )
})

export { TextareaInput }
