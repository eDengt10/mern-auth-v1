import User from "../models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSignIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials." });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Password is incorrect." });
		}
		const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
			expiresIn: "1d",
		});
		const { hashedPassword, ...otherDetails } = user;
		res.status(200).json({
			token,
			user: otherDetails,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Server Error" });
	}
};

const userSignUp = async (req, res) => {
	const { name, email, phone, password } = req.body;
	try {
		const existingUser = await User.findOne({ email, name });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			name,
			email,
            phone,
			password: hashedPassword,
		});        

		await newUser.save();

		res.status(200).json({ message: "User created successfully" });
	} catch (error) {
		console.log("SignUp error: ", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

export { userSignIn, userSignUp };
