import { createSlice } from "@reduxjs/toolkit";

export const firstloadSlice = createSlice({
  name: "firstload",
  initialState: {
    classnames: {
      background: "background-fade-in",
      form: "form-fade-in",
    },
    startnow: false
  },
  reducers: {
    setClassnames: (state, action) => {
      state.classnames = action.payload;
    },
    setStartnow: (state, action) => {
      state.startnow = action.payload;
    }
  },
});

export const { setClassnames, setStartnow } = firstloadSlice.actions;

export default firstloadSlice.reducer;