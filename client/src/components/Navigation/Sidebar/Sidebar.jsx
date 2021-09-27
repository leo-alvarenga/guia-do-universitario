import { useState } from "react";

import localStyles from "./Sidebar.style";
import getSidebarItems from "./Sidebar.items";

const Sidebar = (props) => {
    const [toogle, setToogle] = useState(props.toogle || false);
    
    const localClasses = localStyles();

    return (
        <>
            <div className={localClasses.sidebar}>
                <div className={localClasses.sidebarContent}>
                    {
                        getSidebarItems(localClasses.sidebarContentList, localClasses.sidebarContentListItem)
                    }
                </div>
            </div>
        </>
    );
};

export default Sidebar;