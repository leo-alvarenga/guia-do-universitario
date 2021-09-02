import { makeStyles } from "@material-ui/styles";

// colors
import { colors } from "../../../App.style";

const localStyles = makeStyles(() => ({
    navbar: {
        zIndex: '20',
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '3rem',
        padding: '1rem',
        backgroundColor: colors.navbarPrimary,
        color: colors.navbarTextColor,

        display: 'grid',
        gridAutoFlow: 'columns',
        gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
        gap: '0.5rem',

        alignItems: 'center',
        alignContent: 'center',
        boxShadow: '0px 1px 5px black',
    },
    navbarHeader: {
        display: 'flex',
        alignItems: 'center',
        width: '80%',
    },
    navbarHeaderSidebarToogle: {
        marginRight: '2rem',
        marginLeft: '0.5rem',
        transition: 'all 0.5s',
        "&:hover": {
            transform: 'translateY(-1px) scale(1.01)',
            cursor: 'pointer',
        }
    },
    navbarHeaderBrandWrapper: {
        color: 'inherit',
        textDecoration: 'none',
        transition: 'all 0.5s',
        "&:hover": {
            transform: 'translateY(-1px) scale(1.01)',
            textShadow: '2px 2px #FF0000',
            cursor: 'pointer',
        }
    },
    navbarHeaderBrand: {
        fontFamily: 'Satisfy',
        fontSize: '2rem'
    },
    navbarContentList: {
        marginRight: '2rem',
        padding: '0',
        display: 'grid',
        justifyContent: 'end',
        gridTemplateColumns: 'repeat(auto-fit, minmax(2rem, 5rem))',
        gap: '0.5rem',
        
        listStyle: 'none',
    },
    navbarContentListItem: {
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