import React, { useState, useRef } from "react";
import { Camera, User, Save, X } from "lucide-react";
import "../../styles/Profile/EditProfile.scss";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
    const fileInputRef = useRef()
	const [avatarPreview, setAvatarPreview] = useState(null);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "Sarah Anderson",
		email: "sarah.anderson@example.com",
		phone: "+1 (555) 123-4567",
		currentPassword: "",
		newPassword: "",
	});

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

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
						{avatarPreview ? (
							<img src={avatarPreview} alt="Profile preview" />
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
					/>
					<button
						onClick={handleAvatarClick}
						type="button"
						className="edit-profile__avatar-edit"
						aria-label="Change profile picture">
						<Camera />
					</button>
				</div>

				<form className="edit-profile__form">
					<div className="edit-profile__form-group">
						<label className="edit-profile__form-label">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							className="edit-profile__form-input"
							placeholder="Enter your name"
						/>
						{/* {errors.name && <div className="edit-profile__form-error">{errors.name}</div>} */}
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
						/>
						{/* {errors.email && <div className="edit-profile__form-error">{errors.email}</div>} */}
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
						/>
						{/* {errors.phone && <div className="edit-profile__form-error">{errors.phone}</div>} */}
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
						/>
						{/* {errors.currentPassword && <div className="edit-profile__form-error">{errors.currentPassword}</div>} */}
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
						/>
						{/* {errors.newPassword && <div className="edit-profile__form-error">{errors.newPassword}</div>} */}
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
