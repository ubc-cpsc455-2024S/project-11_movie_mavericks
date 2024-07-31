import { createSlice } from "@reduxjs/toolkit";

export const classnamesSlice = createSlice({
  name: "classnames",
  initialState: {
    background: "background-fade-in",
    form: "form-fade-in",
  },
  reducers: {
    setClassnames: (state, action) => {
      return action.payload;
    },
  },
});

export const { setClassnames } = classnamesSlice.actions;

export default classnamesSlice.reducer;