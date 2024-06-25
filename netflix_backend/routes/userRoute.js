import express from "express";
import { Logout, Register, login } from "../controllers/user.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(login); 
router.route("/logout").get(Logout);

export default router;
