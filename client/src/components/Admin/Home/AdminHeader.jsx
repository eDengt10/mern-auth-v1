import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiMenu, FiX, FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { clearAdmin } from "../../../redux/slices/adminSlice";
import "../../../styles/Home/Header.scss";

const AdminHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const admin = useSelector((state) => state.admin.adminUser);
    
    const handleLogout = () => {
        dispatch(clearAdmin());
    };

    return (
        <header className="home-header">
            <div className="home-header__container">
                <Link to="/admin/home" className="home-header__brand">
                    <FiSettings className="home-header__brand-icon" />
                    <span>Admin Panel</span>
                </Link>
                
                <button
                    className="home-header__menu-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </button>

                <nav
                    className={`home-header__nav ${
                        isMenuOpen ? "active" : ""
                    }`}>
                    <div className="home-header__profile-container">
                        {/* Admin Links */}
                        <div className="home-header__profile">
                            <Link
                                to="/admin/dashboard"
                                className="home-header__profile-link">
                                <div className="home-header__profile-image">
                                    <FiUsers />
                                </div>
                                <span className="home-header__profile-text">
                                    Manage Users
                                </span>
                            </Link>
                        </div>
                        
      

                        <button 
                            className="home-header__logout-btn" 
                            onClick={handleLogout}>
                            <FiLogOut />
                            <span>Admin Logout</span>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;