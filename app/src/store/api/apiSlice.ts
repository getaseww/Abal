import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: 'login',
                method: 'POST',
                body: { username, password },
            }),
        }),
        fetchRoles: builder.query({
            query: () => 'role',
        }),
        addRole: builder.mutation({
            query: (newRole) => ({
                url: 'role',
                method: 'POST',
                body: newRole,
            }),
        }),
    }),
});

export const { useLoginMutation,useFetchRolesQuery,useAddRoleMutation } = apiSlice;
