import { useState } from "react";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";

import GoogleIcon from "../assets/AuthStuffs/google.svg";
import GitHubIcon from "../assets/AuthStuffs/github.svg";
import "../styles/AuthScreen/AuthScreen.scss";

const AuthScreen = () => {
	const [isLogin, setIsLogin] = useState(true);

	const toggleForm = () => {
		setIsLogin(!isLogin);
	};

	return (
		<div className="auth-container">
			<div className="auth-card">
				<div className="auth-card__header">
					<h2 className="auth-card__title">
						{isLogin ? "Welcome Back!" : "Create Account"}
					</h2>
					<p className="auth-card__subtitle">
						{isLogin
							? "Enter your credentials to access your account"
							: "Fill in your details to get started"}
					</p>
				</div>

				<div className="auth-card__content">
					<form className="auth-form">
						{!isLogin && (
							<div className="auth-form__group">
								<FiUser className="auth-form__icon" />
								<input
									type="text"
									placeholder="Username"
									className="auth-form__input"
								/>
							</div>
						)}

						<div className="auth-form__group">
							<FiMail className="auth-form__icon" />
							<input
								type="email"
								placeholder="Email Address"
								className="auth-form__input"
							/>
						</div>

						<div className="auth-form__group">
							<FiLock className="auth-form__icon" />
							<input
								type="password"
								placeholder="Password"
								className="auth-form__input"
							/>
						</div>

						{!isLogin && (
							<div className="auth-form__group">
								<FiLock className="auth-form__icon" />
								<input
									type="password"
									placeholder="Confirm Password"
									className="auth-form__input"
								/>
							</div>
						)}

						{isLogin && (
							<div className="auth-form__options">
								<label className="auth-form__remember">
									<input type="checkbox" />
									<span>Remember me</span>
								</label>
								<a href="#" className="auth-form__forgot">
									Forgot Password?
								</a>
							</div>
						)}

						{!isLogin && (
							<div className="auth-form__terms">
								<label className="auth-form__remember">
									<input type="checkbox" />
									<span>
										I agree to the Terms of Service and
										Privacy Policy
									</span>
								</label>
							</div>
						)}

						<button type="submit" className="auth-form__submit">
							<span>
								{isLogin ? "Sign In" : "Create Account"}
							</span>
							<FiArrowRight className="auth-form__submit-icon" />
						</button>
					</form>
				</div>

				<div className="auth-card__footer">
					<p>
						{isLogin
							? "Don't have an account? "
							: "Already have an account? "}
						<a
							// href="#"
							className="auth-card__link"
							onClick={(e) => {
								e.preventDefault();
								toggleForm();
							}}>
							{isLogin ? "Sign Up" : "Sign In"}
						</a>
					</p>
				</div>

				<div className="auth-social">
					<div className="auth-social__divider">
						<span>Or continue with</span>
					</div>
					<div className="auth-social__buttons">
						<button className="auth-social__button">
							<img src={GoogleIcon} alt="Google" />
							Google
						</button>
						<button className="auth-social__button">
							<img src={GitHubIcon} alt="Github" />
							Github
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthScreen;
