import { createSlice } from "@reduxjs/toolkit";

export const runningModeSlice = createSlice({
    name: 'runningMode',
    initialState: {
        usingCamera: false,
    },
    reducers: {
        setUsingCamera: (state, action) => {
            state.usingCamera = action.payload;
        }
    }
})

export const { setUsingCamera } = runningModeSlice.actions;

export default runningModeSlice.reducer;