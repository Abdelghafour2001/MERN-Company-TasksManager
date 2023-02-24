import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './styles/Sidebar.css';
import { userSideNavLinks, dashboardSideNavLinks } from '../../constance/localData';
import { arrowTopIcon } from "../../constance/icons";

const Sidebar = ({children}) => {
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
    const [navLinks, setNavLinks] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if(location.pathname === '/user') {
            navigate('/user/schedule');
        }
        if(location.pathname === '/dashboard') {
            navigate('/dashboard/shifts');
        }
        if(location.pathname.split('/')[1] === 'user') {
            setNavLinks(userSideNavLinks);
        } else if (location.pathname.split('/')[1] === 'dashboard') {
            setNavLinks(dashboardSideNavLinks);
        }
    }, [location]);

    return (
        <main className={`page ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <div className="sidebar-container">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <div className="sidebar-header-toggle">
                            <button
                                className="btn btn-outline w-100"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                {arrowTopIcon}
                            </button>
                        </div>
                    </div>
                    <div className="sidebar-body">
                        {navLinks?.map((navLink) => {
                            return (
                                <NavLink
                                    key={`sidebar-${navLink.link}`}
                                    to={navLink.link}
                                    className="sidebar-body-item"
                                >
                                {navLink.icon}
                                {isSidebarOpen && (
                                    navLink.label
                                )}
                                </NavLink>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
            {children}
        </main>
    )
}

export default Sidebar