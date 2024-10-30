import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const updateAdmin = async (req, res) => {
	try {
		const adminId = req.params.id;
		const { name, email, phone, currentPassword, newPassword } = req.body;

		if (newPassword && !currentPassword) {
			return res
				.status(400)
				.json({ message: "Current password required" });
		}
		const avatar = req.file
			? `/uploads/user-avatars/${req.file.filename}`
			: null;

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
				return res
					.status(401)
					.json({ message: "Invalid current password" });
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
			return res
				.status(200)
				.json({ message: "Admin updated successfully", updatedAdmin });
		}

		return res.status(500).json({ message: "Failed to update user" });
	} catch (error) {
		console.log("Update Admin error: ", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await User.find({ is_admin: false });
		res.status(200).json({
			usersData: users,
			message: "UsersData Fetched successfully",
		});
	} catch (error) {
		console.log("Get users error: ", error.message);
	}
};

const deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;
		const userDeleted = await User.findByIdAndDelete(userId);
		if (!userDeleted) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.log("Delete user Error(backend) : ", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

const editUserGet = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const { password, ...otherDetails } = user._doc;
		res.status(200).json({
			userData: otherDetails,
			message: "User data fetched successfully",
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

const updateUser = async (req, res) => {
	try {
      console.log(req.body);
      
		const userId = req.params.id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const { name, email, phone, newPassword } = req.body;
		const updatedData = {};
		if (name) updatedData.name = name;
		if (email) updatedData.email = email;
		if (phone) updatedData.phone = phone;
		if (newPassword)
			updatedData.password = await bcrypt.hash(newPassword, 10);
		if (updatedData) {
			const userUpdated = await User.findByIdAndUpdate(userId, updatedData, { new: true });
         if(userUpdated) res.status(200).json({ message: "User updated successfully" });
		}
	} catch (error) {
		console.log("Update user Error(backend) : ", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

const addUser = async(req, res) => {
   try {
      const {name, email, phone, password } = req.body;
      const existingUser = await User.findOne({email, phone})
      if(existingUser) return res.status(400).json({message: "User already exists"})
         const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({name, email, phone, password: hashedPassword})
      await user.save()
      res.status(200).json({message:"User added successfully"})
   } catch (error) {
      console.log("Add user error(BACKEND) :",error);
      
   }
}

export { updateAdmin, getUsers, deleteUser, editUserGet, updateUser, addUser };
