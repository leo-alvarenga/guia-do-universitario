import { theme, createTheme } from '@mui/material/styles';
import { connect } from 'react-redux';

export const colors = {
    black: '#000000',
    white: '#FFFFFF',
    midGray: 'hsl(200, 0%, 70%)',
    primary: '#9600BC',
    navbarTextColor: '#FFFFFF',
    sidebarPrimary: '#C7ACCE',
    sidebarTextColor: '#FFFFFF',
};

export const lightTheme = createTheme({
    palette: {
        type: 'light',

        text: {
            primary: '#000000',
            secondary: '#141414',
            disabled: '#212121'
        },

        background: {
            paper: '#f0f0f0',
            default: '#FFFFFF'
        },

        primary: {
            main: '#9600BC',
            contrastText: '#FFFFFF',
        },

        secondary: {
            main: '#C7ACCE',
            contrastText: '#FFFFFF',
        },

        error: {
            light: '#ef5350',
            main: '#d32f2f',
            dark: '#c62828',
        },

        warning: {
            light: '#ff9800',
            main: '#ED6C02',
            dark: '#e65100',
        },

        info: {
            light: '#03a9f4',
            main: '#0288d1',
            dark: '#01579b',
        },

        success: {
            light: '#4caf50',
            main: '#2e7d32',
            dark: '#1b5e20',
        }
    },

    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
    },

    contrastThreshold: 3,
});

export const darkTheme = createTheme({
    palette: {
        type: 'dark',

        text: {
            primary: '#FFFFFF',
            secondary: '#b5b5b5',
            disabled: '#ffffff80'
        },

        background: {
            paper: '#151a22',
            default: '#151a22',
        },
        
        primary: {
            main: '#9600BC',
            contrastText: '#FFFFFF',
        },

        secondary: {
            main: '#C7ACCE',
            contrastText: '#FFFFFF',
        },

        action: {
            active: '#fff',
            hover: '#ffffff14',
            selected: '#ffffff29',
            disabled: '#ffffff4d',
            disabledBackground: '#ffffff1f',
        },

        error: {
            light: '#ef5350',
            main: '#d32f2f',
            dark: '#c62828',
        },

        warning: {
            light: '#ff9800',
            main: '#ED6C02',
            dark: '#e65100',
        },

        info: {
            light: '#03a9f4',
            main: '#0288d1',
            dark: '#01579b',
        },

        success: {
            light: '#4caf50',
            main: '#2e7d32',
            dark: '#1b5e20',
        },

        divider: '#ffffff1f',
    },

    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
    },

    contrastThreshold: 3,
});

