import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import errorReducer from './errorSlice';
import alertReducer from './alertSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		errors: errorReducer,
		alert: alertReducer,
		// theme: themeReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
