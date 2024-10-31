import { useState } from 'react';
import '../../../styles/Admin/Dashboard/Add_User.scss';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../api/axiosConfig';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/admin/add-user', formData);
      if(response.status === 200 ) {
        navigate('/admin/dashboard')
      }
    } catch (error) {
      console.log("Add user error(Frontend):", error);
      
    }
  };

  const handleBack = () => {
    navigate('/admin/dashboard')
    };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-cardheader">
          <h1 className="dashboard-cardtitle">Add New User</h1>
        </div>
        <div className="dashboard-cardcontent">
          <form onSubmit={handleSubmit} className="edit-user-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="dashboard-cardsearch-input"
                placeholder='Enter name'
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="dashboard-cardsearch-input"
                placeholder='Enter email'

                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="dashboard-cardsearch-input"
                placeholder='Enter phone number'
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter password'
                className="dashboard-cardsearch-input"
                required
              />
            </div>
            <div className="form-actions">
              <button 
                type="button" 
                className="dashboard-cardnav-button"
                onClick={handleBack}
              >
                Cancel
              </button>
              <button type="submit" className="dashboard-cardadd-button">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;