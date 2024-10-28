import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    admin:null,
	token:null
}

const adminSlice = createSlice({
	name: "admin",
	initialState: INITIAL_STATE,
	reducers: {
		setAdmin(state, action) {
			state.admin = action.payload.admin;
			state.token = action.payload.token;
		},
		clearAdmin(state) {
			state.admin = null;
			state.token = null;
		}
	},
});

export const { setAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;
