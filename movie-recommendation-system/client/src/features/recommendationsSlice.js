import { createSlice } from '@reduxjs/toolkit'

export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: [],
  reducers: {
    addRecommendation: (state, action) => {
      if (!state.find(rec => rec.id === action.payload.id)) {
        state.push(action.payload);
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addRecommendation } = recommendationsSlice.actions

export default recommendationsSlice.reducer