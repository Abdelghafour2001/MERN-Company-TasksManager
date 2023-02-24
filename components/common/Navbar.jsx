import { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './styles/Navbar.css';
import { logout, reset } from '../../features/auth/authSlice';
import { Notification, Sidenav, ManagerProtect } from '../';
import { burgerIcon, dashboardIcon, companyIcon, userIcon, loginIcon, logoutIcon, registerIcon, calenderRangeIcon } from '../../constance/icons';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sidenav, setSidenav] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const company = useSelector((state) => state.company.company);
    const employee = useSelector((state) => state.employee.userEmployees)?.filter((employee) => employee.isManager)[0];

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <div className="nav-left">
                    <ul className="nav-links">
                        {user && company && (
                        <ManagerProtect>
                            <li>
                                <NavLink to="/dashboard">
                                    {dashboardIcon}
                                    Dashboad
                                </NavLink>
                            </li>
                        </ManagerProtect>
                        )}
                        { user && (
                        <li>
                            <NavLink to="/company">
                                {companyIcon}
                                Company
                            </NavLink>
                        </li>
                        )}
                        {user && company && company.businesses.length !== 0 && (
                        <li>
                            <NavLink to={`/scheduler`}>
                                {calenderRangeIcon}
                                Scheduler
                            </NavLink>
                        </li>
                        )} 
                    </ul>
                </div>
                <div className="nav-right">
                    <ul className="nav-links">
                        {user && company && (
                            <Notification />
                        )}
                        {user ? (
                        <>
                            <li className="user-menu">
                                <NavLink to="/user">
                                    {userIcon}
                                    {user.firstName}
                                </NavLink>
                                <ul className="nav-menu-links">
                                    <li>
                                        <a onClick={onLogout}>
                                            {logoutIcon}
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>
                        ) : (
                        <>
                            <li>
                                <NavLink to="/login">
                                    {loginIcon}
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">
                                    {registerIcon}
                                    Register
                                </NavLink>
                            </li>
                        </>
                        )}
                    </ul>
                </div>
            </div>
            <div className="nav-burger h-100">
                <div className="flex align-between h-100 px-1">
                    {user && company && (
                        <Notification />
                    )}
                    <div className="btn btn-outline" onClick={() => {setSidenav(true)}}>
                        {burgerIcon}
                    </div>
                </div>
                <Sidenav
                    isSidenavOpen={sidenav}
                    setIsSidenavOpen={setSidenav}
                    title="Menu"
                >
                    <ul className="nav-burger-links">
                        {user && company && (
                        <ManagerProtect>
                            <li>
                                <NavLink onClick={() => setSidenav(false)} to="/dashboard">
                                    {dashboardIcon}
                                    Dashboad
                                </NavLink>
                            </li>
                        </ManagerProtect>
                        )}
                        { user && (
                        <li>
                            <NavLink onClick={() => setSidenav(false)} to="/company">
                                {companyIcon}
                                Company
                            </NavLink>
                        </li>
                        )}
                        {user && company && company.businesses.length !== 0 && (
                        <li>
                            <NavLink onClick={() => setSidenav(false)} to={`/scheduler`}>
                                {calenderRangeIcon}
                                Scheduler
                            </NavLink>
                        </li>
                        )}
                        {user ? (
                        <>
                            <li>
                                <NavLink to="/user" onClick={() => setSidenav(false)}>
                                    {userIcon}
                                    {user.firstName}
                                </NavLink>
                            </li>
                            <li>
                                <a onClick={onLogout}>
                                    {logoutIcon}
                                    Logout
                                </a>
                            </li>
                        </>
                        ) : (
                        <>
                            <li>
                                <NavLink onClick={() => setSidenav(false)} to="/login">
                                    {loginIcon}
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => setSidenav(false)} to="/register">
                                    {registerIcon}
                                    Register
                                </NavLink>
                            </li>
                        </>
                        )}
                    </ul>
                </Sidenav>
            </div>
        </nav>
    )
}

export default Navbar