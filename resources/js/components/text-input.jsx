import { forwardRef } from 'react'

import { InputError } from '@/components/input-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Example :
 * <TextInput
 *     name="name"
 *     value={name}
 *     label="Name"
 *     onChange={(e) => setName(e.target.value)}
 * />
 *
 */
const TextInput = forwardRef((props, ref) => {
    const { label, error, icon, ...inputProps } = props

    const className = error ? 'text-red-600' : ''

    return (
        <div className="w-full grid gap-2">
            {label && (
                <Label
                    htmlFor={label}
                    className={className}
                >
                    {label}
                </Label>
            )}

            <div className="relative">
                <Input
                    id={label}
                    ref={ref}
                    {...inputProps}
                />
                {icon && icon}
            </div>

            <InputError message={error} />
        </div>
    )
})

export { TextInput }
