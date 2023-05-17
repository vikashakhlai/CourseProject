import express from 'express';

import { protect } from '../middleware/auth.middleware.js';
import { adminRole } from '../middleware/role.middleware.js';

import {
	createDish,
	deleteDish,
	getCategoryDish,
	getDish,
	getDishes,
	updateDish,
} from './dish.controller.js';

const router = express.Router();

router.route('/').get(getDishes).post(protect, adminRole, createDish);
router
	.route('/:id')
	.get(getDish)
	.put(protect, adminRole, updateDish)
	.delete(protect, adminRole, deleteDish);
router.route('/category/:id').get(getCategoryDish);

export default router;
