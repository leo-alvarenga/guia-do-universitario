// react
import { useState } from 'react';

// redux
import { connect } from 'react-redux';
import { setTheme } from '../../../store/theme';

// mui
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

// components
import LoginDialog from './LoginDialog';
import NavbarMenu from './Menu';
import ThemeSwitch from './ThemeSwitch';

// assets
import Logo from '../../../assets/guiauniversitario-logo.png'

const Navbar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [localTheme, setLocalTheme] = useState(props.darkMode);
    const [login, setLogin] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLoginOption = () => {
        setLogin(true);
    };

    const handleSidebar = () => {
        if (props.onOpen) {
            props.onOpen();
        }
    };

    const handleThemeChange = (event) => {
        if (props.onThemeChange) {
            props.onThemeChange();
            setLocalTheme(!localTheme);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }} color='primary'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img style={{ maxHeight: '12vh' }} src={Logo} alt="Logo Guia do Universitario" />
                    </Typography>

                    <ThemeSwitch
                        onChange={handleThemeChange}
                        checked={localTheme}
                    />
                    
                    <div>
                        
                        <NavbarMenu
                            anchorEl={anchorEl}
                            onOpen={handleMenuOpen}
                            onClose={handleMenuClose}
                            onLogin={handleLoginOption}
                            user={props.user}
                        />
                        
                        <LoginDialog 
                            open={login} 
                            onClose={() => setLogin(false)}
                        />
                    </div>
                </Toolbar>
            </AppBar>

        </Box>
    );
}

const mapStateToProps = (state) => ({
    theme: state.theme.value,
    user: state.user.value,
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetTheme: (...args) => dispatch(setTheme()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);