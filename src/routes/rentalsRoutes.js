import { Router } from "express";
import { getRentals } from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);

export default router;