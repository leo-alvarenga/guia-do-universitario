import { useHistory } from 'react-router';

import { connect } from 'react-redux';

import { Drawer, Box, MenuList, Divider, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

import { getSidebarItemsList } from './util';


const Sidebar = (props) => {
    const history = useHistory();
    
    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    const redirect = (link) => {
        if (link.startsWith('http')) {
            window.open(link, '_blank');
        } else {
            history.push(link);
        }
    };

    return (
        <Drawer
            open={props.active}
            onClose={handleClose}
        >
            <Box
                sx={{
                    width: 'auto'
                }}
                role='presentation'
            >
                <MenuList>
                    <Divider />
        
                    {
                        getSidebarItemsList()?.map((item, index) => (
                            <MenuItem 
                                key={index} 
                                sx={{
                                    paddingTop: '1rem',
                                    paddingBottom: '1rem',
                                }}
                                onClick={() => redirect(item.link)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {item.title}
                                </ListItemText>
                            </MenuItem>
                        ))
                    }
                </MenuList>
        
            </Box>
        </Drawer>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.value,
});

export default connect(mapStateToProps)(Sidebar);