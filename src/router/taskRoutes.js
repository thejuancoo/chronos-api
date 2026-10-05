import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { 
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controller/taskController.js";

const router = Router()

router.post("/", checkAuth, createTask)
router.get("/", checkAuth, getAllTasks)
router.get("/:task_id", checkAuth, getTaskById)
router.put("/:task_id", checkAuth, updateTask)
router.delete("/:task_id", checkAuth, deleteTask)


export default router