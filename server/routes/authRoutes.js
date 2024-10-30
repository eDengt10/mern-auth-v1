import express from "express";
import {
	userSignIn,
	userSignUp,
	adminSignIn,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", userSignIn);
router.post("/signup", userSignUp);
router.post("/admin/signin", adminSignIn);

export default router;
