import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import errorReducer from './errorSlice';
// import themeReducer from './themeSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		errors: errorReducer,
		// theme: themeReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
