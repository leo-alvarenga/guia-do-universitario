import { Paper } from "@mui/material";

import localStyles from "./Page.style";

import Navigation from "../Navigation";

const Page = (props) => {
    const localClasses = localStyles();

    return (
        <Paper className={localClasses.wrapper} elevation={0}>
            <Navigation onThemeChange={props.onThemeChange} darkMode={props.darkMode} />

            <Paper className={localClasses.page} elevation={0}>    
                {props.children ? props.children : null}
            </Paper>
        </Paper>
    );
};

export default Page;