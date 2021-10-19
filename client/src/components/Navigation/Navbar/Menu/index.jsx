import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { AccountCircle, Edit as EditIcon } from '@mui/icons-material';

const NavbarMenu = (props) => {
    const s = "a";

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
                                <MenuItem>
                                    <EditIcon />
                                    Dashboard
                                </MenuItem>
                            )
                            : null
                        }

                        <MenuItem>
                            Logged
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