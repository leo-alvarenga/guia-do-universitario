import { makeStyles } from '@material-ui/styles';

const localStyles = makeStyles(() => ({
    wrapper: {
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center'
    },
    
    miniContainer: {
        padding: '1rem',
        minWidth: '80%',
    },
}));

export default localStyles;