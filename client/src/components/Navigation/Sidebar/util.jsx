import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const sidebarItems = [
    [
        {
            title: '1',
            icon: <FavoriteOutlinedIcon />,
        },
        {
            title: '2',
            icon: <FavoriteOutlinedIcon />,
        },
        {
            title: '3',
            icon: <FavoriteOutlinedIcon />,
        },
        {
            title: '4',
            icon: <FavoriteOutlinedIcon />
        }
    ],
    [
        {
            title: '1',
            icon: <FavoriteOutlinedIcon />,
        },
        {
            title: '2',
            icon: <FavoriteOutlinedIcon />,
        },
        {
            title: '3',
            icon: <FavoriteOutlinedIcon />,
        },
        {
            title: '4',
            icon: <FavoriteOutlinedIcon />
        }
    ],
];

export const getSidebarItemsList = (userType) => {
    return sidebarItems;
};
