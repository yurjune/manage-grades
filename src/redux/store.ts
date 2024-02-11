import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import dialogsReducer from './features/dialogs/dialogsSlice';
import studentReducer from './features/student/studentSlice';
import userReducer from './features/userSlice';
import { firestoreApi } from './firestoreApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      student: studentReducer,
      dialogs: dialogsReducer,
      user: userReducer,
      [firestoreApi.reducerPath]: firestoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firestoreApi.middleware),
  });
};

type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
