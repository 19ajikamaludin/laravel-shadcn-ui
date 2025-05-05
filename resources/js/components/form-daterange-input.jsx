import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'

import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { InputError } from '@/components/input-error'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'

/**
 * Example :
 * <FormDateInput
 *     value={name}
 *     label="Name"
 *     onChange={(date) => setDate(date)}
 * />
 *
 */
const FormDateRangeInput = (props) => {
    const { label, error, value, onChange } = props

    const [show, setShow] = useState(false)

    const handleSelectedDate = (date) => {
        setShow(false)
        if (date) {
            onChange(date)
        }
    }

    const className = error ? 'text-red-600' : ''

    return (
        <div className="grid gap-2">
            {label && (
                <Label
                    htmlFor={label}
                    className={className}
                >
                    {label}
                </Label>
            )}

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id={label}
                        variant={'outline'}
                        className={cn(
                            'justify-start text-left font-normal min-w-[231px]',
                            !value && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon />
                        {value?.from ? (
                            value.to ? (
                                <>
                                    {format(value.from, 'dd/MM/yyyy')} -{' '}
                                    {format(value.to, 'dd/MM/yyyy')}
                                </>
                            ) : (
                                format(value.from, 'dd/MM/yyyy')
                            )
                        ) : (
                            <span>filter date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0"
                    align="start"
                >
                    <Calendar
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={handleSelectedDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>

            <InputError message={error} />
        </div>
    )
}

export { FormDateRangeInput }
