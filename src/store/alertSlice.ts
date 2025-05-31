import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
	content: {
		message: string;
		title: string;
		cancelLabel: string;
		confirmLabel: string;
		slug: string;
	} | null;
}

const initialState: AlertState = {
	content: null,
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		setAlert: (state, action: PayloadAction<AlertState>) => {
			return action.payload;
		},
		clearAlert: (state) => {
			state.content = null;
		},
	},
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
