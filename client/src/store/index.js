import { configureStore } from '@reduxjs/toolkit';

// import slices
import loading from './loading';
import theme from './theme';

export default configureStore({
    reducer: {
        loading,
        theme,
    },
});
