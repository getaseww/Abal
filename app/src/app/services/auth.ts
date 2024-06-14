import { retry } from '@reduxjs/toolkit/query/react'
import { api } from './api'
import { Role } from './role'

export interface User {
    first_name: string
    last_name: string
    phone_number: string
    role_id: string,
    role: Role
}

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<{ token: string; user: User }, any>({
            query: (credentials: any) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            extraOptions: {
                backoff: () => {
                    // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
                    retry.fail({ fake: 'error' })
                },
            },
        }),
        getErrorProne: build.query<{ success: boolean }, void>({
            query: () => 'error-prone',
        }),
    }),
})

export const {
    useLoginMutation,
    useGetErrorProneQuery,
} = authApi

export const {
    endpoints: { login },
} = authApi
