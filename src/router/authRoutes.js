import { Router } from "express";
import { createUser, login } from "../controller/authController.js";

const router = Router()

router.post("/user", createUser)
router.post("/login", login)

export default router