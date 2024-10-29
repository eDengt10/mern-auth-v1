import express from "express";
import upload from "../config/multerConfig.js";
import { updateUser } from "../controllers/userController.js";

const userRouter = express.Router();

const debug = (req, res, next) => {
	console.log("Request Body: ", req.body);
	console.log("Request File: ", req.file);
   next()
};

userRouter.put(`/update/:id`, upload.single("avatar"), debug, updateUser);

export default userRouter;
