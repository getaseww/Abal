import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { User, authApi } from '../../app/services/auth';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
} as { user: null | User; token: string | null; isAuthenticated: boolean }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
        console.log('pending', action)
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action)
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        console.log('rejected', action)
      })
  },
})

export const { logout } = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
