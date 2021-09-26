import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from './Sidebar';

const Navigation = (props) => {
    const [sidebarIsActive, setSidebarIsActive] = useState(false);

    const handleSidebar = () => {
        setSidebarIsActive(!sidebarIsActive);
    };

    return (
        <>
            <Navbar onOpen={handleSidebar} onThemeChange={props.onThemeChange} darkMode={props.darkMode} />
            <Sidebar onClose={handleSidebar} active={sidebarIsActive} />
        </>
    );
};

export default Navigation;