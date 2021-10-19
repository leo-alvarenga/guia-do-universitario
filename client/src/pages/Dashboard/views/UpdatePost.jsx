// react
import { useState, useEffect } from 'react';

// axios
import axios from 'axios';

// mui
import { FormControl, InputLabel, Select, MenuItem, TextField, Stack, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

// components
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
        height: '3rem',
    },
}));

const UpdatePost = (props) => {
    const classes = useStyles();
    
    const [chosen, setChosen] = useState(0);
    const [ready, setReady] = useState(false);

    const [docs, setDocs] = useState([]);

    const [post, setPost] = useState({
        username: props.username,
        post_id: '',
        title: '',
        author: '',
        date: '',
        subtitle: '',
        body: '',
    });

    const [copy, setCopy] = useState({
        post_id: '',
        title: '',
        author: '',
        date: '',
        subtitle: '',
        body: '',
    });

    const [notification, setNotification] = useState(0);

    const getAll = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/posts/');

            if (response) {
                setDocs(response.data?.posts);
            }
        } catch (error) {
            //
        }
    };

    const postHasChanges = () => {
        if (post.title !== copy.title || post.author !== copy.author || post.subtitle !== copy.subtitle || post.body !== copy.body) {
            return true;
        }

        return false;
    };

    const updateRequest = async () => {
        if (postHasChanges() === true) {
            try {
                const response = await axios.put('http://localhost:8080/api/posts/update', post);

                setNotification(1);
            } catch (error) {
                setNotification(2);
            }
        }
    };

    const deleteRequest = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/api/posts/delete', { post_id: post.post_id });

            if (response.status === 200)
                setNotification(1);
        } catch (error) {
            setNotification(2);
        }
    };

    const handleChoice = (event) => {
        setReady(true);
        setChosen(event.target.value);
    };

    useEffect(() => getAll(), []);
    
    useEffect(() => {
        if (chosen) {
            const p = docs[chosen];

            setPost({ ...p, });
            setCopy({ ...p, });
        }
    }, [chosen]);

    return (
        <>

            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <InputLabel>Post para editar</InputLabel>
                <Select
                    value={chosen}
                    onChange={handleChoice}
                    label="Post para editar"
                >
                    {
                        docs.map((post, index) => (
                            <MenuItem value={index}>{post.title}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            {
                ready === true ? (
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

                        <Stack spacing={2} direction="row">
                            <Button
                                variant="outlined"
                                className={classes.submitButton}
                                onClick={updateRequest}
                            >
                                Concluir
                            </Button>

                            <Button
                                color="error"
                                variant="outlined"
                                className={classes.submitButton}
                                onClick={deleteRequest}
                            >
                                Apagar Post
                            </Button>
                        </Stack>

                    </>
                )
                : null
            }

            <Notification 
                open={notification !== 0}
                onClose={() => setNotification(0)}
                message={
                    notification === 1 
                    ? `Post '${post.title}' foi atualizado com sucesso`
                    : 'Um erro ocorreu. Tente novamente.'
                }
            />

        </>
    );
};

export default UpdatePost;