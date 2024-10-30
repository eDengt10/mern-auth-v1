import { Link } from "react-router-dom";
import { User } from "lucide-react";
import "../../../styles/Admin/Home/AdminHome.scss";
import { useSelector } from 'react-redux';

const AdminHome = () => {
  const admin = useSelector(state=> state.admin.adminUser)

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-card__header">
          <div className="admin-card__avatar">
            {admin.avatar ? <img className="admin-card__avatar-icon" src={`http://localhost:3001${admin.avatar}`} /> : 
            <User className="admin-card__avatar-icon" />
            }
          </div>
          <h1 className="admin-card__title">{admin.name}</h1>
          <p className="admin-card__subtitle">Email: {admin.email}</p>
          <p className="admin-card__subtitle">Phone: {admin.phone}</p>
        </div>

        <div className="admin-card__content">
          <Link to="/admin/edit-admin" className="admin-card__button">
            Edit Admin Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;