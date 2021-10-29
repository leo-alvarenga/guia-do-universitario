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
import Favorites from './pages/Favorites';
import Read from './pages/Read';
import Dashboard from './pages/Dashboard';

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

            <BrowserRouter>
                <Page onThemeChange={handleThemeChange} darkMode={darkMode}>
                    <Route 
                        path='/'
                        exact
                        render={(props) => (<Home darkMode={darkMode} />)}
                    />
                    <Route 
                        path='/favorites'
                        exact
                        render={(props) => (<Favorites darkMode={darkMode} />)}
                    />
                    <Route
                        path='/read/:post_id'
                        exact
                        component={Read}
                    />
                    <Route
                        path='/dashboard'
                        exact
                        component={Dashboard}
                    />
                </Page>
            </BrowserRouter>


        </ThemeProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        darkMode: state.theme === 'dark',
        theme: state.theme,
        loading: state.loading,
        user: state.user,
    };
};

export default connect(mapStateToProps)(App);
