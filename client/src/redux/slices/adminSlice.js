import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminUser: null,
    adminToken: null,
  },
  reducers: {
    setAdmin(state, action) {
      state.adminUser = action.payload.adminUser;
      state.adminToken = action.payload.adminToken;
    },
		updateAdmin(state, action) {
			state.adminUser = action.payload.adminUser;
		},
    clearAdmin(state) {
      state.adminUser = null;
      state.adminToken = null;
    }
  }
});

export const { setAdmin, updateAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
