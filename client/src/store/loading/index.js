import { createSlice } from "@reduxjs/toolkit";

export const loading = createSlice({
    name: 'loading',
    
    initialState: {
        value: false,
    },

    reducers: {
        setLoading: (state, action) => {
            return { value: action.payload };
        },
    },

});

export const { setLoading } = loading.actions;
export default loading.reducer;
