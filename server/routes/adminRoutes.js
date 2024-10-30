import express from "express";
import upload from "../config/multerConfig.js";

import { updateAdmin, getUsers, deleteUser,editUserGet } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/get-users", getUsers);
adminRouter.get("/get-user/:id", editUserGet)
adminRouter.put("/profile/update/:id", upload.single("avatar"), updateAdmin);
adminRouter.delete("/delete-user/:id", deleteUser);

export default adminRouter;
