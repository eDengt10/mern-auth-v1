import React, { useState } from 'react';
import '../../../styles/Admin/Dashboard/Add_User.scss';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  const handleBack = () => {
    navigate('/admin/dashboard')
    };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-cardheader">
          <button className="dashboard-cardnav-button" onClick={handleBack}>
            <span>←</span>
            Back to Dashboard
          </button>
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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