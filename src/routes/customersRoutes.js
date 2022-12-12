import { Router } from "express";
import { getCustomers, postCustomers } from "../controllers/customersControllers.js";
import { customerSchemaValidation } from "../middlewares/customersMiddlewares.js";

const router = Router();

router.get("/customers", getCustomers)
router.post("/customers", customerSchemaValidation, postCustomers)

export default router;