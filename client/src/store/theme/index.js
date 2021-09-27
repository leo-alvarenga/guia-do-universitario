import { createSlice } from "@reduxjs/toolkit";

const setThemeInLocalData = (theme) => {
    try {
        localStorage.setItem('theme', theme);
    } catch (error) {
        console.error("Error while trying to save current theme...");
    }
};

export const getThemeFromLocalData = () => {
    const theme = localStorage.getItem('theme');

    if (theme === null) {
        setThemeInLocalData('light');
        return 'light';
    }

    return theme;

};

export const theme = createSlice({
    name: 'theme',
    
    initialState: {
        value: getThemeFromLocalData(),
    },

    reducers: {
        setTheme: (state, action) => {
            state = action.payload ? 'dark' : 'light';
            setThemeInLocalData(state);
        },
    },
});

export const { setTheme } = theme.actions;
export default theme.reducer;
