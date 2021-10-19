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
import Erro from '../Alerts/Erro';

const Post = (props) => {
    const localClasses = localStyles();

    /** Post data
     * Properties:
     * - title
     * - subtitle
     * - body
     * - img
     */
    const [data, setData] = useState({
        postId: props.postId,
        img: '',
        title: '',
        author: '',
        date: '',
        subtitle: '',
        body: '',
    });
    const [err, setErr] = useState(0);

    const dispatch = useDispatch();

    /** Get a fallback Image in case the post does not contain a cover picture and/or the picture recovery has failed. 
     * @returns String : A string containing an URL to a randomly selected cat image provided by Cat API
     * @deprecated
    */
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
            const response = await axios.get(`http://localhost:8080/api/posts/${props.postId}`);

            console.log(response);
            if (response.status === 200) {
                setData(response?.data?.id_search);

                setErr(0);
            } else if (response.status === 404) {
                setErr(2);
            } else {
                setErr(1);
            }
        } catch (error) {
            setErr(1);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const content = () => {
        if (err === 1) {
            return <Erro onClick={getPost}/>;
        } else if (err === 2) {
            return <Erro type="404" />;
        } else {
            return (
                <>

                    {
                        data?.img &&
                        (
                            <Paper variant="outlined">
                                <img src={data.img} />
                            </Paper>
                        )
                    }

                    <Typography variant="h1" color="text.primary" className={localClasses.title}>
                        {data.title}
                    </Typography>

                    <Typography gutterBottom variant="caption" component="div" color="text.disabled">
                        {
                            data.author !== undefined
                            ? `Por: '${data.author}'`
                            : null
                        }
                        {
                            data.date !== undefined
                            ? ` em ${data.date}`
                            : null
                        }
                    </Typography>

                    {
                        data.subtitle &&
                        (
                            <Typography variant="h5" color="text.disabled" className={localClasses.sub}>
                                {data.subtitle}
                            </Typography>
                        )
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