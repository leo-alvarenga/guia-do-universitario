import { Paper } from '@mui/material';

// components
import Page from '../../components/Page/Page';
import PostMiniature from '../../components/PostMiniature';

// styles
import localStyles from "./Home.style";

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

const Home = (props) => {
    const localClasses = localStyles();

    return (
        <Page onThemeChange={props.onThemeChange} darkMode={props.darkMode}>

            <Paper className={localClasses.miniContainer}>
                <div>
                    {
                        content.map((post, index) => (
                            <PostMiniature title='oi' text={post.text} darkMode={props.darkMode} />
                        ))
                    }
                </div>
            </Paper>
        </Page>
    );
};

export default Home;