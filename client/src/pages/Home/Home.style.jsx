import { makeStyles } from '@material-ui/styles';

const localStyles = makeStyles(() => ({
    page: {
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center'
    },
    
    miniContainer: {
        maxWidth: '50%',
        padding: '1rem',
    }
}));

export default localStyles;