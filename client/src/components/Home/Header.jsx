import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { FiUser, FiHome, FiInfo, FiMenu, FiX, FiLogOut } from "react-icons/fi"; // Added FiLogOut
import "../../styles/Home/Header.scss";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);

    console.log(user.name + token);

    const handleLogout = () => {
        // Dispatch logout action (you'll need to implement this based on your Redux setup)
        dispatch({ type: 'LOGOUT' }); // Adjust according to your action type
        // Clear local storage if you're storing token there
        localStorage.removeItem('token');
        // Redirect to login or home page
        navigate('/login');
    };

    return (
        <header className="home-header">
            <div className="home-header__container">
                <Link to="/home" className="home-header__brand">
                    <FiHome className="home-header__brand-icon" />
                    <span>Eternals DC</span>
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
                    <Link to="/home" className="home-header__nav-link">
                        Home
                    </Link>
                    <div className="home-header__profile-container">
                        <div className="home-header__profile">
                            {isLogin ? (
                                <Link
                                    to="/profile"
                                    className="home-header__profile-link">
                                    <div className="home-header__profile-image">
                                        {user.avatar ? (
                                            <img 
                                                src={user.avatar} 
                                                className="home-header__profile-avatar"
                                                alt="User"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <FiUser />
                                        )}
                                    </div>
                                    <span className="home-header__profile-text">
                                        Profile
                                    </span>
                                </Link>
                            ) : (
                                <Link 
                                    to='/profile'
                                    className="home-header__profile-link">
                                    <div className="home-header__profile-image">
                                        <FiUser />
                                    </div>
                                    <span className="home-header__profile-text">
                                        Login
                                    </span>
                                </Link>
                            )}
                        </div>
                        {isLogin && (
                            <button 
                                onClick={handleLogout}
                                className="home-header__logout-btn"
                            >
                                <FiLogOut />
                                <span>Logout</span>
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;