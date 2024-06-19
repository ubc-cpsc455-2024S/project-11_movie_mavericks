import { configureStore } from "@reduxjs/toolkit";
import recommendationsReducer from "./features/recommendationsSlice";
import userReducer from "./features/userSlice";

export default configureStore({
  reducer: {
    recommendations: recommendationsReducer,
    user: userReducer,
  },
});
