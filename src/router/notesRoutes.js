import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
} from "../controller/notesController.js";

const router = Router()

router.post("/", checkAuth, createNote)
router.get("/", checkAuth, getAllNotes)
router.get("/:notes_id", checkAuth, getNoteById)
router.put("/:notes_id", checkAuth, updateNote)
router.delete("/:notes_id", checkAuth, deleteNote)

export default router