import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { FiUser, FiHome, FiInfo, FiMenu, FiX, FiLogOut } from "react-icons/fi"; // Added FiLogOut
import "../../styles/Home/Header.scss";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.user);
	console.log(user);

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
									{user.avatar ? (
										<img
											src={user.avatar}
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
						<button className="home-header__logout-btn">
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
