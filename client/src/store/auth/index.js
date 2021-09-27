import { createSlice } from '@reduxjs/toolkit';

export const auth = createSlice({
    name: 'auth',
    initialState: {
        value: {
            isAuth: true,
        },
    },

    reducers: {
        goAuth: (state, action) => {
            state.isAuth = true;
        },
    }
});

export const { goAuth } = auth.actions;
export default auth.reducer;
