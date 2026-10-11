import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { 
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateToggleTaskDone
} from "../controller/taskController.js";

const router = Router()

router.post("/", checkAuth, createTask)
router.get("/", checkAuth, getAllTasks)
router.get("/:id_task", checkAuth, getTaskById)
router.put("/:id_task", checkAuth, updateTask)
router.delete("/:id_task", checkAuth, deleteTask)
router.patch("/:id_task", checkAuth, updateToggleTaskDone)
router.put("/:id_task", checkAuth, updateTask)

export default router