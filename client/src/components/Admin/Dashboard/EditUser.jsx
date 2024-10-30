import { useState, useEffect } from "react";
import "../../../styles/Admin/Dashboard/Add_User.scss";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
	});

	useEffect(() => {
		const userData = {
			name: "John Doe",
			email: "john@example.com",
			phone: "+1234567890",
			password: "",
		};
		setFormData(userData);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form data submitted:", formData);
		// Handle form submission
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
								value={formData.name}
								onChange={handleChange}
								className="dashboard-card__search-input"
								required
							/>
						</div>

						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="dashboard-card__search-input"
								required
							/>
						</div>

						<div className="form-group">
							<label>Phone Number</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="dashboard-card__search-input"
								required
							/>
						</div>

						<div className="form-group">
							<label>Password</label>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="dashboard-card__search-input"
								placeholder="Leave blank to keep current password"
							/>
						</div>

						<div className="form-actions">
							<button
								type="button"
								className="dashboard-card__nav-button"
								onClick={()=>navigate('/admin/dashboard')}>
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
