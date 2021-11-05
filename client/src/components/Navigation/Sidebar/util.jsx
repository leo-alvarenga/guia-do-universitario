import { FavoriteBorderOutlined as Favorites, DynamicFeedOutlined as Home, CalculateOutlined as Calculator } from '@mui/icons-material';

const sidebarItems = [
    {
        title: 'Todos os posts',
        icon: <Home />,
        link: '/',
    },
    {
        title: 'Favoritos',
        icon: <Favorites />,
        link: '/favorites',
    },
    {
        title: 'Calculadora de Coeficiente de Rendimento',
        icon: <Calculator />,
        link: 'https://calculadora-cr.web.app/'
    }
];

export const getSidebarItemsList = (userType) => {
    return sidebarItems;
};
