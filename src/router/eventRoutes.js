import { Router } from "express";
import checkAuth from '../middleware/authMiddleware.js'
import { getAllEvents } from "../controller/eventController.js";

const router = Router()

router.get("/", checkAuth, getAllEvents)

export default router