import { useState, useEffect } from 'react';
import axios from 'axios';


import { connect, useDispatch } from 'react-redux';
import { setLoading } from '../../store/loading'

// styles
import { Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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

    const [filtered, setFiltered] = useState([]);

    const [tags, setTags] = useState([]);
    const [chosen, setChosen] = useState(-1);

    const getTags = async () => {
        dispatch(setLoading(true));

        try {
            const response = await axios.get('/api/tags/'); // todo -> change this static route

            setTags(response.data?.tags);
        } catch (error) {
            //
        } finally {
            dispatch(setLoading(false));
        }
    };

    const getPosts = async () => {
        dispatch(setLoading(true));

        try {
            const response = await axios.get('/posts/'); // todo -> change this static route

            setPosts(response.data?.posts);
            setFiltered(response.data?.posts);
            setErr(false);
        } catch (error) {
            setErr(true);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleFilterSelection = (event) => {
        const value = event.target.value;

        const f = [];

        if (value >= 0) {
            for (let i = 0; i < posts.length; ++i) {
                if (posts[i]?.tags.includes(tags[value].name))
                    f.push(posts[i]);
            }

            setFiltered([ ...f ]);
        } else {
            setFiltered([ ...posts ]);
        }
        
        setChosen(value);
    };

    const loadingSkeleton = () => (
        filtered.map((post, index) => (
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
            if (filtered.length > 0) {
                return (
                    filtered.map((post, index) => (
                        <PostMiniature
                            key={index}
                            id={post.post_id}
                            title={post.title}
                            author={post.author}
                            date={post.date}
                            subtitle={post.subtitle}
                            body={post.body}
                            tags={post.tags}
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
        getTags();
        getPosts();

        // filter here by tag
    }, []);

    return (
        <div className={localClasses.wrapper}>
            <Paper className={localClasses.miniContainer}>
                <div>
                    <FormControl sx={{ marginBottom: '1rem', justifySelf: 'center' }}>
                        <InputLabel>Tags</InputLabel>
                        <Select
                            value={chosen}
                            onChange={handleFilterSelection}
                            label="Filtro selecionado"
                        >
                            <MenuItem key={-1} value={-1}>Nenhum</MenuItem>
                            {
                                tags.map((tag, index) => (
                                    <MenuItem key={index} value={index}>{tag.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

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