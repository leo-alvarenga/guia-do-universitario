// routes
import { useParams } from 'react-router-dom';

// axios
import axios from 'axios';

// react
import { useState, useEffect } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/loading';

// mui
import { Paper, Typography } from "@mui/material";
import localStyles from './Post.style';

// components
import ErroRequest from '../Alerts/ErroRequest';

const Post = (props) => {
    const localClasses = localStyles();

    const { post_id } = useParams();

    const [data, setData] = useState({});
    const [err, setErr] = useState(false);

    const dispatch = useDispatch();

    const getFallbackImage = async () => {
        try {
            axios.defaults.headers.common['x-api-key'] = '6ca8360c-05b3-492d-b1ec-26bbd410ef89';


            const response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } );

            return response.data[0].url;
        } catch (error) {
            //
        }
    };

    const getPost = async () => {
        dispatch(setLoading(true));

        try {
            const response = await axios.get(`http://localhost:8080/api/post/${post_id}`)

            if (response.status === 200) {
                setData(response.data.id_search);

                getFallbackImage();
            }

            setErr(false);
        } catch (error) {
            setErr(true);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const content = () => {
        if (err) {
            return <ErroRequest onClick={getPost} />
        } else {
            return (
                <>

                    <Typography variant="h1" color="text.primary" className={localClasses.title}>
                        {data.title}
                    </Typography>

                    {
                        !data.subtitle ? 
                        (
                            <Typography variant="h3" color="text.primary" className={localClasses.body}>
                                {data.subtitle}
                            </Typography>
                        )
                        :
                        null
                    }

                    <Typography variant="p" color="text.primary" className={localClasses.body}>
                        {data.body}
                    </Typography>
                </>
            );
        }
    };

    useEffect(() => getPost(), []);

    return (
        <Paper className={localClasses.wrapper}>
            { content() }
        </Paper>
    );
};

export default Post;