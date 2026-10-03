import { Router } from "express";
import { createTask } from "../controller/taskController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = Router()

router.post("/", checkAuth, createTask)


export default router