import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const sidebarItems = [
    [
        {
            title: 'Jeniffer Laila',
            icon: <FavoriteOutlinedIcon />,
        },
        {
            title: 'Leonardo A. Alvarenga',
            icon: <FavoriteOutlinedIcon />,
        },
        {
            title: 'Leonardo A. Alvarenga',
            icon: <FavoriteOutlinedIcon />,
        },
        {
            title: 'Jeniffer Laila',
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
