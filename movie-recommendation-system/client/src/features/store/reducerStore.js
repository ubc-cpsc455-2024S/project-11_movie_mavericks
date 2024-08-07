import { configureStore } from "@reduxjs/toolkit";
import recommendationsReducer from "../recommendationsSlice";
import userReducer from "../userSlice";

export default configureStore({
  reducer: {
    recommendations: recommendationsReducer,
    user: userReducer,
  },
});
