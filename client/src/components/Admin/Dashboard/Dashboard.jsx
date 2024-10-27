import React, { useState } from 'react';
import '../../../styles/Admin/Dashboard/AdminDashboard.scss';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more user data as needed
  ]);

  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    console.log(`Delete user with id: ${id}`);
    // Implement delete functionality
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__title">Admin Dashboard</h1>
        <button className="btn btn--primary" onClick={() => window.location.href = '/home'}>
          Back to Home
        </button>
      </div>

      <div className="dashboard__actions">
        <input type="text" className="search" placeholder="Search users..." />
        <button className="btn btn--primary">Add New User</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="actions">
                <button className="btn btn--edit" onClick={() => handleEdit(user.id)}>Edit</button>
                <button className="btn btn--delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
