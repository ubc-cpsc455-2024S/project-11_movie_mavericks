import { configureStore } from "@reduxjs/toolkit";
import recommendationsReducer from "./features/recommendationsSlice";
import userReducer from "./features/userSlice";
import classnamesReducer from "./features/classnamesSlice";


export default configureStore({
  reducer: {
    recommendations: recommendationsReducer,
    user: userReducer,
    classnames: classnamesReducer,
  },
});
