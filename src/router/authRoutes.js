import { Router } from "express";
import { createUser } from "../controller/authController.js";

const router = Router()

router.post("/user", createUser)

export default router