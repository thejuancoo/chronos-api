import { Router } from "express";
import checkAuth from '../middleware/authMiddleware.js'
import { 
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent
} from "../controller/eventController.js";

const router = Router()

router.get("/", checkAuth, getAllEvents)
router.post("/", checkAuth, createEvent)
router.put("/:id_event", checkAuth, updateEvent)
router.get("/:id_event", checkAuth, getEventById)

export default router