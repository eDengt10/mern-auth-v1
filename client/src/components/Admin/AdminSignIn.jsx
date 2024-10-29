import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "../../styles/AuthPage/AuthPage.scss";
import { useState } from "react";
import { Spinner } from "../../pages/imports";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosConfig";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../redux/slices/adminSlice";

const AdminSignIn = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			const response = axiosInstance.post("/auth/admin/signin", formData);

			if (response.data.success) {
				const data = response.data;

				dispatch(setAdmin({
						adminUser: data.adminData,
						adminToken: data.adminToken,
					}));
				navigate("/admin/home");
			} else {
				setError("Login failed.")
			}
		} catch (error) {
			console.log(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="auth-container">
			<div className="auth-card">
				<div className="auth-card__header">
					<h1 className="auth-card__title">Admin Login</h1>
					<p className="auth-card__subtitle">
						Enter your credentials to access your account
					</p>
				</div>

				<form
					className="auth-form auth-card__content"
					onSubmit={handleFormSubmit}>
					<div className="auth-form__group">
						<FiMail className="auth-form__icon" />
						<input
							type="email"
							name="email"
							className="auth-form__input"
							placeholder="Email address"
							onChange={handleInputChange}
						/>
					</div>

					<div className="auth-form__group">
						<FiLock className="auth-form__icon" />
						<input
							type="password"
							name="password"
							className="auth-form__input"
							placeholder="Password"
							onChange={handleInputChange}
						/>
					</div>

					{error && <div className="auth-form__error">{error}</div>}

					<button
						type="submit"
						className="auth-form__submit"
						disabled={isLoading}>
						{isLoading ? (
							<Spinner size="small" color="primary" />
						) : (
							<>
								Sign In
								<FiArrowRight className="auth-form__submit-icon" />
							</>
						)}
					</button>
				</form>

				<div className="auth-card__footer">
					Dont have an account?{" "}
					<Link to="/signup">
						<a className="auth-card__link">Sign Up</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AdminSignIn;
