import { usePersistentState } from './use-persistent-state'

export function useCache(key, ttl = 15) {
    const [items, set_items] = usePersistentState(key, { items: [], timestamp: Date.now() })

    const isValid = items.timestamp < Date.now() - 1000 * 60 * ttl || items.items.length <= 0
    const { items: data } = items

    return [data, set_items, isValid]
}
