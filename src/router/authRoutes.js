import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { 
    createUser,
    confirmAccount,
    login,
    forgotPassword,
    validateToken,
    profile,
    updateProfile,
    recoveryPassword
} from "../controller/authController.js";
import { limiter } from "../config/limiter.js";

const router = Router()

//router.use(limiter)

router.post("/user", createUser)
router.post("/confirm-account", confirmAccount)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/validate-token", validateToken)
router.post("/recovery-password/:token", recoveryPassword)

//Area privadas
router.get("/profile", checkAuth, profile)
router.post("/profile", checkAuth, updateProfile)
router.post("/updatePassword", checkAuth)

export default router