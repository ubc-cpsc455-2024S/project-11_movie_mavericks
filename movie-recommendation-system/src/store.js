import { configureStore } from '@reduxjs/toolkit'
import recommendationsReducer from './features/recommendationsSlice'

export default configureStore({
  reducer: {
    recommendations: recommendationsReducer,
  }
})