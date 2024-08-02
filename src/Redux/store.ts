import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/Redux/slices/authSlice';
import taskReducer from '@/Redux/slices/taskSlice';
import linkedinReducer from '@/Redux/slices/linkedinSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    linkedin: linkedinReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
