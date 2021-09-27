import { createSlice } from "@reduxjs/toolkit";

export const loading = createSlice({
    name: 'loading',
    
    initialState: {
        value: false,
    },

    reducers: {
        setLoading: (state, action) => {
            state = action.payload;
        },
    },

});

export const { setLoading } = loading.actions;
export default loading.reducer;
