// react
import { useState, useEffect } from 'react';

// routes
import { useParams } from 'react-router-dom';

// requests
import axios from 'axios';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/loading';

// mui
import { Paper, Alert, AlertTitle, Typography, Button } from '@mui/material';

// components
import ErroRequest from '../../components/Alerts/ErroRequest';
import ErroNotFound from '../../components/Alerts/ErroNotFound';
import Post from '../../components/Post';

const Read = () => {
    const { post_id } = useParams();

    const [data, setData] = useState(undefined);
    const [err, setErr] = useState(0);

    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    const getPostById = async () => {
        dispatch(setLoading(true));

        try {
            const response = await axios.get(`http://localhost:8080/api/post/${post_id}`);
            
            const status = response.status;

            if (status === 200) {
                setData(response.data);
                setErr(0);
            } else if (status === 404) {
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

    useEffect(() => getPostById(), [])

    const content = () => {
        if (err === 1) {
            return (
                <ErroRequest onClick={getPostById} />
            );
        } else if (err === 2) {
            <ErroNotFound />
        } else {
            return (
                <Post data={data} />
            );
        }
    };

    return (
        <Paper>
            { content() }
        </Paper>
    );
};

export default Read;