import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    user:null,
	token:null
}

const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {
		setUser(state, action) {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		updateUser(state, action) {
			state.user = action.payload.user;
		},
		clearUser(state) {
			state.user = null;
			state.token = null;
		}
	},
});

export const { setUser, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
