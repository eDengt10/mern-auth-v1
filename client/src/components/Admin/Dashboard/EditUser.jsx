import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../styles/Admin/Dashboard/Add_User.scss";
import { axiosInstance } from "../../../api/axiosConfig";

const EditUser = () => {
	const BASE_URL = "http://localhost:3001";

	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		newPassword: "",
	});
	const [errors, setErrors] = useState({
		name: "",
		email: "",
		phone: "",
		newPassword: "",
		message: ""
	});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/admin/get-user/${id}`
				);
				setFormData(response.data.userData);
			} catch (error) {
				console.log("Get user Error:", error.message);
			}
		};
		fetchUser();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});

		let error = "";
		if (name === "email") {
			if (
				!value.includes("@") ||
				!value.includes(".") ||
				/[^a-zA-Z0-9@.]/.test(value)
			) {
				error = "Invalid email address";
			}
		} else if (name === "password") {
			if (value.length < 4) {
				error = "Password must be at least 4 characters long";
			}
		}
		setErrors({ ...errors, [name]: error });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.put(
				`/admin/update-user/${id}`,
				formData
			);
			if (response.status === 200) navigate("/admin/dashboard");
		} catch (error) {
			console.log("Update user Error:", error.message);
		}
	};

	return (
		<div className="dashboard-container">
			<div className="dashboard-card">
				<div className="dashboard-card__header">
					<h1 className="dashboard-card__title">Edit User</h1>
				</div>

				<div className="dashboard-card__content">
					<form onSubmit={handleSubmit} className="edit-user-form">
						<div className="form-group">
							<label>Name</label>
							<input
								type="text"
								name="name"
								value={formData?.name || ""}
								onChange={handleChange}
								className="dashboard-card__search-input"
								required
								placeholder="Enter name"
							/>
						</div>

						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								name="email"
								value={formData?.email || ""}
								onChange={handleChange}
								className="dashboard-card__search-input"
								required
								placeholder="Enter email"
							/>
						</div>

						<div className="form-group">
							<label>Phone Number</label>
							<input
								type="tel"
								name="phone"
								value={formData?.phone || ""}
								onChange={handleChange}
								className="dashboard-card__search-input"
								required
								placeholder="Enter number"
							/>
						</div>

						<div className="form-group">
							<label>Password</label>
							<input
								type="text"
								name="newPassword"
								value={formData?.newPassword || ""}
								onChange={handleChange}
								className="dashboard-card__search-input"
								placeholder="Leave blank to keep current password"
							/>
						</div>

						<div className="form-actions">
							<button
								type="button"
								className="dashboard-card__nav-button"
								onClick={() => navigate("/admin/dashboard")}>
								Cancel
							</button>
							<button
								type="submit"
								className="dashboard-card__add-button">
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditUser;
