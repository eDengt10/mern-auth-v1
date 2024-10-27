import React, { useState, useEffect } from 'react';
import '../../../styles/Admin/Dashboard/Add_Edit_User.scss';

const EditUser = () => {
//   const userId = match.params.id; // Assume you're using React Router for route parameters
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    // Fetch user data based on userId and populate the form
    // For demonstration, we'll use static data
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
    };
    setFormData(userData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Implement the edit user functionality here
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Edit User</h1>
        <button className="btn btn--primary" onClick={() => window.location.href = '/admin'}>
          Back to Dashboard
        </button>
      </div>

      <div className="form-container">
        <h2 className="form-header">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
              required
            />
          </div>
                    <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn--primary">Save Changes</button>
            <button type="button" className="btn btn--secondary" onClick={() => window.location.href = '/admin'}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
