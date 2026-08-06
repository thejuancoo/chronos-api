import { Router } from "express";
import checkAuth from '../middleware/authMiddleware.js'
import { getAllEvents, getEventById } from "../controller/eventController.js";

const router = Router()

router.get("/", checkAuth, getAllEvents)
router.get("/:id_event", checkAuth, getEventById)

export default router