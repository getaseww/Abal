import { api } from './api'

export interface Role {
    id: number
    name: string
    createdAt: Date,
    updatedAt: Date | null | undefined
}

type RolesResponse = Role[]


export const rolesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRoles: build.query<RolesResponse, void>({
            query: () => ({ url: 'role' }),
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Roles', id }) as const),
                { type: 'Roles' as const, id: 'LIST' },
            ],
        }),
        addRole: build.mutation<Role, Partial<Role>>({
            query: (body) => ({
                url: `role`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Roles', id: 'LIST' }],
        }),
        getRole: build.query<Role, number>({
            query: (id) => `role/${id}`,
            providesTags: (_role, _err, id) => [{ type: 'Roles', id }],
        }),
        updateRole: build.mutation<Role, Partial<Role>>({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `role/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: (role) => [{ type: 'Roles', id: role?.id }],
        }),
        deleteRole: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `role/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (role) => [{ type: 'Roles', id: role?.id }],
        }),
        getErrorProne: build.query<{ success: boolean }, void>({
            query: () => 'error-prone',
        }),
    }),
})

export const {
    useAddRoleMutation,
    useDeleteRoleMutation,
    useGetRoleQuery,
    useGetRolesQuery,
    useUpdateRoleMutation,
    useGetErrorProneQuery,
} = rolesApi

export const {
    endpoints: { getRole,getRoles },
} = rolesApi
