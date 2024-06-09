import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'roles',
  initialState: [],
  reducers: {
    setRoles: (state, action) => {
      return action.payload;
    },
    addRole: (state:any, action:any) => {
      state.push(action?.payload);
    },
  },
});

export const { setRoles, addRole } = roleSlice.actions;
export default roleSlice.reducer;
