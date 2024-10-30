import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Upload } from "lucide-react";
import {
  axiosMultipartInstance,
} from "../../../api/axiosConfig";
import "../../../styles/Admin/Home/EditAdmin.scss";
import { useNavigate } from "react-router-dom";
import { updateAdmin } from "../../../redux/slices/adminSlice";
import { Spinner } from "../../../pages/imports";

const EditAdmin = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.adminUser);
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(admin?.avatar || null);

  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    phone: admin?.phone || "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (admin) {
      setAvatar(admin.avatar);
      setFormData({
        name: admin.name || "",
        email: admin.email || "",
        phone: admin.phone || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      }
    }

  const handleCancel = () => {
    navigate("/admin/home");
  };

  const handleSubmit = async (e) => {    
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      if (formData.name !== admin.name)
        formDataToSend.append("name", formData.name);
      if (formData.email !== admin.email)
        formDataToSend.append("email", formData.email);
      if (formData.phone !== admin.phone)
        formDataToSend.append("phone", formData.phone);
      if (formData.currentPassword)
        formDataToSend.append("currentPassword", formData.currentPassword);
      if (formData.newPassword)
        formDataToSend.append("newPassword", formData.newPassword);

      if (avatar && avatar !== admin.avatar) {
        formDataToSend.append("avatar", avatar);
      }

      const response = await axiosMultipartInstance.put(
        `/admin/profile/update/${admin._id}`,
        formDataToSend
      );

      if (response.status === 200) {
        dispatch(updateAdmin({ adminUser: response.data.updatedAdmin }));

        navigate("/admin/home");
      }
    } catch (error) {
      console.log("Error in profile update:", error);
      setErrors({
        form: error.response?.data?.message || "Failed to update profile"
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="edit-admin-container">
      <div className="edit-admin-card">
        <div className="edit-admin-card__header">
          <h1 className="edit-admin-card__title">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="edit-admin-form">
          {errors.form && (
            <div className="edit-admin-form__error edit-admin-form__error--form">
              {errors.form}
            </div>
          )}

          <div className="edit-admin-form__avatar-section">
            <div className="edit-admin-form__avatar">
              {avatar ? (
                <img
                  src={
                    typeof avatar === "string"
                      ? `http://localhost:3001${avatar}`
                      : URL.createObjectURL(avatar)
                  }
                  alt="Admin avatar"
                  className="edit-admin-form__avatar-preview"
                />
              ) : (
                <User className="edit-admin-form__avatar-icon" />
              )}
            </div>
            <div className="edit-admin-form__avatar-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                ref={fileInputRef}
                name="avatar"
                className="edit-admin-form__avatar-input"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="edit-admin-form__avatar-label">
                <Upload size={20} />
                Upload Photo
              </label>
            </div>
            {errors.avatar && (
              <div className="edit-admin-form__error">{errors.avatar}</div>
            )}
          </div>

          <div className="edit-admin-form__group">
            <label className="edit-admin-form__label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="edit-admin-form__input"
            />
            {errors.name && (
              <div className="edit-admin-form__error">{errors.name}</div>
            )}
          </div>

          <div className="edit-admin-form__group">
            <label className="edit-admin-form__label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="edit-admin-form__input"
            />
            {errors.email && (
              <div className="edit-admin-form__error">{errors.email}</div>
            )}
          </div>

          <div className="edit-admin-form__group">
            <label className="edit-admin-form__label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="edit-admin-form__input"
            />
            {errors.phone && (
              <div className="edit-admin-form__error">{errors.phone}</div>
            )}
          </div>

          <div className="edit-admin-form__password-section">
            <div className="edit-admin-form__group">
              <label className="edit-admin-form__label">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
                className="edit-admin-form__input"
              />
              {errors.currentPassword && (
                <div className="edit-admin-form__error">{errors.currentPassword}</div>
              )}
            </div>

            <div className="edit-admin-form__group">
              <label className="edit-admin-form__label">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="edit-admin-form__input"
              />
              {errors.newPassword && (
                <div className="edit-admin-form__error">{errors.newPassword}</div>
              )}
            </div>
          </div>

          <div className="edit-admin-form__buttons">
            <button
              type="submit"
              className="edit-admin-form__submit"
              disabled={isLoading}>
              {isLoading ? (
                <Spinner size="small" color="primary" />
              ) : (
                "Update Profile"
              )}
            </button>
            <button
              type="button"
              className="edit-admin-form__cancel"
              onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdmin;