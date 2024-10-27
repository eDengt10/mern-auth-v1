import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "../../styles/AuthPage/AuthPage.scss";
import { useState } from "react";
import { Spinner } from "../../pages/imports";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";

const SignIn = () => {
	const [isLoading, setIsLogin] = useState(false);
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setIsLogin(true);
		setError(null);

		try {
			var response = await axiosInstance.post("/auth/signin", formData);
			const { token, user } = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));

			navigate("/home");
		} catch (error) {
			console.log("Login failed:", error.response?.data?.message);
			setError(error.response?.data?.message);
		} finally {
			setIsLogin(false);
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
					<h1 className="auth-card__title">Welcome Back!</h1>
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

					{error && (
						<div className="auth-form__error">
							{error}
						</div>
					)}

					<div className="auth-form__options">
						<label className="auth-form__remember">
							<input type="checkbox" />
							Remember me
						</label>
						<a href="#" className="auth-form__forgot">
							Forgot Password?
						</a>
					</div>

					<button type="submit" className="auth-form__submit">
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

				<div className="auth-social">
					<div className="auth-social__divider">
						<span>Or continue with</span>
					</div>
					<div className="auth-social__buttons">
						<button type="button" className="auth-social__button">
							<img src="/google-icon.svg" alt="Google" />
							Google
						</button>
						<button type="button" className="auth-social__button">
							<img src="/github-icon.svg" alt="GitHub" />
							Github
						</button>
					</div>
				</div>

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

export default SignIn;
