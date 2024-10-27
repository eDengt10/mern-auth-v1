import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    
}

const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {},
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
