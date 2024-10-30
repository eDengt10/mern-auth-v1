import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const updateAdmin = async (req, res) => {
	try {
		const adminId = req.params.id;
		const { name, email, phone, currentPassword, newPassword } = req.body;

		if (newPassword && !currentPassword) {
			return res.status(400).json({ message: "Current password required" });
		}
		const avatar = req.file? `/uploads/user-avatars/${req.file.filename}`: null;

		const admin = await User.findById(adminId);

		if (!admin) {
			return res.status(404).json({ message: "Account not found" });
		}

		let updatedData = {};

		if (name) updatedData.name = name;
		if (email) updatedData.email = email;
		if (phone) updatedData.phone = phone;
		if (avatar) updatedData.avatar = avatar;

		if (newPassword) {
			const validPassword = await bcrypt.compare(
				currentPassword,
				admin.password
			);
			if (!validPassword) {
				return res.status(401).json({ message: "Invalid current password" });
			}
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			updatedData.password = hashedPassword;
		}

		const updatedAdmin = await User.findByIdAndUpdate(
			adminId,
			updatedData,
			{ new: true }
		);
		if (updatedAdmin) {
         return res.status(200).json({ message: "Admin updated successfully", updatedAdmin });
		}

		return res.status(500).json({ message: "Failed to update user" });
	} catch (error) {
		console.log("Update Admin error: ", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

export { updateAdmin };
