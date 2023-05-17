import AsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { prisma } from '../prisma.js';
import { UserFields } from '../utils/user.utils.js';

export const adminRole = AsyncHandler(async (req, res, next) => {
	let token;
	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const userFound = await prisma.user.findUnique({
			where: {
				id: decoded.userId,
			},
			select: UserFields,
		});

		if (userFound.role === 'admin') {
			next();
		} else {
			res.status(403);
			throw new Error('You not admin');
		}
	}
});
