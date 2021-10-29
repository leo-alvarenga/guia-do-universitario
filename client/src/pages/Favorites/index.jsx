import { useHistory } from 'react-router';

import { useState, useEffect } from 'react';
import axios from 'axios';


import { connect, useDispatch } from 'react-redux';
import { setLoading } from '../../store/loading'

// styles
import { Paper } from '@mui/material';
import localStyles from "../Home/Home.style";

// components
import PostMiniature from '../../components/PostMiniature';
import PostMiniatureSkeleton from '../../components/PostMiniature/loading';
import Erro from '../../components/Alerts/Erro';


const Favorites = (props) => {
    const localClasses = localStyles();
    const history = useHistory();

    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(false);

    const dispatch = useDispatch();

    const getOne = async (postId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);

            return response.data?.id_search;
        } catch (error) {
            return undefined;
        }
    };

    const getPosts = async () => {
        dispatch(setLoading(true));
        
        const p = [];
        let r;

        for (let i = 0; i < props.user.favorites.length; i++) {
            r = await getOne(props.user.favorites[i]);

            if (r !== undefined) {
                p.push(r);
            }
        }

        setPosts(p);

        dispatch(setLoading(false));
    };

    const loadingSkeleton = () => (
        posts.map((post, index) => (
            <PostMiniatureSkeleton key={index} />
        ))
    );

    const redirect = () => {
        history.push('/');
    };

    const content = () => {
        if (err === true) {
            return (
                <Erro
                    severity="info"
                    body="Não foi possível carregar o conteúdo."
                    onClick={() => getPosts()}
                />
            );
        } else {
            if (posts.length > 0) {
                return (
                    posts.map((post, index) => (
                        <PostMiniature
                            key={index}
                            id={post.post_id}
                            title={post.title}
                            author={post.author}
                            date={post.date}
                            subtitle={post.subtitle}
                            body={post.body}
                            darkMode={props.darkMode}
                        />
                    ))
                );
            } else {
                return (
                    <Erro
                        severity="info"
                        title="Tão vazio!"
                        body="Não existem posts favoritos! Tente favoritar alguns posts antes de voltar aqui novmente."
                        label="Ver todos os posts"
                        onClick={redirect}
                    />
                );
            }
        }
    };

    useEffect(async () => {
        getPosts();
    }, []);

    return (
        <div className={localClasses.wrapper}>
            <Paper className={localClasses.miniContainer}>
                <div>
                    {
                        props.user.isAuth === true
                        ? props.loading === true ? loadingSkeleton() : content()
                        : (
                            <Erro
                                body="Você precisa estar conectado com seu usuário para ver seus favoritos."
                                label="Ver todos os posts"
                                onClick={redirect}
                            />
                        )
                    }
                </div>                        
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => ({
    loading: state.loading.value,
    user: state.user.value,
});

export default connect(mapStateToProps)(Favorites);