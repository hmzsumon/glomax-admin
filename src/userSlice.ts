import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();
	return data;
});

const initialState = {
	entities: [],
} as any;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.entities.push(...action.payload);
		});
	},
});

export default userSlice.reducer;
