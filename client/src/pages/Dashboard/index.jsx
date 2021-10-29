// react
import { useEffect, useState } from 'react';

// axios
import axios from 'axios';

// router
import { useHistory } from 'react-router';

// redux
import { connect } from 'react-redux';

// mui
import { Paper, Box, Tabs, Tab } from '@mui/material';

// components
import CreatePost from './views/CreatePost';
import UpdatePost from './views/UpdatePost';
import Erro from '../../components/Alerts/Erro';

const Dashboard = (props) => {
    const history = useHistory();

    const [currentView, setView] = useState(0);
    const [tags, setTags] = useState([]);

    const getTags = async () => {try {
            const response = await axios.get('http://localhost:8080/api/tags/'); // todo -> change this static route

            setTags([ ...response.data?.tags ]);
        } catch (error) {
            //
        }
    };

    const redirect = () => {
        history.push('/');
    };

    useEffect(() => {
        getTags();
    }, []);

    return(
        <Paper>

            {
                props.user.isAuth === true && props.user.role === "admin"
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
                            {
                                currentView === 0
                                ? <CreatePost username={props.user.username} tags={tags} />
                                : <UpdatePost username={props.user.username} tags={tags} />
                            }
                        </Box>
                    </>
                )
                : (
                    <Erro
                        message="Você não possui permissão para continuar aqui"
                        label="Voltar para a página principal"
                        onClick={redirect}
                    />
                )
            }
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.value,
});

export default connect(mapStateToProps)(Dashboard);