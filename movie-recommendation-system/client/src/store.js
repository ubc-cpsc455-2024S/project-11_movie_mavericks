import { configureStore } from "@reduxjs/toolkit";
import recommendationsReducer from "./features/recommendationsSlice";
import userReducer from "./features/userSlice";
import firstloadReducer from "./features/firstloadSlice";

export default configureStore({
  reducer: {
    recommendations: recommendationsReducer,
    user: userReducer,
    firstload: firstloadReducer,
  },
});
