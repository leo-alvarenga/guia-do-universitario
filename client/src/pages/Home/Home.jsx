// components
import Navigation from "../../components/Navigation/Navigation";

// styles
import globalStyles from "../../App.style";
import localStyles from "./Home.style";

const Home = () => {
    const globalClasses = globalStyles();
    const localClasses = localStyles();

    return (
        <div className={globalClasses.page}>
            <Navigation />
            <h1>App!</h1>
        </div>
    );
};

export default Home;