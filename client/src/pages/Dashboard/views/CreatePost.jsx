// react
import { useState, useEffect } from 'react';

// axios
import axios from 'axios';

// mui
import { TextField, Button, FormControlLabel, FormGroup, Checkbox } from '@mui/material';

import Notification from '../../../components/Alerts/Notification';

const getTodaysDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
};

const CreatePost = (props) => {

    const [notification, setNotification] = useState(0);
    const [notificationMsg, setNotificationMsg] = useState('');

    const [post, setPost] = useState({
        username: props.username,
        title: '',
        author: '',
        date: getTodaysDate(),
        subtitle: '',
        body: '',
        tags: [],
    });

    const [checked, setChecked] = useState([]);

    const changeNotificationMessage = (type) => {
        switch (type) {
            default:
                setNotificationMsg('Se certifique de que o post possua um corpo e um título antes de postar.');
                break;
            case 2: 
                setNotificationMsg(`Post '${post.title}' foi atualizado com sucesso.`);
                break;
            case 3:
                setNotificationMsg('Um erro ocorreu. Tente novamente.');
                break;
        }

        setNotification(type);
    };

    const postIsValid = () => {
        return Boolean(post.title.length > 0 && post.body.length > 0);
    };

    const postRequest = async () => {
        if (postIsValid() === true) {
            try {
                const response = await axios.post('/api/posts/new', post);
    
                changeNotificationMessage(2);
            } catch (error) {
                changeNotificationMessage(3);
            }
        } else {
            changeNotificationMessage(1);
        }
    };

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

    useEffect(() => {
        const tags = [];
        
        for (let i = 0; i < checked.length; ++i) {
            if (checked[i] === true) {
                tags.push(props.tags[i]);
            }
        }

        setPost({ ...post, tags: [ ...tags ], });
    }, [JSON.stringify(checked)]);

    useEffect(() => {
        setChecked(initChecked());
    }, []);

    return (
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
                    props.tags?.map((tag, index) => (
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

            <Button
                variant="outlined"
                onClick={postRequest}
                sx={{
                    width: '6rem',
                    margin: '1rem 0 1rem 0',
                }}
            >
                Concluir
            </Button>

            <Notification 
                open={notification !== 0}
                onClose={() => setNotification(0)}
                message={notificationMsg}
            />

        </>
    );
};

export default CreatePost;