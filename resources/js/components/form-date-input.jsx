import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { InputError } from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn, formatDate, formatStandartDate } from '@/lib/utils'

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
    const { label, error, value, onChange } = props // value always m/d/y

    // create state for select_month focus
    const [activeShowMonth, setActiveShowMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
    const [show, setShow] = useState(false)

    const handleSelectedDate = (date) => {
        setShow(false)
        if (date) {
            onChange(formatStandartDate(date))
        }
        setSelectedDate(date)
        setActiveShowMonth(date)
    }

    useEffect(() => {
        if (value) {
            setSelectedDate(new Date(value))
        }
    }, [value])

    const className = error ? 'text-red-600' : ''

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

            <Popover
                open={show}
                onOpenChange={setShow}
            >
                <PopoverTrigger asChild>
                    <Button
                        id={label}
                        variant={'ghost'}
                        className={cn('justify-start border text-left font-normal', !value && 'text-muted-foreground')}
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
                        selected={selectedDate}
                        onSelect={handleSelectedDate}
                        month={activeShowMonth}
                        onMonthChange={setActiveShowMonth}
                    />
                </PopoverContent>
            </Popover>

            <InputError message={error} />
        </div>
    )
}

export { FormDateInput }
