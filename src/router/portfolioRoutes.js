import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { 
    createPortfolio,
    getAllPortfolios,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
} from "../controller/portfolioController.js";

const router = Router()

router.post("/", checkAuth, createPortfolio)
router.get("/", checkAuth, getAllPortfolios)
router.get("/:id_portfolio", checkAuth, getPortfolioById)
router.put("/:id_portfolio", checkAuth, updatePortfolio)
router.delete("/:id_portfolio", checkAuth, deletePortfolio)

export default router