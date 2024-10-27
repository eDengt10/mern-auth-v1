import express from "express";
import { userSignIn, userSignUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", userSignIn);
router.post("/signup", userSignUp);

export default router;
