import { useEffect, useState } from "react";
import { Search, Edit2, Trash2, Home, User, UserCog2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Admin/Dashboard/AdminDashboard.scss";
import axios from "axios";

const Dashboard = () => {
	const [users, setUsers] = useState([]);

	const BASE_URL = "http://localhost:3001";

	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/admin/get-users`);
				const data = response.data.usersData

				setUsers(data);
			} catch (error) {
				console.log("Dashboard user fetching failed:", error.message);
			}
		};
		fetchUsers();
	}, []);

	const handleEdit = (id) => {
		console.log(`Edit user with id: ${id}`);
		navigate(`/admin/edit-user/${id}`);
	};

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleDelete = async (userId) => {
		try {
			await axios.delete(`${BASE_URL}/admin/delete-user/${userId}`);
			setUsers(users.filter((user) => user._id !== userId));
		} catch (error) {
			console.log("User deleting failed:", error.message);
		}
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
								<th>Avatar</th>
								<th>Username</th>
								<th>Email</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							
							{filteredUsers.length > 0 && filteredUsers.map((user, index) => (
								<tr key={user._id}>
									<td>{index + 1}</td>
									<td>
										<div className="dashboard-table__user">
											{user.avatar ? (
												<img
													src={BASE_URL + user.avatar}
													alt={`${user.name}'s avatar`}
													className="dashboard-table__avatar"
												/>
											) : (
												<User />
											)}
										</div>
									</td>
									<td>
										<div className="dashboard-table__user-name">
											<span>{user.name}</span>
										</div>
									</td>
									<td>{user.email}</td>
									<td className="dashboard-table__actions">
										<button
											className="dashboard-table__action-btn dashboard-table__action-btn--edit"
											onClick={() =>
												handleEdit(user._id)
											}>
											<Edit2 size={16} />
											Edit
										</button>
										<button
											className="dashboard-table__action-btn dashboard-table__action-btn--delete"
											onClick={() =>
												handleDelete(user._id)
											}>
											<Trash2 size={16} />
											Delete
										</button>
									</td>
									{/* <td className="dashboard-table__isadmin">

                    {user.is_admin ? <UserCog2Icon size={20}/> : ""}
                  </td> */}
								</tr>
							))}
							{filteredUsers.length === 0 &&  <tr><td style={ {fontWeight: 700, fontSize: "18px"} }  colSpan="5">User Not Found</td></tr>}

						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
