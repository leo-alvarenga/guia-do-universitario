import { createSlice } from '@reduxjs/toolkit';

const POSTS = 'POSTS';
const FAVO = 'FAVORITES';

export const vision = createSlice({
    name: 'vision',

    initialState: {
        value: POSTS,
    },

    reducers: {
        changeVision: (state, action) => {
            const type = action.payload.toLowerCase();

            if (type.includes(FAVO)) {
                state = FAVO;
            } else {
                state = POSTS;
            }
        },
    },

});

export const { changeVision } = vision.actions;
export default vision.reducer;