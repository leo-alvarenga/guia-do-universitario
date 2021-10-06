import { makeStyles } from '@material-ui/styles';

const localStyles = makeStyles(() => ({
    page: {
        position: 'relative',
        margin: '1rem',
        padding: '0.5rem',
        borderRadius: '0.5rem',
    },
    wrapper: {
        minHeight: '100vh',
        borderRadius: '0',
    }
}));

export default localStyles;