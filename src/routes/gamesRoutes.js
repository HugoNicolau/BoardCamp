import { Router } from "express";
import { getGames } from "../controllers/gamesControllers.js";

const router = Router();

router.get("/games", getGames);
// router.post("/games", gameSchemaValidation, postGames);

export default router;