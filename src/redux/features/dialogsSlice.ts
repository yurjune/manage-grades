import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentDialogOpen: false,
  scoreDialogOpen: false,
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
    openScoreDialog(state) {
      state.scoreDialogOpen = true;
    },
    toggleScoreDialog(state) {
      state.scoreDialogOpen = !state;
    },
  },
});

export const { openStudentDialog, toggleStudentDialog, openScoreDialog, toggleScoreDialog } =
  dialogsSlice.actions;

export default dialogsSlice.reducer;
