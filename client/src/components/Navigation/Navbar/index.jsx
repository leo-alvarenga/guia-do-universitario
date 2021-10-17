import { useRef, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { ThemeSwitch } from './util';
import { getThemeFromLocalData, theme } from '../../../store/theme';
import { setTheme } from '../../../store/theme';

const Navbar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [localTheme, setLocalTheme] = useState(props.darkMode);

    console.log(localTheme);

    const auth = useSelector(state => state.isAuth);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                        Guia do Universitário
                    </Typography>

                    <ThemeSwitch
                        onChange={handleThemeChange}
                        checked={localTheme}
                    />
                    
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.value,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetTheme: (...args) => dispatch(setTheme()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);