import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { 
    createUser,
    login,
    profile,
    updateProfile,
    recoveryPassword
} from "../controller/authController.js";
import { limiter } from "../config/limiter.js";

const router = Router()

router.use(limiter)

router.post("/user", createUser)
router.post("/login", login)
router.post("/recovery-password", recoveryPassword)

//Area privadas
router.get("/profile", checkAuth, profile)
router.post("/profile", checkAuth, updateProfile)

export default router