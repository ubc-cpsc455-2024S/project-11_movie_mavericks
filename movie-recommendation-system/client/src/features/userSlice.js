import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
  username: "username",
  password: "password",
  wishlists: [],
  reviews: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.username = null;
      state.password = null;
    },
    editUser: (state, action) => {
      const { username, password } = action.payload;
      state.username = username;
      state.password = password;
    },
  },
});

export const { login, logout, editUser } = userSlice.actions;

export default userSlice.reducer;
