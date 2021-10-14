// react
import { useState } from 'react';

// axios
import axios from 'axios';

// mui
import { TextField, Button } from '@mui/material';
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

const CreatePost = (props) => {
    const classes = useStyles();

    const [post, setPost] = useState({
        title: '',
        subtitle: '',
        body: '',
    });

    const postRequest = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/posts/new', post);

            console.log(response);
        } catch (error) {
            //
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
        </>
    );
};

export default CreatePost;