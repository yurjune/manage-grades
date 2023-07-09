import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentDialogOpen: false,
};

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    openStudentDialog(state) {
      state.studentDialogOpen = true;
    },
    toggleStudentDialog(state) {
      state.studentDialogOpen = !state;
    },
  },
});

export const { openStudentDialog, toggleStudentDialog } = dialogsSlice.actions;

export default dialogsSlice.reducer;
