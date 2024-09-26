import express from "express"
import userController from "../controller/user.controller.js"
import { auth } from "../middlewares/userAuth.js";
const router=express.Router();

router.post("/register",userController.createUser);
router.post("/login",userController.loginUser);
router.get("/profile",auth,userController.getUserProfile);
router.patch("/profile",auth,userController.updateUserProfile);

export default router;