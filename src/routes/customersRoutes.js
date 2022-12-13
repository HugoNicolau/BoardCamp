import { Router } from "express";
import { getCustomers, postCustomers, getCustomersById, updateCustomers } from "../controllers/customersControllers.js";
import { customerSchemaValidation } from "../middlewares/customersMiddlewares.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", customerSchemaValidation, postCustomers)
router.put("/customers/:id", customerSchemaValidation, updateCustomers);

export default router;