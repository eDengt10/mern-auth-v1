import express from "express";
import upload from "../config/multerConfig.js";
import { updateUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.put(`/user/update/:id`, upload.single('avatar'), updateUser)



export default userRouter;
