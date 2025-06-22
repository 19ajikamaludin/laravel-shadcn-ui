import { usePage } from '@inertiajs/react'
import axios from 'axios'
import { route } from './use-route'

export function useFetcher() {
    const {
        props: { auth },
    } = usePage()

    const get = async (r, params) => {
        return axios
            .get(route(r, params), {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: auth.jwt_prefix + auth.jwt_token,
                },
            })
            .then((res) => {
                return res?.data
            })
            .catch((err) => {
                throw err?.response
            })
    }

    const post = async (r, body, params, headers = {}) => {
        return axios
            .post(route(r, params), body, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: auth.jwt_prefix + auth.jwt_token,
                    ...headers,
                },
            })
            .then((res) => {
                return res?.data
            })
            .catch((err) => {
                throw err?.response
            })
    }

    return { get, post }
}
