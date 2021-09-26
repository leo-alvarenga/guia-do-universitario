import { makeStyles } from '@material-ui/styles';
import { colors } from '../../../App.style';

const localStyles = makeStyles(() => ({
    RoundSpinnerMedium: {
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        border: `1px solid ${colors.white}`,
        borderTop: `4px solid ${colors.sidebarPrimary}`,
        animation: '$spin 1s linear infinite',
        margin: '0.2rem',
    },
    "@keyframes spin": {
        "0%": {
        },
        "100%": {
            transform: 'rotate(360deg)',
        },
    },

}));

export default localStyles;