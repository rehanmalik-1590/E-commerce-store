import express from "express";
import { 
    createCategory,
    updateCategory,
    removeCategory,
    listCategory,
    readCategory
} from "../controllers/categoryController.js";

const router = express.Router();

import { authenticate,  authorizedAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizedAdmin, createCategory);
router.route('/:categoryId').put(authenticate, authorizedAdmin, updateCategory);
router.route('/:categoryId').delete(authenticate, authorizedAdmin, removeCategory);
router.route('/categories').get(listCategory);
router.route('/:id').get(readCategory);

export default router;