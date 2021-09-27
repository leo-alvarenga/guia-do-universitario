const items = [
    {
        title: 'Ola',
        link: '',
    },
    {
        title: '2',
        link: '',
    },
    {
        title: '3',
        link: '',
    },
];

const getNavbarItems = (listClass, itemClass) => {
    return (
        <ul className={listClass}>
            {
                items.map((item, index) => (
                    <a href={item.link} className={itemClass} key={index}>
                        <li>
                            {item.title}
                        </li>
                    </a>
                ))
            }
        </ul>
    );
};

export default getNavbarItems;