import express from 'express';

import { protect } from '../middleware/auth.middleware.js';
import { adminRole } from '../middleware/role.middleware.js';

import {
	deleteOrder,
	getOrder,
	getOrders,
	updateCompleteOrder,
	updateOrder,
} from './order.controller.js';

const router = express.Router();

router.route('/').get(protect, adminRole, getOrders);
router
	.route('/:id')
	.get(protect, adminRole, getOrder)
	.put(protect, adminRole, updateOrder)
	.patch(protect, adminRole, updateCompleteOrder)
	.delete(protect, adminRole, deleteOrder);

export default router;
