import { useState } from 'react';

// routes
import { BrowserRouter, Route } from 'react-router-dom';

// redux
import { connect, useDispatch } from 'react-redux';

// theming
import { ThemeProvider } from '@mui/material';
import { setTheme } from './store/theme';
import { lightTheme, darkTheme } from './App.style';
import { getThemeFromLocalData } from './store/theme';

// components
import Page from './components/Page/Page';

// Pages
import Home from './pages/Home';
import Read from './pages/Read';

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

            <Page onThemeChange={handleThemeChange} darkMode={darkMode}>

                <BrowserRouter>
                    <Route 
                        path='/'
                        exact
                        render={(props) => (<Home darkMode={darkMode} />)}
                    />
                    <Route
                        path='/read/:post_id'
                        exact
                        component={Read}
                    />
                </BrowserRouter>
            </Page>


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
