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

/**
 * Example :
 * <FormDateInput
 *     value={name}
 *     label="Name"
 *     onChange={(date) => setDate(date)}
 * />
 *
 */
const FormDateInput = (props) => {
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

            <Popover
                open={show}
                onOpenChange={setShow}
            >
                <PopoverTrigger asChild>
                    <Button
                        id={label}
                        variant={'outline'}
                        className={cn(
                            'justify-start text-left font-normal',
                            !value && 'text-muted-foreground'
                        )}
                        onClick={() => {
                            setShow(!show)
                        }}
                    >
                        <CalendarIcon />
                        {value ? formatDate(value) : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={handleSelectedDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <InputError message={error} />
        </div>
    )
}

export { FormDateInput }
