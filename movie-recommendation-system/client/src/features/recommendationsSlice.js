import { createSlice } from "@reduxjs/toolkit";

export const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState: {},
  reducers: {
    setRecommendation: (state, action) => {
      return action.payload;
    },
  },
});

export const { setRecommendation } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
