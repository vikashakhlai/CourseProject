import express from 'express';

import { protect } from '../middleware/auth.middleware.js';
import { adminRole } from '../middleware/role.middleware.js';

import {
	createPromotions,
	deletePromotions,
	getPromotion,
	getPromotions,
	updatePromotions,
} from './promotion.controller.js';

const router = express.Router();

router
	.route('/')
	.get(protect, getPromotions)
	.post(protect, adminRole, createPromotions);
router
	.route('/:id')
	.get(protect, getPromotion)
	.put(protect, adminRole, updatePromotions)
	.delete(protect, adminRole, deletePromotions);

export default router;
