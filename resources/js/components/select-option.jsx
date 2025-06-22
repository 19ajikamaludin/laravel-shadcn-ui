import { InputError } from '@/components/input-error'
import { Label } from '@/components/ui/label'

import { Button } from '@/components/button'
import { Select as BaseSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { isEmpty } from 'lodash'
import { X } from 'lucide-react'
import { Fragment } from 'react'

export const Option = ({ value, children, key }) => {
    return (
        <SelectItem
            value={value}
            key={key}
        >
            {children}
        </SelectItem>
    )
}

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <Select
 *     label={label}
 *     value={value}
 *     onChange={onChange}
 *     error={error}
 *     <Option value={''}></Option>
 *     {options.map((option) => (
 *         <Option value={option} key={option}>
 *             {option}
 *         </Option>
 *     ))}
 * </Select>
 */
export const Select = ({ label, placeholder, value, onChange = () => {}, error, children, onRemove }) => {
    const showRemove = typeof onRemove === 'function' && !isEmpty(value)

    const className = error ? 'text-red-600' : ''

    return (
        <div className="grid gap-2">
            {label && <Label className={className}>{label}</Label>}

            <div className="flex flex-row gap-1">
                <BaseSelect
                    onValueChange={onChange}
                    defaultValue={value}
                    value={value}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue
                            placeholder={placeholder}
                            id={label}
                        />
                    </SelectTrigger>
                    <SelectContent>{children}</SelectContent>
                </BaseSelect>
                {showRemove && (
                    <Button
                        onClick={onRemove}
                        variant="outline"
                        size="icon"
                    >
                        <X />
                    </Button>
                )}
            </div>

            <InputError message={error} />
        </div>
    )
}

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <SelectArray
 *   name="name"
 *   value={value}
 *   label="Name"
 *   options={['a', 'b']}
 *   onChange={(option) => onChange(option)}
 * />
 */
export const SelectArray = ({ label, placeholder, value, onChange = () => {}, error, name, onRemove, options = [] }) => {
    return (
        <Select
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            name={name}
            placeholder={placeholder}
            onRemove={onRemove}
        >
            {options.map((option) => (
                <Fragment key={option}>
                    <Option value={option}>{option}</Option>
                </Fragment>
            ))}
        </Select>
    )
}

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <SelectObject
 *   name="name"
 *   value={value}
 *   label="Name"
 *   options={{a: 'value1', b: 'value2'}}
 *   onChange={(option) => onChange(option)}
 * />
 */
export const SelectObject = ({ label, placeholder, value, onChange = () => {}, error, name, onRemove, options = {} }) => {
    return (
        <Select
            label={label}
            value={value}
            onChange={onChange}
            error={error}
            name={name}
            placeholder={placeholder}
            onRemove={onRemove}
        >
            {Object.keys(options).map((option) => (
                <Fragment key={option}>
                    <Option value={option}>{options[option]}</Option>
                </Fragment>
            ))}
        </Select>
    )
}
