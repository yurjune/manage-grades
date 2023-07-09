import { configureStore } from '@reduxjs/toolkit';
import { firestoreApi } from './services/firestoreApi';
import studentReducer from './features/student/studentSlice';
import dialogsReducer from './features/dialogs/dialogsSlice';

export const store = configureStore({
  reducer: {
    student: studentReducer,
    dialogs: dialogsReducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firestoreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
