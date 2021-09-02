import { makeStyles } from "@material-ui/styles";

// colors
import { colors } from "../../../App.style";

const localStyles = makeStyles(() => ({
    sidebar: {
        zIndex: '10',
        position: 'fixed',
        left: '0',
        top: '0',
        height: '100vh',
        width: '5rem',
        backgroundColor: colors.sidebarPrimary,

        color: colors.sidebarTextColor,
        boxShadow: '1px 0px 5px black',
    },
    sidebarContent: {
        marginTop: '5rem',
        display: 'grid',
        gridAutoFlow: 'rows',
        gridTemplateRows: 'repeat(auto-fit, minmax(2rem, 1fr))',
        gap: '1rem',

        width: '100%',
    },
    sidebarContentList: {
        padding: '0',
        display: 'grid',
        gridAutoFlow: 'rows',
        gridTemplateRows: 'repeat(auto-fit, minmax(2rem, 1fr))',
        
        listStyle: 'none',
        justifyItems: 'center',
        justifyContent: 'center',
    },
    sidebarContentListItem: {
        minWidth: "2rem",
        minHeight: "1rem",
        
        textAlign: 'center',

        margin: '0.5rem 0rem 0.5rem 0rem',
        textDecoration: 'none',
        color: 'inherit',
        
        transition: "all 0.5s",
        "&:hover": {
            transform: "translateY(-1px) scale(1.01)",
        },
    },
}));

export default localStyles;