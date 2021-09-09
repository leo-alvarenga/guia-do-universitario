import { makeStyles } from '@material-ui/styles';
import { colors } from '../../App.style';

const localStyles = makeStyles(() => ({
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
    header: {
    },
    body: {

    },
}));

export default localStyles;