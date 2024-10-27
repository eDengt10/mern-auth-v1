import express from "express";

import { test } from "../controllers/userController.js";

const userRouter = express.Router();



userRouter.post("/signup", test);




export default userRouter;
