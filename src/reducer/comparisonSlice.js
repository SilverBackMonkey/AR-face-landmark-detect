import { createSlice } from "@reduxjs/toolkit";

export const comparisonSlice = createSlice({
    name: 'comparisonImage',
    initialState: {
        isComparison: false,
        slicePosition: 0,
    },
    reducers: {
        toggleCompareImage: (state) => {
            state.isComparison =!state.isComparison;
        },
        moveCompareSlice: (state, action) => {
            if (!state.isComparison) return;

            state.slicePosition = action.payload;
        }
    }
})

export const { toggleCompareImage, moveCompareSlice } = comparisonSlice.actions;

export default comparisonSlice.reducer;