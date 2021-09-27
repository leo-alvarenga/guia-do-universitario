import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import Home from './Home/Home';
import { setTheme } from './store/theme';
import { lightTheme, darkTheme } from './App.style';
import { getThemeFromLocalData } from './store/theme';

const App = (props) => {
    const [darkMode, setDarkMode] = useState(getThemeFromLocalData() === 'dark');
    const dispatch = useDispatch();

    const handleThemeChange = () => {
        dispatch(setTheme(!darkMode));
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <link href='https://fonts.googleapis.com/css?family=Satisfy' rel='stylesheet'></link>
            <Home onThemeChange={handleThemeChange} darkMode={darkMode}/>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        darkMode: state.theme === 'dark',
        theme: state.theme,
    };
};

export default connect(mapStateToProps)(App);
