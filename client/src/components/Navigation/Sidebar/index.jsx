import { Drawer, Box, List, Divider, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { getSidebarItemsList } from './util';

const useStyles = makeStyles((theme) => ({
    sidebarItemsContainer: {
        marginTop: '5rem',
    },
    
    sidebarItem: {
        marginTop: '1rem',
    },

    sidebarItemIcon: {
        marginRight: '1rem',
    },
}));

const getSidebarItems = (classes) => (
    <Box
        sx={{
            width: 'auto'
        }}
        role='presentation'
        className={classes.sidebarItemsContainer}
    >
        <List>
            <Divider />

            {
                getSidebarItemsList().map((row) => (
                    <>
                        {
                            row.map((item) => (
                                <ListItem className={classes.sidebarItem}>
                                    <div className={classes.sidebarItemIcon}>
                                    {item.icon}
                                    </div>
                                    <div>
                                        {item.title}
                                    </div>
                                </ListItem>
                            ))
                        }

                        <Divider />
                    </>
                ))
            }
        </List>

    </Box>
);

const Sidebar = (props) => {
    const classes = useStyles();

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <Drawer
            open={props.active}
            onClose={handleClose}
        >
            {
                getSidebarItems(classes)
            }
        </Drawer>
    );
}

export default Sidebar;