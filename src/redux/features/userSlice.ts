import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
  email: string | null;
  displayName: string | null;
}

const initialState: {
  user: User | null;
} = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
