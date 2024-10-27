import React from 'react';
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import "../../../styles/Admin/Home/AdminHome.scss";

const AdminHome = () => {
  const admin = {
    name: "Admin Name",
    email: "admin@example.com",
	phone: "1234567890"
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-card__header">
          <div className="admin-card__avatar">
            <User className="admin-card__avatar-icon" />
          </div>
          <h1 className="admin-card__title">{admin.name}</h1>
          <p className="admin-card__subtitle">Email: {admin.email}</p>
          <p className="admin-card__subtitle">Phone: {admin.phone}</p>
        </div>

        <div className="admin-card__content">
          <Link to="/admin/dashboard" className="admin-card__button">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;