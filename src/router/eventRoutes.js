import { Router } from "express";
import checkAuth from '../middleware/authMiddleware.js'
import { 
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
} from "../controller/eventController.js";

const router = Router()

router.get("/", checkAuth, getAllEvents)
router.post("/", checkAuth, createEvent)
router.get("/:id_event", checkAuth, getEventById)
router.put("/:id_event", checkAuth, updateEvent)
router.delete("/:id_event",checkAuth, deleteEvent)

export default router