// react
import { useState } from 'react';

// axios
import axios from 'axios';

// mui
import { Paper, Box, Tabs, Tab } from '@mui/material';
import localStyles from './Dashboard.style';

// components
import CreatePost from './views/CreatePost';
import UpdatePost from './views/UpdatePost';

const Dashboard = (props) => {
    const localClasses = localStyles();

    const [currentView, setView] = useState(0);

    const renderView = () => (
        currentView === 0 ? <CreatePost /> : <UpdatePost />
    );

    return(
        <Paper>
            <Box>
                <Tabs value={currentView} onChange={(event, newValue) => setView(newValue)}>
                    <Tab label="Novo post" index={0} />
                    <Tab label="Editar post" index={1} />
                </Tabs>
            </Box>
            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                }}
            >
                { renderView() }
            </Box>
        </Paper>
    );
};

export default Dashboard;