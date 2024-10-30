import { useEffect, useState } from "react";
import { Search, Edit2, Trash2, Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/Dashboard/AdminDashboard.scss";
import axios from "axios";
import { axiosGet } from "../../../api/axiosConfig";

const Dashboard = () => {
	const [users, setUsers] = useState([]);

	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=> {
    const  fetchUsers = async () => {
      try {
        const response = await axiosGet('/admin/manage-users')
        setUsers(response.data)
      } catch (error) {
        console.log("Dashboard user fetching failed:", error.message);
        
      }
      fetchUsers();
    }

  },[])

	const handleEdit = (id) => {
		console.log(`Edit user with id: ${id}`);
		navigate(`/admin/edit-user`);
	};

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleDelete = (id) => {
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
	};

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="dashboard-container">
			<div className="dashboard-card">
				<div className="dashboard-card__header">
					<h1 className="dashboard-card__title">Admin Dashboard</h1>
					<button
						className="dashboard-card__nav-button"
						onClick={() => navigate("/admin/home")}>
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
					<button
						onClick={() => navigate("/admin/add-user")}
						className="dashboard-card__add-button">
						Add New User
					</button>
				</div>

				<div className="dashboard-card__content">
					<table className="dashboard-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>User</th>
								<th>Email</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredUsers.map((user, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>
										<div className="dashboard-table__user">
											{filteredUsers.avatar ? (
												<img
													src={user.avatar}
													alt={`${user.name}'s avatar`}
													className="dashboard-table__avatar"
												/>
											) : (
												<User />
											)}
											<span>{user.name}</span>
										</div>
									</td>
									<td>{user.email}</td>
									<td className="dashboard-table__actions">
										<button
											className="dashboard-table__action-btn dashboard-table__action-btn--edit"
											onClick={() => handleEdit(user.id)}>
											<Edit2 size={16} />
											Edit
										</button>
										<button
											className="dashboard-table__action-btn dashboard-table__action-btn--delete"
											onClick={() =>
												handleDelete(user.id)
											}>
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
