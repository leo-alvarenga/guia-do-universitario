import { configureStore } from '@reduxjs/toolkit';

// import slices
import loading from './loading';
import theme from './theme';
import user from './user';

export default configureStore({
    reducer: {
        loading,
        theme,
        user,
    },
});
