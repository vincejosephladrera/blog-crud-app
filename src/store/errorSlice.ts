import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorsState {
	messages: string[];
}

const initialState: ErrorsState = {
	messages: [],
};

const errorsSlice = createSlice({
	name: 'errors',
	initialState,
	reducers: {
		addError: (state, action: PayloadAction<string>) => {
			state.messages.push(action.payload);
		},
		removeError: (state, action: PayloadAction<string>) => {
			state.messages = state.messages.filter((msg) => msg !== action.payload);
		},
		clearErrors: (state) => {
			state.messages = [];
		},
	},
});

export const { addError, removeError, clearErrors } = errorsSlice.actions;
export default errorsSlice.reducer;
