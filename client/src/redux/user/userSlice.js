import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null, // Use null for the initial error state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false; // Clear any previous error
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false; // Use semicolons properly
      state.error = false;    // Reset error state
    },

    signInFailure: (state, action) => {
      state.loading = false; // Use semicolons properly
      state.error = action.payload; // Set error message from payload
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
