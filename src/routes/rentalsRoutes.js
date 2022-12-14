import { Router } from "express";
import { getRentals, postRentals, returnRental, deleteRental } from "../controllers/rentalsControllers.js";
import { rentalSchemaValidation } from "../middlewares/rentalsMiddlewares.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalSchemaValidation, postRentals);
router.post("/rentals/:id/return", returnRental);
router.delete("/rentals/:id", deleteRental)

export default router;