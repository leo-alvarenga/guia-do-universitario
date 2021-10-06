import { useState, useEffect } from 'react';
import axios from 'axios';


import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../store/loading'

// styles
import { Paper, Alert, AlertTitle, Typography, Button } from '@mui/material';
import localStyles from "./Home.style";

// components
import PostMiniature from '../../components/PostMiniature';
import PostMiniatureSkeleton from '../../components/PostMiniature/loading';


const Home = (props) => {
    const localClasses = localStyles();
    const loading = useSelector((state) => state.loading);

    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(false);

    const dispatch = useDispatch();

    const getPosts = async () => {
        dispatch(setLoading(true));

        try {
            const response = await axios.get('http://localhost:8080/api/posts/'); // todo -> change this static route

            setPosts(response.data?.posts);
            setErr(false);
        } catch (error) {
            console.log(error);
            setErr(true);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => getPosts(), []);

    const loadingSkeleton = () => (
        posts.map((post) => (
            <PostMiniatureSkeleton />
        ))
    );

    const content = () => {
        if (err === true) {
            return (
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    
                    <Typography>
                        Não foi possível carregar o conteúdo.
                    </Typography>

                    <Button onClick={getPosts}>Tentar novamente</Button>
                </Alert>
            );
        } else {
            if (posts.length > 0) {
                return (
                    posts.map((post, index) => (
                        <PostMiniature id={post.post_id} title={post.title} body={post.body} darkMode={props.darkMode} />
                    ))
                );
            } else {
                return (
                    <Alert severity="info">
                        <AlertTitle>Tão vazio!</AlertTitle>
                        Não existem conteúdos a serem exibidos por aqui. Desculpe pelo transtorno!
                    </Alert>
                );
            }
        }
    };

    return (
        <div className={localClasses.wrapper}>
            <Paper className={localClasses.miniContainer}>
                <div>
            
                    { loading === true ? loadingSkeleton() : content() }
                </div>                        
            </Paper>
        </div>
    );
};

export default Home;