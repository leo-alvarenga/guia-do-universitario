import { Paper } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

import PostMiniature from '../../components/PostMiniature';

const localStyles = makeStyles(() => ({   
    miniContainer: {
        padding: '1rem',
        minWidth: '80%',
    },
}));

const content = [
    {
        title: 'teste',
        text: 'oi',
    },
    {
        title: 'teste',
        text: 'oi',
    },
    {
        title: 'teste',
        text: 'oi',
    }
];

const PostVision = (props) => {
    const localClasses = localStyles();

    return (
        <Paper className={localClasses.miniContainer}>
            <div>
                {
                    content.map((post, index) => (
                        <PostMiniature title='oi' text={post.text} darkMode={props.darkMode} />
                    ))
                }
            </div>                        
        </Paper>
    );
}

export default PostVision;