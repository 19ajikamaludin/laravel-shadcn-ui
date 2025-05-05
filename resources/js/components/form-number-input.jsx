import { NumericFormat } from 'react-number-format'

import { InputError } from '@/components/input-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function FormNumberInput({
    name,
    onChange,
    value,
    label,
    className,
    error,
}) {
    const errorClassName = error ? 'text-red-600' : ''

    return (
        <div className="grid gap-2">
            {label && (
                <Label
                    htmlFor={label}
                    className={errorClassName}
                >
                    {label}
                </Label>
            )}
            <NumericFormat
                className={className}
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                allowLeadingZeros={false}
                customInput={Input}
                value={Number(value)}
                name={name}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: name,
                            value: values.floatValue,
                        },
                    })
                }}
            />
            <InputError message={error} />
        </div>
    )
}
