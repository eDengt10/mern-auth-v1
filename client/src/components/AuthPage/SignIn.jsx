import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "../../pages/imports";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosConfig";
import { setUser } from "../../redux/slices/userSlice";
import "../../styles/AuthPage/AuthPage.scss";

const SignIn = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({});
   const [errors, setErrors] = useState({
      email: "",
      password: "",
      message: "",
   });
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
      let error = "";
      if (name === "email") {
         if (!value.includes("@") || !value.includes(".") || /[^a-zA-Z0-9@.]/.test(value)) {
            error = "Invalid email address";
         }
      } else if (name === "password") {
         if (value.length < 6) {
            error = "Password must be at least 6 characters long";
         }
      }
      setErrors({ ...errors, [name]: error });
   };

   const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
         const response = await axiosInstance.post("/auth/signin", formData);
         if (response.data.success) {
            const data = response.data;
            dispatch(setUser({ user: data.user, token: data.token }));
            navigate("/home");
         } else {
            setErrors({
               ...errors,
               message: "Login failed. Please try again.",
            });
         }
      } catch (error) {
         console.log("Login failed:", error, error.response?.data?.message);
         setErrors({ ...errors, message: error.response?.data?.message });
      } finally {
         setIsLoading(false);
      }
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
                  <div className="auth-form__group-input-wrapper">
                     <FiMail className="auth-form__icon" />
                     <input
                        type="email"
                        name="email"
                        className="auth-form__input"
                        placeholder="Email address"
                        onChange={handleInputChange}
                     />
                  </div>
                  {errors.email && (
                     <div className="auth-form__form-error-message">{errors.email}</div>
                  )}
               </div>
               <div className="auth-form__group">
                  <div className="auth-form__group-input-wrapper">
                     <FiLock className="auth-form__icon" />
                     <input
                        type="password"
                        name="password"
                        className="auth-form__input"
                        placeholder="Password"
                        onChange={handleInputChange}
                     />
                  </div>
                  {errors.password && (
                     <div className="auth-form__form-error-message">{errors.password}</div>
                  )}
               </div>
               <button
                  type="submit"
                  className="auth-form__submit"
                  disabled={isLoading || errors.email || errors.password}>
                  {isLoading ? (
                     <Spinner size="small" color="primary" />
                  ) : (
                     <>
                        Sign In
                        <FiArrowRight className="auth-form__submit-icon" />
                     </>
                  )}
               </button>
               {errors.message && (
                  <div className="auth-form__form-error auth-form__form-error--global">
                     {errors.message}
                  </div>
               )}
            </form>
            <div className="auth-card__footer">
               Dont have an account?{" "}
               <Link to="/signup" className="auth-card__link">
                  Sign Up
               </Link>
            </div>
         </div>
      </div>
   );
};

export default SignIn;