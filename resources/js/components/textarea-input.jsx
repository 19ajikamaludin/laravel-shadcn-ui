import { forwardRef } from 'react'

import { InputError } from '@/components/input-error'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

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
    const { label, error, name, value, onChange, placeholder } = props

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

            {/* this text area is from import { Textarea } from '@/components/ui/textarea' */}
            <textarea
                data-slot="textarea"
                className={cn(
                    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    className,
                )}
                name={name}
                id={label}
                ref={ref}
                value={value ?? ''}
                onChange={onChange}
                placeholder={placeholder}
            />

            <InputError message={error} />
        </div>
    )
})

export { TextareaInput }
