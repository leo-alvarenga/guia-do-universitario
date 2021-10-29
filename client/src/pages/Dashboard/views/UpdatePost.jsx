// react
import { useState, useEffect } from 'react';

// axios
import axios from 'axios';

// mui
import { FormControl, FormGroup, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, TextField, Stack, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

// components
import Notification from '../../../components/Alerts/Notification';

const useStyles = makeStyles(() => ({
    textSmall: {
        
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
    
    const [chosen, setChosen] = useState(-1);
    const [ready, setReady] = useState(false);

    const [docs, setDocs] = useState([]);

    const [post, setPost] = useState({
        username: props.username,
        post_id: '',
        title: '',
        author: '',
        date: '',
        tags: [],
        subtitle: '',
        body: '',
    });

    const [copy, setCopy] = useState({
        post_id: '',
        title: '',
        author: '',
        date: '',
        tags: [],
        subtitle: '',
        body: '',
    });

    const [notification, setNotification] = useState(0);
    const [notificationMsg, setNotificationMsg] = useState('');

    const [checked, setChecked] = useState([]);

    const initChecked = () => {
        const t = [];

        for (let i = 0; i < props.tags.length; ++i) {
            t.push(false);
        }

        return t;
    };

    const handleTagCheck = (event, index) => {
        if (checked[index] === true) {                                                
            const tags = [ ...post.tags ];
            tags.splice(index, 1);
            
            const c = checked;
            c[index] = false;
            
            setChecked([ ...c ]);
        } else {
            const tags = [ ...post.tags ];
            tags.push(event.target.value);

            const c = checked;
            c[index] = true;
            
            setChecked([ ...c ]);
        }
    };

    const getAll = async () => {
        try {
            const response = await axios.get('/api/posts/');

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

    const changeNotificationMessage = () => {
        if (notification === 1)
            setNotificationMsg(`Post '${post.title}' foi atualizado com sucesso.`);
        else
            setNotificationMsg('Um erro ocorreu. Tente novamente.');
    };

    const updateRequest = async () => {
        if (postHasChanges() === true) {
            try {
                const response = await axios.put('/api/posts/update', post);

                setNotification(1);
            } catch (error) {
                setNotification(2);
            } finally {
                changeNotificationMessage();
            }
        }
    };

    const deleteRequest = async () => {
        try {
            const response = await axios.delete(`/api/posts/delete/${post.username}/${post.post_id}`);

            console.log('r', response);

            setNotification(1);
        } catch (error) {
            setNotification(2);
        } finally {
            changeNotificationMessage();
        }
    };

    const handleChoice = (event) => {
        setReady(true);
        setChosen(event.target.value);
    };

    useEffect(() => getAll(), []);
    
    useEffect(() => {
        const tags = [];
        
        for (let i = 0; i < checked.length; ++i) {
            if (checked[i] === true) {
                tags.push(props.tags[i].name);
            }
        }

        setPost({ ...post, tags: [ ...tags ], });
    }, [JSON.stringify(checked)]);

    useEffect(() => {
        if (chosen >= 0) {
            const p = docs[parseInt(chosen)];

            setPost({ username: post.username, ...p, });
            setCopy({ ...p, });

            console.log(chosen, post);
        } else {
            setReady(false);
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
                    <MenuItem key={-1} value={-1}>Selecione um post...</MenuItem>
                    {
                        docs.map((post, index) => (
                            <MenuItem key={index} value={index}>{post.title}</MenuItem>
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
                            sx={{
                                width: '40%',
                                margin: '1rem 0 1rem 0'
                            }}
                        />
                        
                        <TextField
                            label="Author"
                            value={post.author}
                            onChange={(event) => setPost({ ...post, author: event.target.value, })}
                            variant="outlined"
                            sx={{
                                width: '40%',
                                margin: '1rem 0 1rem 0'
                            }}
                        />

                        <TextField
                            label="Subtitle"
                            value={post.subtitle}
                            onChange={(event) => setPost({ ...post, subtitle: event.target.value, })}
                            variant="outlined"
                            sx={{
                                width: '40%',
                                margin: '1rem 0 1rem 0'
                            }}
                        />

                        <TextField
                            label="Body"
                            value={post.body}
                            onChange={(event) => setPost({ ...post, body: event.target.value, })}
                            multiline
                            rows={4}
                            sx={{
                                width: '80%',
                                margin: '1rem 0 1rem 0',
                            }}
                        />

                        <FormGroup row>
                            {
                                props.tags.map((tag, index) => (
                                    <FormControlLabel
                                        key={index}
                                        label={tag.name}
                                        control={
                                            <Checkbox
                                                value={tag.name}
                                                checked={checked[index] === undefined ? false : checked[index]}
                                                onChange={(event) => handleTagCheck(event, index)}
                                            />
                                        }
                                    />
                                ))
                            }
                        </FormGroup>

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
                message={notificationMsg}
            />

        </>
    );
};

export default UpdatePost;