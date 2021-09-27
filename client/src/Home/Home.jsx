import { useSelector } from 'react-redux';

// components
import Page from '../components/Page/Page';
import PostVision from '../components/PostVision';

// styles
import localStyles from "./Home.style";


const Home = (props) => {
    const localClasses = localStyles();
    const loading = useSelector((state) => state.loading);

    return (
        <Page onThemeChange={props.onThemeChange} darkMode={props.darkMode}>

            <div className={localClasses.wrapper}>
                {
                    loading ? 
                    null
                    :
                    <PostVision darkMode={props.darkMode} />
                }
            </div>

        </Page>
    );
};

export default Home;