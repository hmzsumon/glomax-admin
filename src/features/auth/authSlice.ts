import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	btnLogin: false,
	user: null,
	token: null,
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setBtnLogin: (state) => {
			state.btnLogin = !state.btnLogin;
		},
		setUser: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;
		},
		logoutUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			state.token = null;
			console.log('Auth', state.isAuthenticated);
		},
	},
});

export const { setBtnLogin, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
