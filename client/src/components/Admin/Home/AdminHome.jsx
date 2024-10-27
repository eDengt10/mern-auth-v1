import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

import "../../../styles/Admin/Home/AdminHome.scss";

const AdminHome = () => {
	const admin = {
		name: "Admin Name",
		email: "admin@example.com",
		avatar: "https://via.placeholder.com/100",f
	};

	return (
		<div className="admin-home-container">
			<div className="admin-home-card">
				<img src={<User />} alt="Admin Avatar" className="admin-home-card__avatar" />
				<h1 className="admin-home-card__name">{admin.name}</h1>
				<p className="admin-home-card__email">{admin.email}</p>
				<Link to="/admin/dashboard" className="admin-home-card__button">
					Go to Dashboard
				</Link>
			</div>
		</div>
	);
};

export default AdminHome;
