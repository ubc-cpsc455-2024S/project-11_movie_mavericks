import { createSlice } from '@reduxjs/toolkit'

export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: [
    {id: 1},
    {id: 2},
    {id: 3},
  ],
  reducers: {
    add: (state, action) => {
      state.push(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { add } = recommendationsSlice.actions

export default recommendationsSlice.reducer