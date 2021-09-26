import { Paper } from "@mui/material";

import localStyles from "./Page.style";

import Navigation from "../Navigation";

const Page = (props) => {
    const localClasses = localStyles();

    return (
        <Paper>
            <Navigation onThemeChange={props.onThemeChange} darkMode={props.darkMode} />

            <Paper className={localClasses.page} elevation={1}>    
                {props.children ? props.children : null}
            </Paper>
        </Paper>
    );
};

export default Page;