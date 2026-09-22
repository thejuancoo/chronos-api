import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { 
    createUser,
    login,
    profile,
    updateProfile
} from "../controller/authController.js";

const router = Router()

router.post("/user", createUser)
router.post("/login", login)

//Area privadas
router.get("/profile", checkAuth, profile)
router.post("/profile", checkAuth, updateProfile)

export default router