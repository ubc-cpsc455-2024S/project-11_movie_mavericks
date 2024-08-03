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
    logout: () => {
      return initialState;
    },
    editUser: (state, action) => {
      const { username } = action.payload;
      state.username = username;
    },
    addReview: (state, action) => {
      state.reviews.unshift(action.payload);
    },
    removeReview: (state, action) => {
      state.reviews = state.reviews.filter((review) => review !== action.payload);
    },
    addWatchlist: (state, action) => {
      state.watchlists.push(action.payload);
    },
    updateWatchlist: (state, action) => {
      const index = state.watchlists.findIndex(
        (watchlist) => watchlist._id === action.payload._id
      );
      if (index !== -1) {
        state.watchlists[index] = action.payload;
      }
    },
    deleteWatchlist: (state, action) => {
      state.watchlists = state.watchlists.filter(
        (watchlist) => watchlist._id !== action.payload
      );
    },
    addMovieToWatchlist: (state, action) => {
      const { watchlist_id, movie_id } = action.payload;

      const watchlist = state.watchlists.find(
        (watchlist) => watchlist._id === watchlist_id
      );
      if (watchlist) {
        watchlist.movies.push(movie_id);
      }
    },
    removeMovieFromWatchlist: (state, action) => {
      const { watchlistID, movieID } = action.payload;
      const watchlist = state.watchlists.find(
        (watchlist) => watchlist._id === watchlistID
      );
      if (watchlist) {
        watchlist.movies = watchlist.movies.filter((id) => id !== movieID);
      }
    },
  },
});

export const {
  login,
  logout,
  editUser,
  addReview,
  removeReview,
  addWatchlist,
  updateWatchlist,
  deleteWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} = userSlice.actions;

export default userSlice.reducer;
