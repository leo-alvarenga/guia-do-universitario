import { makeStyles } from '@material-ui/styles';

const globalStyles = makeStyles(() => ({
    page: {
        position: 'relative',
        margin: '6rem 1rem 1rem 6rem',
        padding: '0 0.5rem 0 0.5rem',
        border: '1px solid black',
        borderRadius: '0.5rem',
    },
}));

export default globalStyles;

export const colors = {
    black: '#000000',
    white: '#FFFFFF',
    navbarPrimary: '#9600BC',
    navbarTextColor: '#FFFFFF',
    sidebarPrimary: '#C7ACCE',
    sidebarTextColor: '#FFFFFF',
};
