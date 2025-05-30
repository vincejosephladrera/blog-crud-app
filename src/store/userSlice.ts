import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	email: string | null;
	accessToken: string | null;
}

const tokenFromStorage =
	typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

const initialState: UserState = {
	email: null,
	accessToken: tokenFromStorage,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserState>) {
			return action.payload;
		},
		clearUser(state) {
			state.email = null;
			state.accessToken = null;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
