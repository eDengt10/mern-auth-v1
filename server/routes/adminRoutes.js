import express from "express";
import upload from "../config/multerConfig.js";

import { updateAdmin } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.put('/profile/update/:id', upload.single('avatar'), updateAdmin)


export default adminRouter;