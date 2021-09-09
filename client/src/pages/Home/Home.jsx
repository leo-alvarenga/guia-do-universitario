// components
import Page from '../../components/Page/Page';
import PostMiniature from '../../components/PostMiniature/PostMiniature';

// styles
import globalStyles from "../../App.style";
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

const Home = () => {
    const globalClasses = globalStyles();
    const localClasses = localStyles();

    return (
        <Page>
            {
                content.map((post, index) => (
                    <PostMiniature title='oi' text={post.text} />
                ))
            }
        </Page>
    );
};

export default Home;