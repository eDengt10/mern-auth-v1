import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Upload, X } from 'lucide-react';
import { axiosInstance } from '../../../api/axiosConfig';
import '../../../styles/Admin/Home/EditAdmin.scss';

const EditAdmin = () => {
  const admin = useSelector(state => state.admin.adminUser);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: admin.name || '',
    email: admin.email || '',
    phone: admin.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    admin.avatar ? `http://localhost:3001${admin.avatar}` : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      
      // Append password fields only if current password is provided
      if (formData.currentPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }
        formDataToSend.append('currentPassword', formData.currentPassword);
        formDataToSend.append('newPassword', formData.newPassword);
      }

      // Append avatar if changed
      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }

      const response = await axiosInstance.put(
        '/admin/profile/update',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Update redux store with new admin data
      dispatch({
        type: 'UPDATE_ADMIN',
        payload: response.data.admin
      });

      setSuccess('Profile updated successfully!');
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
      }));

    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edit-admin-container">
      <div className="edit-admin-card">
        <div className="edit-admin-card__header">
          <h1 className="edit-admin-card__title">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="edit-admin-form">
          <div className="edit-admin-form__avatar-section">
            <div className="edit-admin-form__avatar">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
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
                className="edit-admin-form__avatar-input"
                id="avatar-upload"
              />
              <label 
                htmlFor="avatar-upload" 
                className="edit-admin-form__avatar-label"
              >
                <Upload size={20} />
                Upload Photo
              </label>
            </div>
          </div>

          <div className="edit-admin-form__group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="edit-admin-form__group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="edit-admin-form__group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="edit-admin-form__password-section">
            <div className="edit-admin-form__group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
              />
            </div>

            <div className="edit-admin-form__group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
            </div>
          </div>

          {/* {error && (
            <div className="edit-admin-form__error">
              {error}
            </div>
          )}

          {success && (
            <div className="edit-admin-form__success">
              {success}
            </div>
          )} */}

          <button 
            type="submit" 
            className="edit-admin-form__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdmin;