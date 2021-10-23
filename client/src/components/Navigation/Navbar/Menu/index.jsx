import { useHistory } from 'react-router';

import { Menu, MenuItem, ListItemIcon, ListItemText, IconButton, Avatar } from '@mui/material';
import { AccountCircle, Edit as EditIcon, SwitchAccount } from '@mui/icons-material';

const NavbarMenu = (props) => {
    const history = useHistory();

    const dashboardRedirect = () => {
        history.push('/');
    };

    const content = () => {
        if (props.user.isAuth) {
            return (
                <>
                     <IconButton 
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        onClick={props.onOpen}
                        color="inherit"
                    >
                        <Avatar 
                            sx={{ width: 32, height: 32 }}
                        >
                            { props.user.username.toUpperCase()[0] }
                        </Avatar>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={props.anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={Boolean(props.anchorEl)}
                        onClose={props.onClose}
                    >
                        {
                            props.user.role === 'admin'
                            ? (
                                <MenuItem onClick={dashboardRedirect}>
                                    <ListItemIcon>
                                        <EditIcon />
                                    </ListItemIcon>

                                    <ListItemText>
                                        Dashboard
                                    </ListItemText>
                                </MenuItem>
                            )
                            : null
                        }

                        <MenuItem onClick={props.onLogin}>
                            <ListItemIcon>
                                <SwitchAccount />
                            </ListItemIcon>

                            <ListItemText>
                            Switch Account
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                </>
            );
        } else {
            return (
                <>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        onClick={props.onOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={props.anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={Boolean(props.anchorEl)}
                        onClose={props.onClose}
                    >
                        <MenuItem onClick={props.onLogin}>Login</MenuItem>
                    </Menu>
                </>
            );
        }
    }

    return (
        <>
            { content() }
        </>
    );
};

export default NavbarMenu;