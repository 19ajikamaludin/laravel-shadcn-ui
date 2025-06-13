import { CalendarIcon, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { InputError } from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn, converToDate, formatStandartDate, getDateLastMonth } from '@/lib/utils'
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

    const componentRef = useRef(null)
    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState({ from: null, to: null })
    const lastMonth = getDateLastMonth()

    const handleSubmit = () => {
        setShow(false)
        onChange({
            start_date: formatStandartDate(selectedDate.from),
            end_date: formatStandartDate(selectedDate.to),
        })
    }

    const handleSelectedDate = (date) => {
        setSelectedDate(date)
    }

    useEffect(() => {
        if (value) {
            setSelectedDate({
                from: converToDate(value.start_date),
                to: converToDate(value.end_date),
            })
        }
        if (value === null) {
            setSelectedDate({ from: null, to: null })
        }
    }, [value])

    const className = error ? 'text-red-600' : ''

    return (
        <div
            className="grid gap-2"
            ref={componentRef}
        >
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
                        variant={'ghost'}
                        className={cn('min-w-[231px] justify-start border text-left font-normal', !selectedDate && 'text-muted-foreground')}
                    >
                        <CalendarIcon />
                        {selectedDate?.from ? (
                            selectedDate.to ? (
                                <>
                                    {format(selectedDate.from, 'dd/MM/yyyy')} - {format(selectedDate.to, 'dd/MM/yyyy')}
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
                        initialFocus
                        mode="range"
                        defaultMonth={selectedDate?.from ?? lastMonth}
                        selected={selectedDate}
                        onSelect={handleSelectedDate}
                        numberOfMonths={2}
                    />
                    <div className="flex w-full flex-row justify-end px-3 pb-3">
                        <Button
                            variant="outline"
                            onClick={handleSubmit}
                        >
                            <Check />
                            <span>Ok</span>
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            <InputError message={error} />
        </div>
    )
}

export { FormDateRangeInput }
