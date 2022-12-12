import { Router } from 'express';
import { getCategories, postCategories } from '../controllers/categoriesControllers.js';
import { categogySchemaValidation } from '../middlewares/categoriesMiddlewares.js';

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", categogySchemaValidation, postCategories);


export default router;