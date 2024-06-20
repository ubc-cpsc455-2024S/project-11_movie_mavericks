import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
  username: null,
  watchlists: [],
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
      state.watchlists = action.payload.watchlists;
      state.reviews = action.payload.reviews;
    },
    logout: (state) => {
      return initialState
    },
    editUser: (state, action) => {
      const { username, password } = action.payload;
      state.username = username;
    },
    addReview: (state, action) => {
      state.reviews.unshift(action.payload);
    }
  },
});

export const { login, logout, editUser, addReview } = userSlice.actions;

export default userSlice.reducer;
