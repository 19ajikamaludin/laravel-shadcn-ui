import { useEffect, useState } from 'react'
import { CalendarIcon } from 'lucide-react'

import { cn, converToDate, formatDate, formatStandartDate } from '@/lib/utils'
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

    const [selectedDate, setSelectedDate] = useState({ from: null, to: null })

    const handleSelectedDate = (date) => {
        if (date && typeof onChange === 'function') {
            onChange({
                start_date: formatStandartDate(date.from),
                end_date: formatStandartDate(date.to),
            })
        }
    }

    useEffect(() => {
        if (value) {
            setSelectedDate({
                from: converToDate(value.start_date),
                to: converToDate(value.end_date),
            })
        }
        if (value === null) {
            setSelectedDate(null)
        }
    }, [value])

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
                        variant={'ghost'}
                        className={cn(
                            'border justify-start text-left font-normal min-w-[231px]',
                            !selectedDate && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon />
                        {selectedDate?.from ? (
                            selectedDate.to ? (
                                <>
                                    {format(selectedDate.from, 'dd/MM/yyyy')} -{' '}
                                    {format(selectedDate.to, 'dd/MM/yyyy')}
                                </>
                            ) : (
                                format(selectedDate.from, 'dd/MM/yyyy')
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
                        defaultMonth={selectedDate?.from}
                        selected={selectedDate}
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
