import { useState } from "react";

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const Navigation = (props) => {
    const [toogleSidebar, setToogleSidebar] = useState(false);

    const handleSidebarToogle = () => {
        setToogleSidebar(!toogleSidebar);
    };
    
    return (
        <>
            <Navbar toogleSidebar={handleSidebarToogle} />
            <Sidebar toogle={toogleSidebar} />
        </>
    );
};

export default Navigation;