// react
import { useState } from 'react';

// axios
import axios from 'axios';

// mui
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Notification from '../../../components/Alerts/Notification';

const useStyles = makeStyles(() => ({
    textSmall: {
        width: '40%',
        margin: '1rem 0 1rem 0',
    },

    textLarge: {
        width: '80%',
        margin: '1rem 0 1rem 0',
    },

    submitButton: {
        width: '6rem',
        margin: '1rem 0 1rem 0',
    },
}));

const getTodaysDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
};

const CreatePost = (props) => {
    const classes = useStyles();

    const [notification, setNotification] = useState(0);

    const [post, setPost] = useState({
        username: props.username,
        title: '',
        author: '',
        date: getTodaysDate(),
        subtitle: '',
        body: '',
    });

    const notificationMessage = () => {
        switch (notification) {
            default:
                return 'Se certifique de que o post possua um corpo e um título antes de postar.';
            case 2: 
                return `Post '${post.title}' foi atualizado com sucesso.`;
            case 3:
                return 'Um erro ocorreu. Tente novamente.';
        }
    };

    const postIsValid = () => {
        if (post.title.length > 0 && post.body.length > 0) {
            return true;
        }

        return false;
    };

    const postRequest = async () => {
        if (postIsValid() === true) {
            try {
                const response = await axios.post('http://localhost:8080/api/posts/new', post);
    
                setNotification(2);
            } catch (error) {
                setNotification(3);
            }
        } else {
            setNotification(1);
        }
    };

    return (
        <>
            <TextField
                label="Title"
                value={post.title}
                onChange={(event) => setPost({ ...post, title: event.target.value, })}
                variant="outlined"
                className={classes.textSmall}
            />
            
            <TextField
                label="Author"
                value={post.author}
                onChange={(event) => setPost({ ...post, author: event.target.value, })}
                variant="outlined"
                className={classes.textSmall}
            />

            <TextField
                label="Subtitle"
                value={post.subtitle}
                onChange={(event) => setPost({ ...post, subtitle: event.target.value, })}
                variant="outlined"
                className={classes.textSmall}
            />

            <TextField
                label="Body"
                value={post.body}
                onChange={(event) => setPost({ ...post, body: event.target.value, })}
                multiline
                rows={4}
                className={classes.textLarge}
            />

            <Button
                variant="outlined"
                className={classes.submitButton}
                onClick={postRequest}
            >
                Concluir
            </Button>

            <Notification 
                open={notification !== 0}
                onClose={() => setNotification(0)}
                message={() => notificationMessage()}
            />

        </>
    );
};

export default CreatePost;