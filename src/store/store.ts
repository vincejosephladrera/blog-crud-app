import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import errorReducer from './errorSlice';
import alertReducer from './alertSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		errors: errorReducer,
		alert: alertReducer,
		theme: themeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
