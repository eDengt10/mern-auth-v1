import { FiMail, FiPhone, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { Spinner } from "../../pages/imports";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosConfig";
import "../../styles/AuthPage/AuthPage.scss";

const SignUp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });

		let error = "";
		if (name === "email") {
			if (
				!value.includes("@") ||
				!value.includes(".") ||
				/[^a-zA-Z0-9@.]/.test(value)
			) {
				error = "Invalid email address";
			}
		} else if (name === "password") {
			if (value.length < 6) {
				error = "Password must be at least 6 characters long";
			}
		} else if (name === "name") {
			if (value.length < 3) {
				error = "Name must be at least 3 characters long";
			}
		} else if (name === "phone") {
			if (!/^\d+$/.test(value) || value.length !== 10) {
				error = "Invalid phone number";
			}
		}
		setErrors({ ...errors, [name]: error });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axiosInstance.post("/auth/signup", formData);

			if (response.status === 400) {
				alert("User already exists");
				throw new Error("User already exists");
			}
			navigate("/signin");
		} catch (error) {
			console.log("Sign Up error: ", error);
			setErrors({ ...errors, message: error.response.data.message });
		} finally {
			setIsLoading(false);
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
						<div className="auth-form__group-input-wrapper">
							<FiUser className="auth-form__icon" />
							<input
								type="text"
								className="auth-form__input"
								placeholder="Full name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
							/>
						</div>
						{errors.name && (
							<div className="auth-form__form-error">
								{errors.name}
							</div>
						)}
					</div>

					<div className="auth-form__group">
						<div className="auth-form__group-input-wrapper">
							<FiMail className="auth-form__icon" />
							<input
								type="email"
								className="auth-form__input"
								placeholder="Email address"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						{errors.email && (
							<div className="auth-form__form-error">
								{errors.email}
							</div>
						)}
					</div>

					<div className="auth-form__group">
						<div className="auth-form__group-input-wrapper">
							<FiPhone className="auth-form__icon" />
							<input
								type="text"
								className="auth-form__input"
								placeholder="Phone number"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
							/>
						</div>
						{errors.phone && (
							<div className="auth-form__form-error">
								{errors.phone}
							</div>
						)}
					</div>

					<div className="auth-form__group">
						<div className="auth-form__group-input-wrapper">
							<FiLock className="auth-form__icon" />
							<input
								type="password"
								className="auth-form__input"
								placeholder="Password"
								name="password"
								value={formData.password}
								onChange={handleInputChange}
							/>
						</div>
						{errors.password && (
							<div className="auth-form__form-error">
								{errors.password}
							</div>
						)}
					</div>

					<button
						type="submit"
						className="auth-form__submit"
						disabled={
							isLoading ||
							errors.email ||
							errors.password ||
							errors.name ||
							errors.phone ||
							!formData.name || 
							!formData.phone || 
							!formData.password || 
							!formData.email 
						}>
						{isLoading ? (
							<Spinner size="small" />
						) : (
							<>
								Create Account
								<FiArrowRight className="auth-form__submit-icon" />
							</>
						)}
					</button>
				{errors.message && (
					<div className="auth-form__form-error">
						{errors.message}
					</div>
				)}
				</form>


				<div className="auth-card__footer">
					Already have an account?{" "}
					<Link to="/signin" className="auth-card__link">
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
