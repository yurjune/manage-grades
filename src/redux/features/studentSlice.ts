import { Student } from '@/shared/model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
  value: Student | null;
} = {
  value: null,
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    selectStudent(state, action: PayloadAction<{ value: Student | null }>) {
      state.value = action.payload.value;
    },
  },
});

export const { selectStudent } = studentSlice.actions;

export default studentSlice.reducer;
