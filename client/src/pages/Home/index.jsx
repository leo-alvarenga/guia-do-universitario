import { useState, useEffect } from 'react';
import axios from 'axios';


import { connect, useDispatch } from 'react-redux';
import { setLoading } from '../../store/loading'

// styles
import { Paper } from '@mui/material';
import localStyles from "./Home.style";

// components
import PostMiniature from '../../components/PostMiniature';
import PostMiniatureSkeleton from '../../components/PostMiniature/loading';
import Erro from '../../components/Alerts/Erro';


const Home = (props) => {
    const localClasses = localStyles();

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
            setErr(true);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const loadingSkeleton = () => (
        posts.map((post, index) => (
            <PostMiniatureSkeleton key={index} />
        ))
    );

    const content = () => {
        if (err === true) {
            return (
                <Erro
                    body="Não foi possível carregar o conteúdo."
                    onClick={getPosts}
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
                        body="Não existem conteúdos a serem exibidos por aqui. Desculpe pelo transtorno!"
                    />
                );
            }
        }
    };

    useEffect(() => {
        getPosts();

        const f = posts.filter(
            (post) => (
                props.user.favorites.find(p => p === post.post_id) !== undefined
            )
        );

        // filter here by tag
    }, []);

    return (
        <div className={localClasses.wrapper}>
            <Paper className={localClasses.miniContainer}>
                <div>
                    { props.loading === true ? loadingSkeleton() : content() }
                </div>                        
            </Paper>
        </div>
    );
};

const mapStateToProps = (state) => ({
    loading: state.loading.value,
    user: state.user.value,
});

export default connect(mapStateToProps)(Home);