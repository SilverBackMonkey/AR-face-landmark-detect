import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "../reducer/colorSlice";
import comparisonImageReducer from "../reducer/comparisonSlice";
import runningModeReducer from "../reducer/runningModeSlice";

export default configureStore({
    reducer: {
        color: colorReducer,
        comparisonImage: comparisonImageReducer,
        runningMode: runningModeReducer,
    },
})
