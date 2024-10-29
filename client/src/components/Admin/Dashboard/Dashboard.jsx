import React, { useState } from 'react';
import { Search, Edit2, Trash2, Home } from 'lucide-react';
import '../../../styles/Admin/Dashboard/AdminDashboard.scss';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com' },
  ]);

  const navigate = useNavigate()

  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
    navigate(`/admin/edit-user`)
  };

  const handleSearch = (e) => {
  }

  const handleDelete = (id) => {
    console.log(`Delete user with id: ${id}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <h1 className="dashboard-card__title">Admin Dashboard</h1>
          <button 
            className="dashboard-card__nav-button"
            onClick={() => navigate('/admin/home')}
          >
            <Home className="dashboard-card__nav-icon" />
            Back to Home
          </button>
        </div>

        <div className="dashboard-card__actions">
          <div className="dashboard-card__search">
            <Search className="dashboard-card__search-icon" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="dashboard-card__search-input"
              onChange={handleSearch}
            />
          </div>
          <button onClick={()=>navigate('/admin/add-user')} className="dashboard-card__add-button">
            Add New User
          </button>
        </div>

        <div className="dashboard-card__content">
          <table className="dashboard-table">
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
                  <td className="dashboard-table__actions">
                    <button 
                      className="dashboard-table__action-btn dashboard-table__action-btn--edit"
                      onClick={() => handleEdit(user.id)}
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button 
                      className="dashboard-table__action-btn dashboard-table__action-btn--delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;