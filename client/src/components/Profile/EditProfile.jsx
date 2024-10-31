import { useState, useRef, useEffect } from "react";
import { Camera, User, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { axiosMultipartInstance } from "../../api/axiosConfig";
import "../../styles/Profile/EditProfile.scss";

const EditProfilePage = () => {
	const fileInputRef = useRef();
	const [avatar, setAvatar] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
		phone: user?.phone || "",
		currentPassword: "",
		newPassword: "",
	});

	useEffect(() => {
		if (user) {
			setAvatar(user.avatar);
			setFormData({
				name: user.name || "",
				email: user.email || "",
				phone: user.phone || "",
				currentPassword: "",
				newPassword: "",
			});
		}
	}, [user]);

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		phone: "",
		currentPassword: "",
		newPassword: "",
		message: "",
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
		} else if (name === "name") {
			if (value.length < 3) {
				error = "Name must be at least 3 characters long";
			}
		} else if (name === "phone") {
			if (!/^\d+$/.test(value) || value.length !== 10) {
				error = "Invalid phone number";
			}
		} else if (name === "currentPassword") {
			if (value.length < 6 && value.length !== 0 ) {
				error = "Current password must be at least 6 characters long";
			}
		} else if (name === "newPassword") {
			if (value.length < 6 && value.length !== 0 ) {
				error = "New password must be at least 6 characters long";
			}
		}
		setErrors({ ...errors, [name]: error });
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setAvatar(file);
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const formDataToSend = new FormData();

			if (formData.name !== user.name)
				formDataToSend.append("name", formData.name);
			if (formData.email !== user.email)
				formDataToSend.append("email", formData.email);
			if (formData.phone !== user.phone)
				formDataToSend.append("phone", formData.phone);
			if (formData.currentPassword)
				formDataToSend.append(
					"currentPassword",
					formData.currentPassword
				);
			if (formData.newPassword)
				formDataToSend.append("newPassword", formData.newPassword);

			if (avatar && avatar !== user.avatar) {
				formDataToSend.append("avatar", avatar);
			}

			const response = await axiosMultipartInstance.put(
				`/user/update/${user._id}`,
				formDataToSend
			);

			if (response.status === 200) {
				dispatch(updateUser({ user: response.data.updatedUser }));
				navigate("/profile");
			}
		} catch (error) {
			console.error(
				"Error in profile updation:",
				error.response?.data || error.message
			);
			setErrors({
				form:
					error.response?.data?.message || "Failed to update profile",
			});
		}
	};

	const handleCancel = () => {
		navigate("/profile");
	};

	return (
		<div className="edit-profile">
			<div className="edit-profile__card">
				<div className="edit-profile__header">
					<h1 className="edit-profile__header-title">Edit Profile</h1>
				</div>

				<form
					className="edit-profile__form"
					onSubmit={handleFormSubmit}
					encType="multipart/form-data">
					<div className="edit-profile__avatar">
						<div className="edit-profile__avatar-image">
							{avatar ? (
								<img
									src={
										typeof avatar === "string"
											? `http://localhost:3001${avatar}`
											: URL.createObjectURL(avatar)
									}
									alt="Profile preview"
								/>
							) : (
								<User />
							)}
						</div>

						<input
							type="file"
							accept="image/*"
							name="avatar"
							ref={fileInputRef}
							className="edit-profile__avatar-input"
							aria-label="Upload profile picture"
							onChange={handleAvatarChange}
						/>
						<button
							type="button"
							className="edit-profile__avatar-edit"
							onClick={() => fileInputRef.current?.click()}
							aria-label="Change profile picture">
							<Camera />
						</button>
					</div>

					<div className="edit-profile__form-group">
						<label className="edit-profile__form-label">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							className="edit-profile__form-input"
							placeholder="Enter your name"
							onChange={handleInputChange}
						/>
						{errors.name && (
							<div className="edit-profile__form-error">
								{errors.name}
							</div>
						)}
					</div>

					<div className="edit-profile__form-group">
						<label className="edit-profile__form-label">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							className="edit-profile__form-input"
							placeholder="Enter your email"
							onChange={handleInputChange}
						/>
						{errors.email && (
							<div className="edit-profile__form-error">
								{errors.email}
							</div>
						)}
					</div>

					<div className="edit-profile__form-group">
						<label className="edit-profile__form-label">
							Phone Number
						</label>
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							className="edit-profile__form-input"
							placeholder="Enter your phone number"
							onChange={handleInputChange}
						/>
						{errors.phone && (
							<div className="edit-profile__form-error">
								{errors.phone}
							</div>
						)}
					</div>

					<div className="edit-profile__form-group">
						<label className="edit-profile__form-label">
							Current Password
						</label>
						<input
							type="password"
							name="currentPassword"
							value={formData.currentPassword}
							className="edit-profile__form-input"
							placeholder="Enter current password"
							onChange={handleInputChange}
						/>
						{errors.currentPassword && (
							<div className="edit-profile__form-error">
								{errors.currentPassword}
							</div>
						)}
					</div>

					<div className="edit-profile__form-group">
						<label className="edit-profile__form-label">
							New Password
						</label>
						<input
							type="password"
							name="newPassword"
							value={formData.newPassword}
							className="edit-profile__form-input"
							placeholder="Enter new password"
							onChange={handleInputChange}
              
						/>
						{errors.newPassword && (
							<div className="edit-profile__form-error">
								{errors.newPassword}
							</div>
						)}
					</div>

					<div className="edit-profile__buttons">
						<button
							type="submit"
							className="edit-profile__button edit-profile__button--primary"
              disabled={
								errors.email ||
								errors.password ||
								errors.currentPassword ||
								errors.name ||
								errors.phone ||
								errors.newPassword
							}>
							<Save />
							<span>Save Changes</span>
						</button>
						<button
							type="button"
							className="edit-profile__button edit-profile__button--secondary"
							onClick={handleCancel}>

							<X />
							<span>Cancel</span>
						</button>
					</div>
				</form>

				{errors.message && (
					<div className="edit-profile__form-error">
						{errors.message}
					</div>
				)}
			</div>
		</div>
	);
};

export default EditProfilePage;
