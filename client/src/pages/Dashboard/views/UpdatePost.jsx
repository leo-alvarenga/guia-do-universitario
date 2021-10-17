// react
import { useState, useEffect } from 'react';

// axios
import axios from 'axios';

// mui
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const UpdatePost = (props) => {
    const classes = useStyles();

    const [post, setPost] = useState({
        post_id: '',
        title: '',
        subtitle: '',
        body: '',
    });

    const [chosen, setChosen] = useState(0);
    const [ready, setReady] = useState(false);

    const [docs, setDocs] = useState([]);

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

    const updateRequest = async () => {
        try {
            const response = await axios.put('http://localhost:8080/api/posts/update', post);

            console.log(response);
        } catch (error) {
            //
        }
    };

    const handleChoice = (event) => {
        setReady(true);
        setChosen(event.target.value);

        if (chosen) {
            const p = docs[chosen];

            setPost({ ...p, });
        }
    };

    useEffect(() => getAll(), []);

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
                ready === true ?
                (
                    <>
                        <TextField
                            label="Title"
                            value={post.title}
                            onChange={(event) => setPost({ ...post, title: event.target.value, })}
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
                            onClick={updateRequest}
                        >
                            Concluir
                        </Button>
                    </>
                )
                :
                null
            }

        </>
    );
};

export default UpdatePost;