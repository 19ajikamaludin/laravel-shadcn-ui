import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'

export function usePersistentState(key, defaultValue) {
    const [state, setState] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key)
            if (storedValue !== null) {
                return JSON.parse(storedValue)
            }
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error)
        }
        return defaultValue
    })

    const count = Object.keys(state).filter((f) => {
        if (isEmpty(state[f]) === false) {
            return true
        }
        return false
    }).length

    const onChangeState = (key, item) => {
        setState({
            ...state,
            [key]: item,
        })
    }

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state))
        } catch (error) {
            console.error(`Error saving to localStorage key "${key}":`, error)
        }
    }, [key, state])

    return [state, setState, count, onChangeState]
}
