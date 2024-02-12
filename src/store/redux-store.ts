// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth/authSlice';
import eventReducer from './reducers/event/eventSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        event: eventReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
