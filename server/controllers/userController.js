import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const updateUser = async (req, res) => {
	try {
				
		const userId = req.params.id;
		const { name, email, phone, currentPassword, newPassword } = req.body;

		if(newPassword && !currentPassword ) {
			return res.status(400).json({message:"Current password required"})
		}

		const avatar = req.file ? `/uploads/user-avatars/${req.file.filename}` : null;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		let updatedData = {};

		if (name) updatedData.name = name;
		if (email) updatedData.email = email;
		if (phone) updatedData.phone = phone;
		if (avatar) updatedData.avatar = avatar;

		if (newPassword) {
				const validPassword = await bcrypt.compare(
					currentPassword,
					user.password
				);
				if (!validPassword) {
					return res.status(401).json({ message: "Invalid current password" });
				}
				const hashedPassword = await bcrypt.hash(newPassword, 10);
				updatedData.password = hashedPassword;
			}

			const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new:true });
			if(updatedUser) {
				return res.status(200).json({message:"User updated successfully", updatedUser})
			}

			return res.status(500).json({message: "Failed to update user"})

	} catch (error) {		
		console.log("Update User Error: ", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

export { updateUser };