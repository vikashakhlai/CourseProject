import express from 'express';

import { protect } from '../middleware/auth.middleware.js';
import { adminRole } from '../middleware/role.middleware.js';

import {
	createNews,
	deleteNews,
	getNews,
	getOneNews,
	updateNews,
} from './news.controller.js';

const router = express.Router();

router.route('/').get(getNews).post(protect, adminRole, createNews);
router
	.route('/:id')
	.get(getOneNews)
	.put(protect, adminRole, updateNews)
	.delete(protect, adminRole, deleteNews);

export default router;
