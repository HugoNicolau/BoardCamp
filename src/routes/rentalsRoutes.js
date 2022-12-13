import { Router } from "express";
import { getRentals, postRentals } from "../controllers/rentalsControllers.js";
import { rentalSchemaValidation } from "../middlewares/rentalsMiddlewares.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalSchemaValidation, postRentals);

export default router;