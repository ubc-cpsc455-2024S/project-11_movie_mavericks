import { createSlice } from "@reduxjs/toolkit";

export const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState: [],
  reducers: {
    addRecommendation: (state, action) => {
      if (!state.find((rec) => rec.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
  },
});

export const { addRecommendation } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
