import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiHome, FiInfo, FiMenu, FiX } from "react-icons/fi";
import "../../styles/Home/Header.scss";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(true)

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

				{/* Navigation Links */}
				<nav
					className={`home-header__nav ${
						isMenuOpen ? "active" : ""
					}`}>
					<Link to="/home" className="home-header__nav-link">
						Home
					</Link>
					<Link to="/about" className="home-header__nav-link">
						About
					</Link>

					{/* Profile Section */}
					<div className="home-header__profile">
						{ isLogin ? 
						(<Link
							to="/profile"
							className="home-header__profile-link">
							<div className="home-header__profile-image">
								<FiUser />
							</div>
							<span className="home-header__profile-text">
								Profile
							</span>
						</Link>) : (
						<Link to='/'
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
				</nav>
			</div>
		</header>
	);
};

export default Header;
