import axios from 'axios';

import { useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import { loggedIn } from '../../../../store/user';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Switch, Dialog, DialogTitle, DialogContent, FormControlLabel, DialogActions, TextField, Button } from '@mui/material';

import Notification from '../../../Alerts/Notification';

const LoginDialog = (props) => {   
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [newUser, setNewUser] = useState(false);

    const [notification, setNotification] = useState(0);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const authUser = async (username, newUser) => {
        try {
            if (username) {
                const response = await axios.get(`http://localhost:8080/api/user/auth/${username}`);
                if (response.status === 200) {
                    return await response.data?.result;
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        } catch (error) {
            try {
                if (newUser === true) {
                    const user = { username, favorites: [], role: 'user', }
    
                    const r = await axios.post(`http://localhost:8080/api/user/new`, user);
    
                    return user;
                }
            } catch (err) { 
                return undefined;
            }
        }
    };

    const verifyUser = async () => {
        try {
            const user = await authUser(username, newUser);

            if (user !== undefined) {
                dispatch(loggedIn({ ...user }));

                setNotification(1); // 200
            } else {
                setNotification(2); // 404
            }
        } catch (error) {
            setNotification(3); // 400
        } finally {
            props.onClose();
        }
    };

    const notificationMessage = () => {
        switch (notification) {
            default:
                return `Você efetuou login como '${username}'.`;
            case 2: 
                return `O usuário '${username}' não existe.`;
            case 3:
                return `Não foi possível efetuar login como '${username}'.`;
        }
    };

    return (
        <>
            <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen}>
                <DialogTitle>Login</DialogTitle>

                <DialogContent>
                    
                    <FormControlLabel 
                        control={
                            <Switch 
                                value={newUser} 
                                onChange={
                                    (event) => setNewUser(!newUser)
                                } 
                            />
                        }
                        label="Deseja criar um novo usuário caso esse usuário não exista?"
                    />

                    <TextField
                        sx={{ marginTop: '1rem' }}
                        
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Usuário"
                        type="text"
                        fullWidth
                        variant="outlined"

                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={verifyUser}
                    >
                        Continuar
                    </Button>
                </DialogActions>

            </Dialog>

            <Notification
                open={notification !== 0}
                onClose={() => setNotification(0)}
                message={() => notificationMessage()}
            />
        </>
    );
};
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(LoginDialog);