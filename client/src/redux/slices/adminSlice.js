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
    updateAdminSettings(state, action) {
      state.settings = action.payload.settings;
    },
    clearAdmin(state) {
      state.adminUser = null;
      state.adminToken = null;
      state.settings = null;
    }
  }
});

export const { setAdmin, updateAdminSettings, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
