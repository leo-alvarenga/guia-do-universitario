// routes
import { useParams } from 'react-router-dom';

// mui
import { Paper } from '@mui/material';

// components
import Post from '../../components/Post';

const Read = () => {
    const { post_id } = useParams();

    return (
        <Paper>
            <Post postId={post_id} />
        </Paper>
    );
};

export default Read;