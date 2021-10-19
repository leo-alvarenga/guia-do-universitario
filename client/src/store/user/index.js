import axios from 'axios';

import { createSlice } from '@reduxjs/toolkit';
import { current } from 'immer';

const getUserLocalData = () => {
    const user = localStorage.getItem('user');

    if (user === undefined || user === null) {
        return undefined;
    }

    return JSON.parse(user);
};

const setUserLocally = (username, favorites, role) => {
    try {
        const user = { username, favorites, role, };

        localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.error("Error while trying to save user data locally. Procceed with caution...");
    }
};

const updateUser = async (username, favorites, role) => {
    const user = { username, favorites, role, };

    try {
        const response = await axios.put('http://localhost:8080/api/user/update', { user });

        setUserLocally(username, favorites, role);
    } catch (error) {
        //
    }
};

export const user = createSlice({
    name: 'user',
    initialState: {
        value: {
            isAuth: getUserLocalData() !== undefined,
            username: getUserLocalData()?.username || undefined,
            role: getUserLocalData()?.role || 'user',
            favorites: getUserLocalData()?.favorites || [],
        }
    },

    reducers: {
        loggedIn: (state, action) => {
            const payload = action.payload;

            if (payload !== undefined) {
                const { username, favorites, role, } = payload;
                setUserLocally(username, favorites, role);

                state.value.username = username;
                state.value.isAuth = true;
                state.value.favorites = favorites;
                state.value.role = role;
            }
        },
        newFavorite: (state, action) => {
            const n = state.value.favorites;
            state.value.favorites = [ ...n, action.payload ];

            updateUser(state.value.username, state.value.favorites, state.value.role);
        },
        removeFavorite: (state, action) => {

            state.value.favorites = state.value.favorites.filter(el => el !== action.payload);

            updateUser(state.value.username, state.value.favorites, state.value.role);
        },
    }
});

export const { loggedIn, newFavorite, removeFavorite } = user.actions;
export default user.reducer;
