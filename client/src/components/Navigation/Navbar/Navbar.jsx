import localStyles from "./Navbar.style";
import getNavbarItems from "./Navbar.items";

const Navbar = (props) => {
    const localClasses = localStyles();
    
    const handleSidebarToogle = () => {
        if (props.toogleSidebar) {
            props.toogleSidebar();
        } else {
            console.error("Toogling not available.");
        }
    };

    return(
        <>
            <div className={localClasses.navbar}>
                <div className={localClasses.navbarHeader}>
                    <div className={localClasses.navbarHeaderSidebarToogle} onClick={handleSidebarToogle}>
                        ativar
                    </div>
                    <a href="/" className={localClasses.navbarHeaderBrandWrapper}>
                        <div className={localClasses.navbarHeaderBrand} href="/">
                            Guia do Universitário
                        </div>
                    </a>
                </div>

                {
                    getNavbarItems(localClasses.navbarContentList, localClasses.navbarContentListItem)
                }
                
            </div>
        </>
    );
};

export default Navbar;