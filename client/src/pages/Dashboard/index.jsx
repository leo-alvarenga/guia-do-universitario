// react
import { useState } from 'react';

// router
import { useHistory } from 'react-router';

// redux
import { connect } from 'react-redux';

// mui
import { Paper, Box, Tabs, Tab } from '@mui/material';
import localStyles from './Dashboard.style';

// components
import CreatePost from './views/CreatePost';
import UpdatePost from './views/UpdatePost';
import Erro from '../../components/Alerts/Erro';

const Dashboard = (props) => {
    const localClasses = localStyles();
    const history = useHistory();

    const [currentView, setView] = useState(0);

    const renderView = () => (
        currentView === 0
        ? <CreatePost username={props.user.username} />
        : <UpdatePost username={props.user.username} />
    );

    const redirect = () => {
        history.push('/');
    };

    return(
        <Paper>

            {
                props.user.isAuth === true && props.user.role === 'admin'
                ? (
                    <>
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
                    </>
                )
                : <Erro
                    message="Você não possui permissão para continuar aqui"
                    label="Voltar para a página principal"
                    onClick={redirect}
                />
            }
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Dashboard);