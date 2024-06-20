import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
    name: 'color',
    initialState: {
        value: undefined,
    },
    reducers: {
        changeColor: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { changeColor } = colorSlice.actions;

export default colorSlice.reducer;
