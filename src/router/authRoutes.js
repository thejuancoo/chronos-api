import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { createUser, login, profile} from "../controller/authController.js";

const router = Router()

router.post("/user", createUser)
router.post("/login", login)

//Area privadas
router.post("/profile", checkAuth, profile)

export default router