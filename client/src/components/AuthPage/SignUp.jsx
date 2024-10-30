import { FiMail, FiPhone, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import "../../styles/AuthPage/AuthPage.scss";
import { Spinner } from "../../pages/imports";
import { useState } from "react";
import { Link } from "react-router-dom";
import {axiosInstance} from "../../api/axiosConfig";

const SignUp = () => {
	const [isLoading, setIsLogin] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
	});

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setIsLogin(true);
		try {
			const response = await axiosInstance.post("/auth/signup", formData);


			if (response.status === 400) {
			alert("User already exists")
			throw new Error("User already exists")
			}

			alert("Sign up successful") 


		} catch (error) {
			console.log("Sign Up error: ", error.message);
		} finally {
			setIsLogin(false);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-card">
				<div className="auth-card__header">
					<h1 className="auth-card__title">Create Account</h1>
					<p className="auth-card__subtitle">
						Fill in your details to get started
					</p>
				</div>

				<form
					className="auth-form auth-card__content"
					onSubmit={handleFormSubmit}>
					<div className="auth-form__group">
						<FiUser className="auth-form__icon" />
						<input
							type="text"
							className="auth-form__input"
							placeholder="Full name"
							name="name"
							onChange={handleInputChange}
						/>
					</div>

					<div className="auth-form__group">
						<FiMail className="auth-form__icon" />
						<input
							type="email"
							className="auth-form__input"
							placeholder="Email address"
							name="email"
							onChange={handleInputChange}
						/>
					</div>

					<div className="auth-form__group">
						<FiPhone className="auth-form__icon" />
						<input
							type="text"
							className="auth-form__input"
							placeholder="Phone number"
							name="phone"
							onChange={handleInputChange}
						/>
					</div>

					<div className="auth-form__group">
						<FiLock className="auth-form__icon" />
						<input
							type="password"
							className="auth-form__input"
							placeholder="Password"
							name="password"
							onChange={handleInputChange}
						/>
					</div>



					<button
						type="submit"
						className="auth-form__submit"
						disabled={isLoading}>
						{isLoading ? (
							<Spinner size="small" />
						) : (
							<>
								Create Account
								<FiArrowRight className="auth-form__submit-icon" />
							</>
						)}
					</button>
				</form>

				<div className="auth-card__footer">
					Already have an account?{" "}
						<Link to="/signin" className="auth-card__link">Sign In</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
