// styles
import globalStyles from "../../App.style";
import localStyles from "./404.style";

const NotFound = (props) => {
    const globalClasses = globalStyles();
    const localClasses = localStyles();

    return (
        <div className={globalClasses.page}>
            <h1>
                404
            </h1>
        </div>
    );
};

export default NotFound;