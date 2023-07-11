import { configureStore } from '@reduxjs/toolkit';
import { firestoreApi } from './firestoreApi';
import studentReducer from './features/student/studentSlice';
import dialogsReducer from './features/dialogs/dialogsSlice';
import { Context, createWrapper } from 'next-redux-wrapper';

export const makeStore = (context: Context) => {
  return configureStore({
    reducer: {
      student: studentReducer,
      dialogs: dialogsReducer,
      [firestoreApi.reducerPath]: firestoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firestoreApi.middleware),
  });
};

type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
