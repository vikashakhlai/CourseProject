import express from 'express';

import { protect } from '../middleware/auth.middleware.js';
import { adminRole } from '../middleware/role.middleware.js';

import {
	createUserOrder,
	getUserOrders,
	getUserProfile,
	getUserRole,
	getUsers,
} from './user.controller.js';

const router = express.Router();

router.route('/').get(protect, adminRole, getUsers);

router
	.route('/orders')
	.get(protect, getUserOrders)
	.post(protect, createUserOrder);

router.route('/profile').get(protect, getUserProfile);
router.route('/role').get(protect, getUserRole);

export default router;
