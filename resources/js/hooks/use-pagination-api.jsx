import axios from 'axios'
import { useState } from 'react'
import { route } from './use-route'

export const paginationDefaultState = {
    data: [],
    links: [],
    from: 0,
    to: 0,
    total: 0,
    current_page: 1,
}

export function usePaginationApi(auth, params, url = 'api.select.table', defaultState = paginationDefaultState) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(defaultState)

    const fetch = (page = 1, chage_params) => {
        setLoading(true)
        axios
            .get(
                route(url, {
                    ...params,
                    ...chage_params,
                    page: page,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: auth.jwt_prefix + auth.jwt_token,
                    },
                },
            )
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log(['pagination-api-err', err]))
            .finally(() => setLoading(false))
    }

    return [data, fetch, loading]
}
