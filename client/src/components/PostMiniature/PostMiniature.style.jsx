import { makeStyles } from '@material-ui/styles';
import { colors } from '../../App.style';

const localStyles = makeStyles((theme) => ({
    postAnchor: {
        textDecoration: 'none',
    },
    
    post: {
        backgroundColor: '#f0f0f0',
        margin: '0.5rem 0 0.5rem 0',
        transition: 'all 1s linear',

        '&:hover': {
            transform: 'translateY(-3px) scale(1.01)',
        },
    },

    postDark: {
        backgroundColor: '#1b202a',
        margin: '0.5rem 0 0.5rem 0',
        transition: 'all 1s linear',

        '&:hover': {
            transform: 'translateY(-3px) scale(1.01)',
        },
    },

    postMiniature: {
        width: '100%',
        minHeight: 'auto',
        margin: '1rem 0 1rem 0',
        border: '1px solid black',
        borderRadius: '0.5rem',

        display: 'grid',
        gridTemplateRows: 'repeat(auto-fit, (min-max(10px, 1fr))',

        justifyItems: 'center',
        color: colors.black,
        zIndex: '20',
    },
}));

export default localStyles;