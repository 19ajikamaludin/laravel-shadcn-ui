import axios from 'axios'
import { useState } from 'react'

export function usePaginationApi(auth, params, url = 'api.select.table') {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        data: [],
        links: [],
        from: 0,
        to: 0,
        total: 0,
        current_page: 1,
    })

    const fetch = (page = 1, additionalParams) => {
        setLoading(true)
        axios
            .get(
                route(url, {
                    page: page,
                    ...params,
                    ...additionalParams,
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
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return [data, fetch, loading]
}
