import { FavoriteBorderOutlined as Favorites, DynamicFeedOutlined as Home } from '@mui/icons-material';

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
];

export const getSidebarItemsList = (userType) => {
    return sidebarItems;
};
