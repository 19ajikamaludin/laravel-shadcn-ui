import { useState } from 'react'

export function useModal(state = false) {
    const [isOpen, setIsOpen] = useState(state)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const [data, setData] = useState(null)

    return {
        isOpen,
        toggle,
        setIsOpen,
        data,
        setData,
    }
}
