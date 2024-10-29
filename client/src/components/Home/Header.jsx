import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiHome, FiMenu, FiX, FiLogOut } from "react-icons/fi"; 
import { useSelector, useDispatch } from "react-redux"; 
import { clearUser } from "../../redux/slices/userSlice";
import "../../styles/Home/Header.scss";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.user);
	const handleLogout = () => {
		dispatch(clearUser())
	}

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
					<div className="home-header__profile-container">
						<div className="home-header__profile">
							<Link
								to="/profile"
								className="home-header__profile-link">
								<div className="home-header__profile-image">
									{user?.avatar ? (
										<img
											src={`http://localhost:3001${user.avatar}`}
											className="home-header__profile-avatar"
											alt="User"
										/>
									) : (
										<FiUser />
									)}
								</div>
								<span className="home-header__profile-text">
									Profile
								</span>
							</Link>
						</div>
						<button className="home-header__logout-btn" onClick={handleLogout}>
							<FiLogOut />
							<span>Logout</span>
						</button>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
