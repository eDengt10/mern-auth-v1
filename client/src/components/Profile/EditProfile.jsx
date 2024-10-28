import React, { useState, useRef, useEffect } from "react";
import { Camera, User, Save, X } from "lucide-react";
import "../../styles/Profile/EditProfile.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosConfig";

const EditProfilePage = () => {
	const fileInputRef = useRef();
	const [errors, setError] = useState({});

	const [avatar, setAvatar] = useState(null);
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);

	useEffect(() => {
		if (user.avatar) {
			setAvatar(user.avatar);
		}
	}, [user.avatar]);

	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		phone: user.phone,
		currentPassword: "",
		newPassword: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		console.log(formData);
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		setAvatar(URL.createObjectURL(file));
		setFormData({ ...formData, avatar: file });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();

		for (const key in formData) {
			data.append(key, formData[key]);
		}

		try {
			const response = await axiosInstance.put(`/user/update/${user.id}`,data);
			console.log(response.data);
			if(response.status === 200) {
				console.log("Profile Updated");
				navigate('/profile')
			} 
		} catch (error) {
			console.log("Error in profile updation", error);
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

				<div className="edit-profile__avatar">
					<div className="edit-profile__avatar-image">
						{avatar ? (
							<img src={avatar} alt="Profile preview" />
						) : (
							<User />
						)}
					</div>
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						className="edit-profile__avatar-input"
						aria-label="Upload profile picture"
						onChange={handleAvatarChange}
					/>
					<button
						onClick={() => fileInputRef.current?.click()}
						type="button"
						className="edit-profile__avatar-edit"
						aria-label="Change profile picture">
						<Camera />
					</button>
				</div>

				<form
					className="edit-profile__form"
					onSubmit={handleFormSubmit}>
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
							className="edit-profile__button edit-profile__button--primary">
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
			</div>
		</div>
	);
};

export default EditProfilePage;
